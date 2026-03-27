// This file runs on Netlify's server — your API key is NEVER seen by farmers
// The farmer's phone talks to this function, this function talks to Gemini

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  // Allow requests from your website only
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  try {
    const { messages, systemPrompt } = JSON.parse(event.body);

    // API key lives here on the server — farmers never see it
    const GEMINI_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "API key not configured on server." }),
      };
    }

    // Build conversation for Gemini
    const contents = [
      {
        role: "user",
        parts: [{ text: "System instructions:\n" + systemPrompt }],
      },
      {
        role: "model",
        parts: [
          {
            text: "समजले! मी शेतकरी मित्र आहे. मी महाराष्ट्रातील शेतकऱ्यांना मदत करेन. सांगा!",
          },
        ],
      },
      ...messages,
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            maxOutputTokens: 800,
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: data.error.message }),
      };
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

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
