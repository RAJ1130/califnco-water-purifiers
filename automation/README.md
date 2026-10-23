# Califnco AI Marketing Automation & WhatsApp Poster

This module fulfills **Part 2: AI Automation (25 pts)** and **Bonus: WhatsApp Status Automation (+10 pts)** of the Califnco Technical Assignment.

---

## 🌟 Capabilities

1. **Scheduled Daily Workflow (10 pts):**
   * Automatically runs every morning without manual intervention (via cron schedule / n8n / GitHub Actions).
   * Predictably cycles through the 50+ water purifier and spares catalog.
2. **AI-Generated Product Visual (8 pts):**
   * Uses high-fidelity FLUX / Stable Diffusion via Pollinations.ai / Hugging Face.
   * Generates crisp commercial studio photography featuring modern purifier aesthetics, water ripples, and crystal clarity.
3. **AI-Generated Captions & Hashtags (7 pts):**
   * Powered by Google Gemini 2.5 Flash (`@google/genai`).
   * Produces persuasive sales copy highlighting water health benefits, TDS reduction, promo discount codes (`PURECALIFNCO10`), and 20+ viral hashtags.
4. **Meta Instagram Graph API Publishing:**
   * Automated 2-step media container creation (`/media`) and publication (`/media_publish`).
5. **Bonus (+10 pts): WhatsApp Status via WAHA:**
   * Posts daily product status updates to WhatsApp using the open-source WAHA (WhatsApp HTTP API) Docker container.

---

## 🚀 Quick Execution Guide

### Option A: Standalone Node.js Runner (Instant & Zero Setup)

1. Navigate to the automation folder:
   ```bash
   cd automation
   npm install
   ```

2. Test run in dry-run mode (generates full AI caption, image URL, and validates APIs):
   ```bash
   node daily_ai_poster.js --dry-run
   ```

3. For live publishing to Instagram & WhatsApp:
   * Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   * Fill in your `GEMINI_API_KEY` (Free from https://aistudio.google.com/) and Meta Graph API credentials.
   * Run:
     ```bash
     node daily_ai_poster.js
     ```

---

### Option B: n8n Visual Automation (Docker)

1. Start n8n in Docker (Zero-cost, local):
   ```bash
   docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n
   ```
2. Open `http://localhost:5678` in your browser.
3. Click **Workflows > Import from File** and select `n8n-workflow-califnco.json`.
4. Configure your Gemini and Meta credentials.
5. Click **Activate Workflow**. The workflow will trigger every morning at 9:00 AM automatically!

---

### Option C: WAHA WhatsApp Status Setup (Bonus +10 pts)

1. Run WAHA locally:
   ```bash
   docker run -it -p 3000:3000 --name waha devlikeapro/waha
   ```
2. Scan the QR code shown in `http://localhost:3000/dashboard` using your secondary WhatsApp number.
3. The `daily_ai_poster.js` script or n8n workflow will automatically broadcast the daily product to your WhatsApp Status!

---

## 🛠️ Zero-Cost Tooling Justification (as requested in assignment)

* **Caption Generation:** Google Gemini 2.5 Flash API (Free Spark tier — generous free daily quota, zero credit card needed).
* **Image Generation:** Pollinations FLUX.1 / Hugging Face Inference API (100% free, high-resolution 1080x1080 product photography).
* **Scheduling:** Built-in node cron / n8n Community Edition (Free open-source under Sustainable Use License).
* **WhatsApp Automation:** WAHA (WhatsApp HTTP API, free open-source alternative to paid Twilio/Gupshup BSPs).
