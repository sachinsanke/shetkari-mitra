const https = require("https");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

  const { city } = JSON.parse(event.body || "{}");
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const location = city || "Aurangabad,IN";

  const reply = await new Promise((resolve, reject) => {
    const options = {
      hostname: "api.openweathermap.org",
      path: `/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric&lang=hi`,
      method: "GET",
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          const p = JSON.parse(data);
          resolve({
            city: p.name,
            temp: p.main?.temp,
            feels_like: p.main?.feels_like,
            humidity: p.main?.humidity,
            description: p.weather?.[0]?.description,
            wind: p.wind?.speed,
          });
        } catch (e) {
          reject(new Error("Failed to parse weather data"));
        }
      });
    });
    req.on("error", reject);
    req.end();
  });

  return { statusCode: 200, headers, body: JSON.stringify({ weather: reply }) };
};
