const https = require("https");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

  const { imageBase64, mimeType } = JSON.parse(event.body);
  // imageBase64 = base64 string of the image (no "data:image/..." prefix)
  // mimeType = "image/jpeg" or "image/png"

  const GEMINI_KEY = process.env.GEMINI_API_KEY;

  const postData = JSON.stringify({
    system_instruction: {
      parts: [{ text: "तू कृषी तज्ञ आहेस. शेतकऱ्याने पाठवलेल्या पिकाच्या फोटोवरून रोग किंवा कीड ओळख आणि मराठीत उपाय सांग." }],
    },
    contents: [{
      role: "user",
      parts: [
        { inline_data: { mime_type: mimeType, data: imageBase64 } },
        { text: "या पिकाला काय रोग किंवा कीड आहे? उपाय काय आहे?" },
      ],
    }],
    generationConfig: { maxOutputTokens: 600 },
  });

  const reply = await new Promise((resolve, reject) => {
    const options = {
      hostname: "generativelanguage.googleapis.com",
      path: `/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      method: "POST",
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(postData) },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (c) => { data += c; });
      res.on("end", () => {
        const p = JSON.parse(data);
        resolve(p.candidates?.[0]?.content?.parts?.[0]?.text || "फोटो विश्लेषण करता आले नाही.");
      });
    });
    req.on("error", reject);
    req.write(postData);
    req.end();
  });

  return { statusCode: 200, headers, body: JSON.stringify({ diagnosis: reply }) };
};
