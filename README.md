# RazorNexus

An open-source prototype exploring **Agentic Commerce on Razorpay** — connecting personal AI buyer agents with online store pricing systems to automate bargaining, bundle discounts, and safe checkout.

Developed and maintained by **[Palash Tripathi](https://github.com/)** (Noida, India).

---

## 💡 Why I Built This

Most AI assistants today are great at writing text or searching the web, but they hit a wall when it comes to executing real-world actions like purchasing. 

When you want to buy something online today, you typically browse multiple tabs, compare bundle accessories, look for coupon codes, and enter checkout details. In the near future, consumer AI agents will do this legwork for us.

**RazorNexus** is an experiment to answer a practical question:  
*How can an AI agent negotiate pricing directly with a merchant's backend and safely complete payments through Razorpay without risking unauthorized spending?*

---

## ⚡ What RazorNexus Does

1. **AI-to-AI Deal Negotiation**: Your buyer agent communicates directly with the merchant's pricing engine to request bundle quotes (e.g. headphones + carrying case) and passes through payment rail fee savings (like 0% MDR on Razorpay Turbo UPI).
2. **Verifiable Budget Vault**: You set daily spending caps and per-transaction limits. If a transaction is under your threshold, the agent checks out autonomously. If it exceeds the limit, it prompts for human confirmation before spending a single rupee.
3. **Razorpay Payment Rails**: Full checkout simulation supporting Razorpay Turbo UPI, Cards, Netbanking, No-Cost EMI, and Magic Checkout 1-click profiles.
4. **Merchant Yield & Cart Recovery**: Store backends can dynamically adjust discount margins based on inventory velocity and automatically reach out to dropped-off checkouts on WhatsApp with time-decaying Razorpay Payment Links.

---

## 🏗️ Architecture & How It Works

```
                     ┌──────────────────────────────┐
                     │    Delegation Vault          │
                     │  (Daily Caps, SHA-256 Tokens)│
                     └──────────────┬───────────────┘
                                    │ Policy Bounds
                                    ▼
┌───────────────────────┐   A2A Protocol    ┌───────────────────────┐
│     Buyer AI Agent    │◄─────────────────►│   Merchant Pricing    │
│ (Intent, Negotiation) │  (JSON-RPC 2.0)   │   (Yield & Margins)   │
└───────────┬───────────┘                   └───────────┬───────────┘
            │                                           │
            │          ┌──────────────────────┐         │
            └─────────►│ Razorpay Smart Layer │◄────────┘
                       │ • Smart Orders API   │
                       │ • Turbo UPI QR       │
                       │ • Magic Checkout 2.0 │
                       │ • Webhook Ledger     │
                       └──────────────────────┘
```

### Protocol Flow
- **`agent.discover`**: Buyer agent queries store catalog with category and price constraints.
- **`agent.quote_offer`**: Merchant engine computes base quote factoring inventory holding cost and margins.
- **`agent.negotiate_counter`**: Buyer agent requests bundle packages or rail incentives.
- **`agent.quote_final_locked`**: Merchant engine locks the settled price with a time-limited quote token.
- **`razorpay.order.create`**: Programmatic order generation and checkout execution.

---

## 📁 Project Structure

```text
razor-nexus/
├── index.html                  # Main application interface
├── app.js                      # Multi-agent orchestrator & Razorpay client logic
├── styles.css                  # Minimalist developer-grade design system
├── data/
│   └── catalog.json            # Product catalog with pricing margins & inventory data
├── tests/
│   └── test_agent_commerce.js  # Unit tests for margin safety & vault limits
├── server.ps1                  # Local zero-dependency PowerShell server
├── run_demo.bat                # 1-click Windows launcher
└── publish_to_github.bat       # Helper script to push to GitHub
```

---

## 🚀 Running Locally

This project is completely self-contained and requires **zero external installations or build tools**.

### Method 1: Double-Click
Simply double-click `run_demo.bat` or open `index.html` directly in any web browser.

### Method 2: Local Server (PowerShell)
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```
The server will start on `http://localhost:8080` and open automatically in your default browser.

---

## 🧪 Testing

Run the included unit test suite in your browser console or terminal:
```bash
node tests/test_agent_commerce.js
```
The tests verify:
- Merchant hard margin floors are strictly respected.
- Dynamic bundle discount calculations evaluate accurately.
- Transactions exceeding vault thresholds trigger human authorization.
- Daily budget exhaustion guards prevent unauthorized transactions.

---

## 👤 Author

**Palash Tripathi**  
*AI Systems & Fintech Architect • Full-Stack Product Engineer*  
Location: Noida, India  

---

## 📄 License

MIT License — Feel free to use, modify, and build upon this code.
