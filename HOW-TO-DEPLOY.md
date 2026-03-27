# 🌱 शेतकरी मित्र — Deployment Guide
## How to put this online in 15 minutes — FREE

---

## 📁 Your Project Files
```
shetkari-mitra/
├── index.html              ← Main app (farmers open this)
├── manifest.json           ← Makes it installable like an app
├── sw.js                   ← Works offline
├── netlify.toml            ← Netlify configuration
├── netlify/
│   └── functions/
│       └── chat.js         ← Hides your API key on the server
└── HOW-TO-DEPLOY.md        ← This file
```

---

## STEP 1 — Get Free Google Gemini API Key

1. Open: https://aistudio.google.com/apikey
2. Login with Gmail (your GPay account works!)
3. Click "Create API Key"
4. Copy the key (starts with "AIza...")
5. Save it somewhere — you'll need it in Step 3

💡 This is FREE — no payment, no credit card needed!

---

## STEP 2 — Create Free GitHub Account & Upload Files

GitHub is where your code lives. It's free.

1. Go to https://github.com and sign up (free)
2. Click the "+" button → "New repository"
3. Name it: shetkari-mitra
4. Click "Create repository"
5. Click "uploading an existing file"
6. Upload ALL files from this folder:
   - index.html
   - manifest.json
   - sw.js
   - netlify.toml
   - netlify/functions/chat.js  (create this folder path)
7. Click "Commit changes"

---

## STEP 3 — Deploy on Netlify (Free Hosting)

Netlify will host your app for free and hide your API key.

1. Go to https://netlify.com and sign up with GitHub (free)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" → Select "shetkari-mitra"
4. Click "Deploy site"
5. Wait 1 minute for it to deploy

NOW — Add your secret API key:
6. Go to Site Settings → Environment Variables
7. Click "Add a variable"
8. Key: GEMINI_API_KEY
9. Value: (paste your AIza... key here)
10. Click "Save"
11. Go to Deploys → Click "Trigger deploy" → "Deploy site"

---

## STEP 4 — Your App is LIVE! 🎉

Netlify gives you a free link like:
https://shetkari-mitra-xyz123.netlify.app

✅ Share this link on WhatsApp with farmers!
✅ Farmers just click the link — no key, no signup, nothing!
✅ Works on any basic Android phone!
✅ Farmers can install it on their home screen like an app!

---

## STEP 5 — Custom Name (Optional, Free)

Instead of "shetkari-mitra-xyz123.netlify.app" you can get:
"shetkari-mitra.netlify.app"

1. In Netlify → Site Settings → Domain management
2. Click "Options" → "Edit site name"
3. Type: shetkari-mitra (or any name you like)

---

## 💰 Cost Breakdown

| Service | Cost |
|---------|------|
| GitHub | FREE |
| Netlify hosting | FREE |
| Netlify functions | FREE (125,000 calls/month) |
| Google Gemini API | FREE (generous free tier) |
| **TOTAL** | **₹0** |

Gemini free tier = ~60 farmer conversations per minute, 1 million tokens/day.
This is enough for an ENTIRE VILLAGE to use it heavily every day!

---

## 📱 How Farmers Install It as an App

When a farmer opens the link in Chrome on Android:
1. They'll see "Add to Home Screen" popup
2. Tap "Install" or "Add"
3. App icon appears on their home screen
4. It opens like a real app — no browser bars!

---

## 🆘 Need Help?

If anything goes wrong, share the error message and we'll fix it together!

Common issues:
- "Function not found" → Check netlify/functions/chat.js was uploaded correctly
- "API error" → Check GEMINI_API_KEY was set correctly in Netlify
- App not loading → Wait 2 minutes after deploy, then refresh

---

## 🚀 Future Upgrades

Once this is working, next steps:
1. Connect real-time Agmarknet API for live mandi prices
2. Add OpenWeatherMap for actual weather
3. WhatsApp bot (farmers send messages on WhatsApp, get AI replies)
4. Photo upload for pest diagnosis
5. Partner with NGOs for wider reach

---

Built with ❤️ for Maharashtra's farmers.
शेतकरी समृद्ध तर महाराष्ट्र समृद्ध!
