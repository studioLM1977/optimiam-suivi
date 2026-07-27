const OFF_USER_AGENT = "SAB-STENIR/1.0 (app perso de suivi MASLD; contact: lionelcmoa@yahoo.fr)";

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Méthode non autorisée" });
    return;
  }

  const q = (req.query.q || "").toString().trim();
  const sanitized = q.replace(/["():]/g, " ").trim();
  if (!sanitized) {
    res.status(400).json({ error: "Requête manquante" });
    return;
  }

  const url = new URL("https://search.openfoodfacts.org/search");
  url.searchParams.set("q", `countries_tags:"en:france" -obsolete:true ${sanitized}`);
  url.searchParams.set("fields", "code,product_name,brands,quantity,nutriments");
  url.searchParams.set("langs", "fr");
  url.searchParams.set("page_size", "20");

  try {
    const r = await fetch(url.toString(), { headers: { "User-Agent": OFF_USER_AGENT } });
    if (!r.ok) {
      res.status(502).json({ error: "Recherche Open Food Facts indisponible" });
      return;
    }
    const data = await r.json();
    const results = (data.hits || [])
      .filter((p) => p.product_name)
      .map((p) => {
        const n = p.nutriments || {};
        const kcal = n["energy-kcal_100g"] ?? n["energy-kcal"];
        return {
          code: p.code || null,
          name: p.product_name,
          brand: (Array.isArray(p.brands) ? p.brands[0] : (p.brands || "").split(",")[0] || "").trim(),
          quantity: p.quantity || null,
          kcal: kcal != null ? Number(kcal) : null,
          fat: Number(n["fat_100g"]) || 0,
          carb: Number(n["carbohydrates_100g"]) || 0,
          sugar: Number(n["sugars_100g"]) || 0,
          salt: Number(n["salt_100g"]) || 0,
          image: null
        };
      })
      .filter((p) => p.kcal != null)
      .slice(0, 15);

    // Miniatures en best-effort : OFF rate-limite parfois les appels anonymes
    // (503 intermittent) — un échec ici ne doit jamais casser la recherche.
    const codes = results.map((p) => p.code).filter(Boolean);
    if (codes.length > 0) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const imgRes = await fetch(
          `https://world.openfoodfacts.org/api/v2/search?code=${codes.join(",")}&fields=code,image_small_url&page_size=${codes.length}`,
          { headers: { "User-Agent": OFF_USER_AGENT }, signal: controller.signal }
        );
        clearTimeout(timeout);
        if (imgRes.ok) {
          const imgData = await imgRes.json();
          const imageByCode = {};
          (imgData.products || []).forEach((p) => {
            if (p.image_small_url) imageByCode[p.code] = p.image_small_url;
          });
          results.forEach((p) => { if (p.code) p.image = imageByCode[p.code] || null; });
        }
      } catch {
        // pas grave, on garde les résultats sans image
      }
    }

    res.status(200).json({ results });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
