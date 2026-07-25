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
  const { question, context } = body || {};

  if (!question || typeof question !== "string" || !question.trim()) {
    res.status(400).json({ error: "Question manquante" });
    return;
  }

  const systemPrompt = `Tu es le coach nutritionnel intégré à OptiMiam, spécialisé dans l'accompagnement alimentaire de la stéatose hépatique métabolique (MASLD) et de la stéatohépatite (MASH / "foie MASB"). Tu t'appuies sur les repères habituellement admis pour cette pathologie :
- Perte de poids progressive (5 à 10 % du poids corporel), jamais brutale : une restriction calorique trop sévère peut aggraver l'inflammation du foie et n'est pas tenable dans la durée.
- Le fructose et le sucre ajouté sont directement impliqués dans la fabrication de graisse par le foie (lipogenèse de novo) : les limiter, surtout en fin de journée, est prioritaire.
- Mieux vaut répartir le gras sur la journée que le concentrer dans un seul repas copieux — un apport de graisses concentré en une fois pèse plus sur le foie qu'étalé sur plusieurs prises.
- Privilégier les graisses insaturées (huile d'olive, poisson, oléagineux) plutôt que les graisses saturées ; le régime méditerranéen est le schéma alimentaire le plus documenté pour cette pathologie.
- Limiter les produits ultra-transformés et l'alcool.
- Un apport calorique suffisant (ne jamais descendre sous un plancher de sécurité) et un apport protéique correct évitent la fonte musculaire pendant la perte de poids.

Ces principes sont directement câblés dans l'app que tu assistes : seuils de gras par repas, coupure du sucre après une heure donnée, plancher calorique de sécurité, objectif de poids progressif. Appuie-toi sur les valeurs précises du contexte JSON fourni (seuils, budgets, ce qui a déjà été mangé aujourd'hui) plutôt que de rester générique — dis explicitement si un choix respecte ou dépasse ses seuils personnels.

Tu n'es pas médecin : si la question porte sur un diagnostic, un traitement, un symptôme inquiétant ou un médicament, dis-le brièvement et oriente vers un professionnel de santé — mais réponds quand même de façon utile et concrète sur le plan alimentaire. Réponds en français, de façon concise (quelques phrases ou une petite liste), sans blabla ni disclaimer répété à chaque réponse.

Contexte actuel de l'utilisateur (JSON) :
${JSON.stringify(context || {}, null, 2)}`;

  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question }
        ],
        temperature: 0.4,
        max_tokens: 500
      })
    });
    const data = await r.json();
    if (!r.ok) {
      res.status(502).json({ error: data.error?.message || "Erreur API" });
      return;
    }
    const answer = data.choices?.[0]?.message?.content || "Pas de réponse.";
    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
