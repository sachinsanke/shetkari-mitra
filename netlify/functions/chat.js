const https = require("https");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const { messages, systemPrompt } = JSON.parse(event.body);
    const GEMINI_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "GEMINI_API_KEY not set in Netlify environment variables." }),
      };
    }

    const contents = [
      {
        role: "user",
        parts: [{ text: "System instructions:\n" + systemPrompt }],
      },
      {
        role: "model",
        parts: [{ text: "समजले! मी शेतकरी मित्र आहे. मी महाराष्ट्रातील शेतकऱ्यांना मदत करेन." }],
      },
      ...messages,
    ];

    const postData = JSON.stringify({
      contents,
      generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
    });

    // Use https module (works in all Node versions)
    const reply = await new Promise((resolve, reject) => {
      const options = {
        hostname: "generativelanguage.googleapis.com",
        path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
      };

      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => { data += chunk; });
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              reject(new Error(parsed.error.message));
            } else {
              const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
              resolve(text || "उत्तर मिळाले नाही. पुन्हा प्रयत्न करा.");
            }
          } catch (e) {
            reject(new Error("Invalid response from Gemini"));
          }
        });
      });

      req.on("error", reject);
      req.write(postData);
      req.end();
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
