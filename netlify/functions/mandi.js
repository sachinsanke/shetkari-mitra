const https = require("https");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

  const { commodity, state } = JSON.parse(event.body || "{}");
  const API_KEY = process.env.DATA_GOV_API_KEY;

  // Defaults to Maharashtra, commodity like "Tomato", "Onion", "Cotton"
  const params = new URLSearchParams({
    "api-key": API_KEY,
    format: "json",
    limit: "10",
    filters: JSON.stringify({
      State: state || "Maharashtra",
      Commodity: commodity || "Onion",
    }),
  });

  const reply = await new Promise((resolve, reject) => {
    const options = {
      hostname: "api.data.gov.in",
      path: `/resource/9ef84268-d588-465a-a308-a864a43d0070?${params}`,
      method: "GET",
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.records || []);
        } catch (e) {
          reject(new Error("Failed to parse mandi data"));
        }
      });
    });
    req.on("error", reject);
    req.end();
  });

  return { statusCode: 200, headers, body: JSON.stringify({ prices: reply }) };
};
