module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Méthode non autorisée" });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Clé API manquante côté serveur" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const { imageBase64, mimeType } = body || {};

  if (!imageBase64 || typeof imageBase64 !== "string") {
    res.status(400).json({ error: "Image manquante" });
    return;
  }

  const systemPrompt = `Tu lis une photo d'étiquette de valeurs nutritionnelles (emballage alimentaire français ou européen). Extrais les valeurs et réponds UNIQUEMENT avec un objet JSON strict, sans markdown, sans texte autour, au format exact :
{"productName": string|null, "kcal100g": number, "fat100g": number, "carbs100g": number, "sugars100g": number, "salt100g": number}

Règles :
- Toutes les valeurs numériques doivent être ramenées à une base pour 100 g (ou 100 ml). Si l'étiquette ne donne que des valeurs "par portion", convertis-les vers 100 g en utilisant le poids de portion indiqué.
- "fat100g" = lipides/matières grasses totales. "carbs100g" = glucides totaux (doit toujours être ≥ sugars100g). "sugars100g" = dont sucres. "salt100g" = sel (si seul le sodium est indiqué, sel = sodium × 2,5).
- Si une valeur est introuvable sur la photo, mets 0.
- "productName" = nom du produit s'il est visible sur la photo, sinon null.
- Aucun texte, commentaire ou balise en dehors de l'objet JSON.`;

  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: "Extrait les valeurs nutritionnelles de cette photo." },
              { type: "image_url", image_url: { url: `data:${mimeType || "image/jpeg"};base64,${imageBase64}` } }
            ]
          }
        ],
        temperature: 0.1,
        max_tokens: 400
      })
    });
    const data = await r.json();
    if (!r.ok) {
      res.status(502).json({ error: data.error?.message || "Erreur API vision" });
      return;
    }
    const raw = data.choices?.[0]?.message?.content || "";
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      res.status(502).json({ error: "Réponse illisible du modèle" });
      return;
    }
    let parsed;
    try {
      parsed = JSON.parse(match[0]);
    } catch {
      res.status(502).json({ error: "JSON invalide renvoyé par le modèle" });
      return;
    }
    res.status(200).json({
      productName: parsed.productName || null,
      kcal100g: Number(parsed.kcal100g) || 0,
      fat100g: Number(parsed.fat100g) || 0,
      carbs100g: Number(parsed.carbs100g) || 0,
      sugars100g: Number(parsed.sugars100g) || 0,
      salt100g: Number(parsed.salt100g) || 0
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
