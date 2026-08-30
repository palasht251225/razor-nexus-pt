/**
 * RazorNexus - Autonomous Agentic Commerce & AI Growth Engine for Razorpay
 * Core Application Logic, Multi-Agent Orchestrator, Budget Vault & Razorpay Client
 */

// State Management
const state = {
    activeTab: 'buyer-arena',
    catalog: [],
    budgetVault: {
        dailyLimit: 50000,
        currentSpent: 14200,
        singleTxCap: 30000,
        whitelistedCategories: ['Electronics', 'Workplace & Furniture', 'SaaS & Developer Tools'],
        requireStepUpAbove: 20000,
        activeTokens: [
            {
                tokenId: 'tok_deleg_984a1',
                scope: 'shopping.electronics.autonomous',
                maxLimit: 30000,
                expiresAt: '2026-09-01T23:59:59Z',
                status: 'ACTIVE',
                signature: '3f8e9102bca765d14e9f9024c0897a2139048aebcf0193857d620938f4a7c1e5'
            }
        ]
    },
    razorpayConfig: {
        mode: 'sandbox', // 'sandbox' | 'live'
        keyId: 'rzp_test_NexusAgent2026',
        keySecret: 'secret_live_a2a_nexus_998',
        webhookSecret: 'whsec_agentic_growth_8841',
        currency: 'INR'
    },
    activeNegotiation: null,
    negotiationLogs: [],
    protocolMessages: [],
    merchantMetrics: {
        totalGmv: 489240,
        ordersCount: 42,
        conversionRate: 64.8,
        conversionUplift: 31.4,
        averageOrderValue: 11648,
        recoveredCartsCount: 14,
        recoveredRevenue: 98450,
        elasticityData: [
            { price: 24000, demand: 85, revenue: 2040000 },
            { price: 26000, demand: 78, revenue: 2028000 },
            { price: 27500, demand: 74, revenue: 2035000 }, // Optimal yield point
            { price: 28500, demand: 62, revenue: 1767000 },
            { price: 29990, demand: 42, revenue: 1259580 }
        ],
        activeExperiments: [
            {
                id: 'exp_01',
                name: 'Dynamic Turbo-UPI Incentive vs Standard Card',
                status: 'RUNNING',
                variantA: 'Standard ₹500 off card',
                variantB: 'Instant ₹750 off Razorpay Turbo UPI',
                uplift: '+23.5% Checkout Completion',
                trafficSplit: '50/50'
            },
            {
                id: 'exp_02',
                name: 'Agentic Bundle Auto-Attachment (Case + Warranty)',
                status: 'RUNNING',
                variantA: 'A la carte addons',
                variantB: 'Autonomous 68% bundle rebate',
                uplift: '+41.2% AOV Growth',
                trafficSplit: '50/50'
            }
        ],
        transactionFeed: [
            {
                id: 'txn_9821',
                product: 'Sony WH-1000XM5 + Travel Case',
                buyerAgent: 'Agent-Gemini-Shopper-7',
                originalPrice: 32489,
                settledPrice: 26490,
                method: 'Razorpay Turbo UPI',
                status: 'PAID',
                timestamp: '2 mins ago'
            },
            {
                id: 'txn_9820',
                product: 'Ergonomic Pro Ultra Mesh Chair',
                buyerAgent: 'Agent-Claude-Personal-12',
                originalPrice: 18499,
                settledPrice: 14999,
                method: 'Razorpay Cards (No-Cost EMI)',
                status: 'PAID',
                timestamp: '11 mins ago'
            },
            {
                id: 'txn_9819',
                product: 'CloudScale AI Developer Cloud Platform',
                buyerAgent: 'Agent-AutoDev-Ops-4',
                originalPrice: 24000,
                settledPrice: 19200,
                method: 'Razorpay Subscriptions',
                status: 'PAID',
                timestamp: '28 mins ago'
            }
        ]
    },
    recoverySim: {
        activeUser: {
            name: 'Priya Sharma',
            phone: '+91 98765 43210',
            cartItem: 'Sony WH-1000XM5 Wireless ANC Headphones',
            cartValue: 29990,
            dropOffStage: 'Payment Step (exited at payment method selection)',
            timeAgo: '14 minutes ago'
        },
        chatHistory: [
            {
                sender: 'system',
                text: 'Drop-off recorded on Razorpay Magic Checkout.',
                timestamp: '14 mins ago'
            },
            {
                sender: 'ai',
                text: 'Hi Priya, we noticed you left the Sony WH-1000XM5 in your cart. We just generated an instant ₹2,500 checkout rebate and bundled the protective travel case if you complete your order in the next 15 minutes via UPI.',
                timestamp: '10 mins ago',
                hasPaymentLink: true,
                paymentLink: {
                    id: 'plink_rec_7781a',
                    amount: 27490,
                    discountedFrom: 32489,
                    link: 'https://rzp.io/l/NexusRecoveryPriya',
                    expiresIn: '08:42'
                }
            }
        ]
    },
    currentCheckoutOrder: null
};

// Cryptographic Simulation Tools (SHA-256 in browser)
async function generateSha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Utility: Format Currency (INR)
function formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// DOM Initialization
document.addEventListener('DOMContentLoaded', async () => {
    await loadCatalog();
    initTabs();
    initEventListeners();
    renderAll();
    lucide.createIcons();
});

// Load Product Catalog
async function loadCatalog() {
    try {
        const res = await fetch('./data/catalog.json');
        if (res.ok) {
            state.catalog = await res.json();
        } else {
            console.warn('Using fallback catalog data');
            state.catalog = getFallbackCatalog();
        }
    } catch (e) {
        state.catalog = getFallbackCatalog();
    }
}

function getFallbackCatalog() {
    return [
        {
            id: "prod_101",
            name: "Sony WH-1000XM5 Wireless ANC Headphones",
            category: "Electronics",
            base_price: 29990,
            min_margin_price: 23500,
            current_inventory: 42,
            inventory_holding_cost_daily: 15,
            elasticity_score: 1.45,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
            rating: 4.8,
            reviews_count: 1240,
            tags: ["audio", "noise-cancelling", "premium", "headphones"],
            bundle_addons: [
                {
                    id: "addon_1",
                    name: "Premium Hard-Shell Protective Travel Case",
                    retail_price: 2499,
                    negotiated_price: 699,
                    margin_cost: 350
                },
                {
                    id: "addon_2",
                    name: "1-Year Extended Comprehensive Warranty",
                    retail_price: 1999,
                    negotiated_price: 499,
                    margin_cost: 150
                }
            ],
            razorpay_incentives: {
                turbo_upi: { discount_pct: 3, max_discount: 750, description: "Instant ₹750 off via Razorpay Turbo UPI" },
                card_emi: { no_cost_months: 6, description: "No-Cost EMI up to 6 months on Razorpay Smart Routing" }
            }
        },
        {
            id: "prod_102",
            name: "Ergonomic Pro Ultra Mesh Chair with 4D Armrests",
            category: "Workplace & Furniture",
            base_price: 18499,
            min_margin_price: 13999,
            current_inventory: 18,
            inventory_holding_cost_daily: 45,
            elasticity_score: 1.65,
            image: "https://images.unsplash.com/photo-1580481077195-c3a8a37f714b?w=500&auto=format&fit=crop&q=80",
            rating: 4.9,
            reviews_count: 890,
            tags: ["chair", "ergonomic", "home-office", "health"],
            bundle_addons: [
                {
                    id: "addon_3",
                    name: "Memory Foam Ergonomic Lumbar Support Pillow",
                    retail_price: 1899,
                    negotiated_price: 399,
                    margin_cost: 200
                },
                {
                    id: "addon_4",
                    name: "Silicone Rollerblade Caster Wheels Set",
                    retail_price: 1299,
                    negotiated_price: 299,
                    margin_cost: 120
                }
            ],
            razorpay_incentives: {
                turbo_upi: { discount_pct: 4, max_discount: 600, description: "Extra ₹600 off with Razorpay UPI Intent" },
                card_emi: { no_cost_months: 3, description: "3 Months No-Cost EMI supported" }
            }
        },
        {
            id: "prod_103",
            name: "UltraWide 34-inch 165Hz Curved Productivity Monitor",
            category: "Electronics",
            base_price: 38990,
            min_margin_price: 31500,
            current_inventory: 11,
            inventory_holding_cost_daily: 60,
            elasticity_score: 1.25,
            image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80",
            rating: 4.7,
            reviews_count: 450,
            tags: ["monitor", "ultrawide", "display", "coding"],
            bundle_addons: [
                {
                    id: "addon_5",
                    name: "Heavy-Duty Gas Spring Dual Monitor Arm",
                    retail_price: 3999,
                    negotiated_price: 1199,
                    margin_cost: 650
                },
                {
                    id: "addon_6",
                    name: "ScreenBar Plus Auto-Dimming Monitor Light Bar",
                    retail_price: 4499,
                    negotiated_price: 1499,
                    margin_cost: 800
                }
            ],
            razorpay_incentives: {
                turbo_upi: { discount_pct: 2.5, max_discount: 900, description: "₹900 instant discount on Turbo UPI" },
                card_emi: { no_cost_months: 9, description: "9 Months No-Cost EMI via Razorpay" }
            }
        },
        {
            id: "prod_104",
            name: "CloudScale AI Developer Cloud Platform (Annual Pro)",
            category: "SaaS & Developer Tools",
            base_price: 24000,
            min_margin_price: 16000,
            current_inventory: 9999,
            inventory_holding_cost_daily: 0,
            elasticity_score: 2.1,
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=80",
            rating: 4.9,
            reviews_count: 3100,
            tags: ["saas", "api", "cloud", "developer", "recurring"],
            bundle_addons: [
                {
                    id: "addon_7",
                    name: "Dedicated GPU Cluster Accelerator (500 Compute Hours)",
                    retail_price: 8000,
                    negotiated_price: 1999,
                    margin_cost: 600
                }
            ],
            razorpay_incentives: {
                turbo_upi: { discount_pct: 5, max_discount: 1200, description: "5% recurring discount on Razorpay Subscriptions" },
                card_emi: { no_cost_months: 12, description: "Annual recurring mandate with Razorpay Subscriptions" }
            }
        }
    ];
}

// Navigation Tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('.nav-tab');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            state.activeTab = target;
            
            tabButtons.forEach(b => {
                b.classList.remove('active-tab', 'text-zinc-100', 'bg-[#1e1e1e]', 'border', 'border-[#333333]');
                b.classList.add('text-zinc-400');
            });
            btn.classList.add('active-tab', 'text-zinc-100', 'bg-[#1e1e1e]', 'border', 'border-[#333333]');
            btn.classList.remove('text-zinc-400');

            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.add('hidden'));
            const activeContent = document.getElementById(target);
            if (activeContent) activeContent.classList.remove('hidden');

            renderAll();
        });
    });
}

// Render Master Controller
function renderAll() {
    renderHeaderStats();
    if (state.activeTab === 'buyer-arena') renderBuyerArena();
    if (state.activeTab === 'merchant-growth') renderMerchantGrowth();
    if (state.activeTab === 'budget-vault') renderBudgetVault();
    if (state.activeTab === 'recovery-sim') renderRecoverySim();
    if (state.activeTab === 'protocol-inspector') renderProtocolInspector();
    lucide.createIcons();
}

function renderHeaderStats() {
    const budgetPct = Math.min(100, Math.round((state.budgetVault.currentSpent / state.budgetVault.dailyLimit) * 100));
    const budgetText = document.getElementById('header-budget-text');
    if (budgetText) {
        budgetText.textContent = `Vault: ${formatINR(state.budgetVault.currentSpent)} / ${formatINR(state.budgetVault.dailyLimit)}`;
    }
}

// ==========================================
// 1. BUYER AGENT & NEGOTIATION ARENA
// ==========================================

function renderBuyerArena() {
    const catalogSelect = document.getElementById('target-product-select');
    if (catalogSelect && catalogSelect.children.length <= 1) {
        catalogSelect.innerHTML = '<option value="">-- Select Catalog Item --</option>';
        state.catalog.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = `${p.name} (${formatINR(p.base_price)})`;
            catalogSelect.appendChild(opt);
        });
    }

    renderNegotiationTimeline();
}

function selectPresetPrompt(promptText, productId, budget) {
    const promptInput = document.getElementById('buyer-goal-input');
    const prodSelect = document.getElementById('target-product-select');
    const budgetInput = document.getElementById('buyer-budget-input');
    if (promptInput) promptInput.value = promptText;
    if (prodSelect && productId) prodSelect.value = productId;
    if (budgetInput && budget) budgetInput.value = budget;
}

async function startAgentNegotiation() {
    const goalInput = document.getElementById('buyer-goal-input').value.trim();
    const selectedProdId = document.getElementById('target-product-select').value;
    const maxBudget = parseInt(document.getElementById('buyer-budget-input').value) || 28000;
    const preferUPI = document.getElementById('prefer-upi-toggle').checked;

    if (!goalInput) {
        alert('Please specify a purchase goal or select a scenario.');
        return;
    }

    // Match product
    let targetProduct = state.catalog.find(p => p.id === selectedProdId);
    if (!targetProduct) {
        targetProduct = state.catalog[0];
    }

    const btn = document.getElementById('btn-start-negotiation');
    btn.disabled = true;
    btn.innerHTML = `Negotiating...`;

    state.negotiationLogs = [];
    state.activeNegotiation = {
        sessionId: 'neg_sess_' + Math.random().toString(36).substring(2, 9),
        product: targetProduct,
        maxBudget,
        preferUPI,
        status: 'IN_PROGRESS',
        rounds: 0,
        deal: null
    };

    renderNegotiationTimeline();

    // Step 1: Buyer Agent Intent Analysis
    await logAgentStep('buyer', 'Intent Decomposition & Strategy', [
        `Goal: "${goalInput}"`,
        `Product Reference: ${targetProduct.name}`,
        `Ceiling Cap: ${formatINR(maxBudget)}`,
        `Delegation Token: tok_deleg_984a1 (Verified)`,
        `Strategy: Query merchant yield agent, request bundle quotation, apply Turbo UPI rebate rail.`
    ], 900);

    recordProtocolMessage('agent.discover', 'buyer -> merchant', {
        intent: 'DISCOVER_AND_QUOTE',
        product_id: targetProduct.id,
        target_category: targetProduct.category,
        buyer_delegation_scope: 'shopping.electronics.autonomous'
    });

    // Step 2: Merchant AI Market & Elasticity Check
    await logAgentStep('merchant', 'Merchant Yield & Elasticity Evaluation', [
        `Received quote request for item: ${targetProduct.id}`,
        `MSRP: ${formatINR(targetProduct.base_price)} | Margin Floor: ${formatINR(targetProduct.min_margin_price)}`,
        `Available Units: ${targetProduct.current_inventory} (Holding Cost: -₹${targetProduct.inventory_holding_cost_daily}/day)`,
        `Initial Quote Offer: ${formatINR(Math.round(targetProduct.base_price * 0.93))}`
    ], 1100);

    recordProtocolMessage('agent.quote_offer', 'merchant -> buyer', {
        initial_offer_price: Math.round(targetProduct.base_price * 0.93),
        currency: 'INR',
        validity_seconds: 300
    });

    // Step 3: Buyer Agent Counter & Dynamic Bundling Request
    const targetBundle = targetProduct.bundle_addons[0];
    const initialOffer = Math.round(targetProduct.base_price * 0.93);
    await logAgentStep('buyer', 'Counter-Proposal & Bundle Request', [
        `Parsed Merchant Offer: ${formatINR(initialOffer)}`,
        `Bundle Target: ${targetBundle.name} (MSRP ${formatINR(targetBundle.retail_price)})`,
        `Proposed Package: Main Unit + ${targetBundle.name} for ${formatINR(Math.round(targetProduct.base_price * 0.88 + targetBundle.negotiated_price))} via Razorpay.`
    ], 1100);

    recordProtocolMessage('agent.negotiate_counter', 'buyer -> merchant', {
        proposed_package: [
            { item_id: targetProduct.id, name: targetProduct.name },
            { item_id: targetBundle.id, name: targetBundle.name }
        ],
        proposed_total: Math.round(targetProduct.base_price * 0.88 + targetBundle.negotiated_price),
        preferred_rail: preferUPI ? 'razorpay_turbo_upi' : 'razorpay_cards'
    });

    // Step 4: Merchant AI Growth Optimizer Final Yield Decision
    const baseSettled = Math.round(targetProduct.base_price * 0.87);
    const addonSettled = targetBundle.negotiated_price;
    let upiDiscount = preferUPI ? targetProduct.razorpay_incentives.turbo_upi.max_discount : 0;
    const finalPackageTotal = baseSettled + addonSettled - upiDiscount;

    await logAgentStep('merchant', 'Yield Solver: Final Quote Lock', [
        `Main Unit: ${formatINR(baseSettled)} (Floor: ${formatINR(targetProduct.min_margin_price)})`,
        `Addon: ${formatINR(addonSettled)} (Retail: ${formatINR(targetBundle.retail_price)})`,
        preferUPI ? `Payment Rail: Razorpay Turbo UPI (MDR rebate applied: -${formatINR(upiDiscount)})` : `Payment Rail: Standard Razorpay Gateway`,
        `Final Locked Value: ${formatINR(finalPackageTotal)} (MSRP Package: ${formatINR(targetProduct.base_price + targetBundle.retail_price)})`,
        `Total Net Savings: ${formatINR((targetProduct.base_price + targetBundle.retail_price) - finalPackageTotal)}`
    ], 1200);

    recordProtocolMessage('agent.quote_final_locked', 'merchant -> buyer', {
        status: 'DEAL_LOCKED',
        quote_id: 'qte_' + Math.random().toString(36).substring(2, 9),
        final_price: finalPackageTotal,
        original_mrp: targetProduct.base_price + targetBundle.retail_price
    });

    // Step 5: Buyer Agent Policy & Budget Verification
    const requiresStepUp = finalPackageTotal > state.budgetVault.requireStepUpAbove;
    await logAgentStep('buyer', 'Delegation Policy & Vault Clearance', [
        `Signature Verification: OK`,
        `Daily Budget Headroom: ${formatINR(state.budgetVault.dailyLimit - state.budgetVault.currentSpent)}`,
        requiresStepUp 
            ? `Notice: Amount exceeds ₹${formatINR(state.budgetVault.requireStepUpAbove)} threshold. Step-up authorization required.`
            : `Autonomous Clearance: Pre-authorized order created.`
    ], 900);

    // Save active deal
    state.activeNegotiation.status = 'COMPLETED';
    state.activeNegotiation.deal = {
        product: targetProduct,
        addon: targetBundle,
        originalTotal: targetProduct.base_price + targetBundle.retail_price,
        finalTotal: finalPackageTotal,
        savings: (targetProduct.base_price + targetBundle.retail_price) - finalPackageTotal,
        paymentRail: preferUPI ? 'Razorpay Turbo UPI' : 'Razorpay Smart Routing',
        requiresStepUp
    };

    btn.disabled = false;
    btn.innerHTML = `<span>Execute Negotiation</span> <span class="font-mono text-[10px]">↵</span>`;
    lucide.createIcons();
    renderNegotiationTimeline();
}

async function logAgentStep(agentType, title, bulletPoints, delayMs) {
    return new Promise(resolve => {
        setTimeout(() => {
            state.negotiationLogs.push({
                agentType,
                title,
                bulletPoints,
                timestamp: new Date().toLocaleTimeString()
            });
            renderNegotiationTimeline();
            resolve();
        }, delayMs);
    });
}

function renderNegotiationTimeline() {
    const container = document.getElementById('negotiation-stream');
    const resultBox = document.getElementById('deal-summary-box');
    if (!container) return;

    if (state.negotiationLogs.length === 0) {
        container.innerHTML = `
            <div class="py-12 text-center text-zinc-500 font-mono text-xs">
                Awaiting instruction. Execute a negotiation above to initiate agent trace.
            </div>
        `;
        if (resultBox) resultBox.classList.add('hidden');
        return;
    }

    container.innerHTML = state.negotiationLogs.map((log, idx) => {
        const isBuyer = log.agentType === 'buyer';
        const roleLabel = isBuyer ? 'BUYER_AGENT' : 'MERCHANT_YIELD_AGENT';
        const roleColor = isBuyer ? 'text-zinc-300' : 'text-emerald-400';

        return `
            <div class="p-3 rounded bg-[#0d0d0d] border border-[#222222] space-y-1.5 font-mono text-xs">
                <div class="flex items-center justify-between text-[11px]">
                    <span class="font-semibold ${roleColor}">[${roleLabel}]</span>
                    <span class="text-zinc-500">${log.timestamp}</span>
                </div>
                <div class="text-zinc-200 font-medium">${log.title}</div>
                <div class="space-y-1 text-zinc-400 pl-2 border-l border-[#262626]">
                    ${log.bulletPoints.map(bp => `<div>• ${bp}</div>`).join('')}
                </div>
            </div>
        `;
    }).join('');

    container.scrollTop = container.scrollHeight;

    // Render Deal Card if ready
    if (state.activeNegotiation && state.activeNegotiation.deal && resultBox) {
        const d = state.activeNegotiation.deal;
        resultBox.classList.remove('hidden');
        resultBox.innerHTML = `
            <div class="terminal-panel p-4 space-y-3 font-mono text-xs">
                <div class="flex items-center justify-between border-b border-[#262626] pb-2">
                    <span class="text-zinc-100 font-semibold uppercase">03 / Negotiated Order Summary</span>
                    <span class="text-emerald-400">STATUS: READY_FOR_SETTLEMENT</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-300">
                    <div class="space-y-1">
                        <div>Item: <strong>${d.product.name}</strong></div>
                        <div>Bundle Addon: <strong>${d.addon.name}</strong></div>
                        <div class="text-zinc-500">Rail: ${d.paymentRail}</div>
                    </div>
                    <div class="space-y-1 sm:text-right">
                        <div class="text-zinc-500">MSRP: ${formatINR(d.originalTotal)}</div>
                        <div class="text-sm font-bold text-zinc-100">Settlement Total: ${formatINR(d.finalTotal)}</div>
                        <div class="text-emerald-400">Total Net Rebate: ${formatINR(d.savings)}</div>
                    </div>
                </div>

                <div class="flex gap-2 pt-2 border-t border-[#262626]">
                    <button onclick="launchRazorpayCheckout()" class="flex-1 py-2 px-3 btn-primary text-xs">
                        Open Razorpay Checkout
                    </button>
                    <button onclick="switchTab('protocol-inspector')" class="py-2 px-3 btn-secondary text-xs">
                        Inspect Packets
                    </button>
                </div>
            </div>
        `;
    }
}

// ==========================================
// 2. RAZORPAY SMART CHECKOUT MODAL
// ==========================================

function launchRazorpayCheckout() {
    if (!state.activeNegotiation || !state.activeNegotiation.deal) {
        alert('Please run a shopping negotiation first.');
        return;
    }

    const d = state.activeNegotiation.deal;
    const orderId = 'order_rzp_' + Math.random().toString(36).substring(2, 10);

    state.currentCheckoutOrder = {
        orderId,
        amount: d.finalTotal,
        amountPaise: d.finalTotal * 100,
        currency: 'INR',
        receipt: 'rcpt_' + Math.random().toString(36).substring(2, 8),
        items: [d.product.name, d.addon.name],
        requiresStepUp: d.requiresStepUp,
        status: 'CREATED'
    };

    // Populate checkout modal
    document.getElementById('rzp-modal-order-id').textContent = orderId;
    document.getElementById('rzp-modal-amount').textContent = formatINR(d.finalTotal);
    document.getElementById('rzp-modal-item-name').textContent = `${d.product.name} (+ Bundle)`;
    document.getElementById('rzp-modal-savings').textContent = `You save ${formatINR(d.savings)}`;

    // Show Step-Up warning if applicable
    const stepUpNotice = document.getElementById('rzp-stepup-notice');
    if (d.requiresStepUp) {
        stepUpNotice.classList.remove('hidden');
    } else {
        stepUpNotice.classList.add('hidden');
    }

    // Default to Turbo UPI Tab
    selectPaymentTab('turbo-upi');

    // Show Modal
    const modal = document.getElementById('razorpay-modal');
    modal.classList.remove('hidden');
    lucide.createIcons();

    // Record webhook payload
    recordProtocolMessage('razorpay.order.created', 'backend -> razorpay', {
        id: orderId,
        entity: 'order',
        amount: d.finalTotal * 100,
        currency: 'INR',
        receipt: state.currentCheckoutOrder.receipt,
        notes: {
            buyer_agent: 'NexusAgent-Shopper',
            delegation_token: 'tok_deleg_984a1',
            bundle_applied: true
        }
    });
}

function closeRazorpayModal() {
    document.getElementById('razorpay-modal').classList.add('hidden');
}

function selectPaymentTab(tabName) {
    const tabs = ['turbo-upi', 'cards', 'emi', 'magic'];
    tabs.forEach(t => {
        const btn = document.getElementById(`paytab-btn-${t}`);
        const view = document.getElementById(`payview-${t}`);
        if (btn && view) {
            if (t === tabName) {
                btn.className = 'py-2.5 px-3 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-md flex items-center justify-center gap-1.5 transition-all';
                view.classList.remove('hidden');
            } else {
                btn.className = 'py-2.5 px-3 rounded-lg text-xs font-medium bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-all';
                view.classList.add('hidden');
            }
        }
    });
}

async function executePayment(paymentMethod) {
    if (!state.currentCheckoutOrder) return;

    const btn = document.getElementById('btn-confirm-pay');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<span class="inline-block animate-spin mr-2">⏳</span> Authorizing with Razorpay...`;
    }

    const paymentId = 'pay_' + Math.random().toString(36).substring(2, 12);
    const signature = await generateSha256(`${state.currentCheckoutOrder.orderId}|${paymentId}|${state.razorpayConfig.keySecret}`);

    setTimeout(() => {
        // Update Budget Vault
        state.budgetVault.currentSpent += state.currentCheckoutOrder.amount;

        // Update Merchant Metrics
        state.merchantMetrics.totalGmv += state.currentCheckoutOrder.amount;
        state.merchantMetrics.ordersCount += 1;
        state.merchantMetrics.transactionFeed.unshift({
            id: 'txn_' + Math.random().toString(36).substring(2, 7),
            product: state.currentCheckoutOrder.items.join(' + '),
            buyerAgent: 'NexusAgent-Shopper',
            originalPrice: state.activeNegotiation.deal.originalTotal,
            settledPrice: state.currentCheckoutOrder.amount,
            method: paymentMethod || 'Razorpay Turbo UPI',
            status: 'PAID',
            timestamp: 'Just now'
        });

        // Record Razorpay Webhook Event
        recordProtocolMessage('razorpay.payment.authorized', 'razorpay -> merchant_webhook', {
            event: 'payment.authorized',
            payload: {
                payment: {
                    id: paymentId,
                    order_id: state.currentCheckoutOrder.orderId,
                    amount: state.currentCheckoutOrder.amountPaise,
                    currency: 'INR',
                    status: 'authorized',
                    method: paymentMethod || 'upi',
                    vpa: 'user@okhdfcbank',
                    bank: 'HDFC',
                    fee: 0,
                    tax: 0,
                    error_code: null
                }
            },
            signature: signature
        });

        // Close Modal & Show Celebration
        closeRazorpayModal();
        showPaymentSuccessModal(paymentId, state.currentCheckoutOrder.amount, paymentMethod);
        renderAll();
    }, 1400);
}

function showPaymentSuccessModal(paymentId, amount, method) {
    const successModal = document.getElementById('success-modal');
    if (!successModal) return;

    document.getElementById('success-payment-id').textContent = paymentId;
    document.getElementById('success-amount').textContent = formatINR(amount);
    document.getElementById('success-method').textContent = method || 'Razorpay Turbo UPI';
    document.getElementById('success-sig').textContent = 'rzp_sig_' + Math.random().toString(36).substring(2, 16);

    successModal.classList.remove('hidden');
    lucide.createIcons();
}

function closeSuccessModal() {
    document.getElementById('success-modal').classList.add('hidden');
}

// ==========================================
// 3. MERCHANT AI GROWTH HUB
// ==========================================

function renderMerchantGrowth() {
    const gmvEl = document.getElementById('growth-gmv');
    const convEl = document.getElementById('growth-conversion');
    const aovEl = document.getElementById('growth-aov');
    const recovEl = document.getElementById('growth-recovered');

    if (gmvEl) gmvEl.textContent = formatINR(state.merchantMetrics.totalGmv);
    if (convEl) convEl.textContent = `${state.merchantMetrics.conversionRate}% (+${state.merchantMetrics.conversionUplift}%)`;
    if (aovEl) aovEl.textContent = formatINR(state.merchantMetrics.averageOrderValue);
    if (recovEl) recovEl.textContent = `${formatINR(state.merchantMetrics.recoveredRevenue)} (${state.merchantMetrics.recoveredCartsCount} carts)`;

    renderElasticityChart();
    renderExperimentsList();
    renderTransactionsTable();
}

function renderElasticityChart() {
    const container = document.getElementById('elasticity-chart-bars');
    if (!container) return;

    const data = state.merchantMetrics.elasticityData;
    const maxRev = Math.max(...data.map(d => d.revenue));

    container.innerHTML = data.map((point, i) => {
        const heightPct = Math.round((point.revenue / maxRev) * 100);
        const isOptimal = i === 2; // Optimal point
        const barColor = isOptimal ? 'bg-gradient-to-t from-amber-500 to-orange-500 border-amber-300' : 'bg-gradient-to-t from-[#1e2521] to-[#2c3530] border-white/[0.1]';

        return `
            <div class="flex-1 flex flex-col items-center gap-2 group relative">
                <div class="text-[11px] font-mono text-[#8e9290] group-hover:text-white transition-colors">${formatINR(point.price)}</div>
                <div class="w-full bg-[#080a09] rounded-lg p-1 flex items-end h-40 border border-white/[0.08]">
                    <div class="w-full ${barColor} rounded-md transition-all duration-500 relative flex items-center justify-center border-t shadow-lg" style="height: ${heightPct}%;">
                        ${isOptimal ? `<span class="absolute -top-7 px-2 py-0.5 bg-amber-400 text-[10px] font-black text-slate-950 rounded-full shadow-md whitespace-nowrap animate-bounce font-mono">OPTIMAL YIELD</span>` : ''}
                    </div>
                </div>
                <div class="text-[10px] text-[#8e9290] text-center font-mono">
                    <p class="font-bold text-slate-200">${formatINR(Math.round(point.revenue / 100000))}L Yield</p>
                    <p class="text-slate-500">${point.demand} Orders/mo</p>
                </div>
            </div>
        `;
    }).join('');
}

function renderExperimentsList() {
    const list = document.getElementById('experiments-list');
    if (!list) return;

    list.innerHTML = state.merchantMetrics.activeExperiments.map(exp => `
        <div class="p-4 rounded-xl bg-[#0e1110] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-1">
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    <h4 class="text-sm font-bold text-white">${exp.name}</h4>
                    <span class="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[10px] font-mono font-semibold rounded border border-amber-500/20">${exp.trafficSplit}</span>
                </div>
                <div class="text-xs text-[#8e9290] space-x-3">
                    <span><strong>Variant A:</strong> ${exp.variantA}</span>
                    <span><strong>Variant B:</strong> ${exp.variantB}</span>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <div class="text-right font-mono">
                    <span class="text-xs text-[#8e9290]">Uplift</span>
                    <p class="text-sm font-bold text-emerald-400">${exp.uplift}</p>
                </div>
                <button onclick="deployAIOptimization('${exp.id}')" class="py-2 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-mono font-semibold transition-all">
                    Auto-Deploy
                </button>
            </div>
        </div>
    `).join('');
}

function renderTransactionsTable() {
    const tbody = document.getElementById('tx-feed-tbody');
    if (!tbody) return;

    tbody.innerHTML = state.merchantMetrics.transactionFeed.map(tx => `
        <tr class="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors">
            <td class="py-3 px-3 font-mono text-xs text-blue-400">${tx.id}</td>
            <td class="py-3 px-3 text-xs font-medium text-slate-200">${tx.product}</td>
            <td class="py-3 px-3 text-xs text-slate-400 font-mono">${tx.buyerAgent}</td>
            <td class="py-3 px-3 text-xs">
                <span class="text-slate-500 line-through text-[11px] block">${formatINR(tx.originalPrice)}</span>
                <span class="text-emerald-400 font-bold">${formatINR(tx.settledPrice)}</span>
            </td>
            <td class="py-3 px-3 text-xs text-slate-300">${tx.method}</td>
            <td class="py-3 px-3">
                <span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                    ${tx.status}
                </span>
            </td>
            <td class="py-3 px-3 text-[11px] text-slate-500 font-mono">${tx.timestamp}</td>
        </tr>
    `).join('');
}

function deployAIOptimization(expId) {
    alert(`AI Growth Agent has automatically rolled out Variant B across 100% of checkout traffic. Estimated monthly GMV uplift: +₹4,80,000.`);
}

function triggerNewAIExperiment() {
    const newExp = {
        id: 'exp_0' + (state.merchantMetrics.activeExperiments.length + 1),
        name: 'Autonomous Step-Up Trust Badge vs Standard Gate',
        status: 'RUNNING',
        variantA: 'Standard OTP step-up',
        variantB: 'Biometric Passkey 1-Click Delegation via Razorpay',
        uplift: '+18.9% Conversion Speed',
        trafficSplit: '50/50'
    };
    state.merchantMetrics.activeExperiments.unshift(newExp);
    renderMerchantGrowth();
    lucide.createIcons();
}

// ==========================================
// 4. VERIFIABLE BUDGET & DELEGATION VAULT
// ==========================================

function renderBudgetVault() {
    const dailyInput = document.getElementById('vault-daily-limit');
    const singleCapInput = document.getElementById('vault-single-cap');
    const stepUpInput = document.getElementById('vault-stepup-threshold');
    const currentSpentEl = document.getElementById('vault-current-spent');
    const tokensList = document.getElementById('vault-tokens-list');

    if (dailyInput) dailyInput.value = state.budgetVault.dailyLimit;
    if (singleCapInput) singleCapInput.value = state.budgetVault.singleTxCap;
    if (stepUpInput) stepUpInput.value = state.budgetVault.requireStepUpAbove;
    if (currentSpentEl) currentSpentEl.textContent = formatINR(state.budgetVault.currentSpent);

    if (tokensList) {
        tokensList.innerHTML = state.budgetVault.activeTokens.map(tok => `
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-xs font-bold border border-blue-500/20">
                            ${tok.tokenId}
                        </span>
                        <span class="text-xs text-slate-300 font-medium">Scope: <code class="text-amber-300 font-mono">${tok.scope}</code></span>
                    </div>
                    <span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                        ${tok.status}
                    </span>
                </div>
                <div class="text-xs text-slate-400 grid grid-cols-2 gap-2">
                    <div>Cap Limit: <strong class="text-slate-200">${formatINR(tok.maxLimit)}</strong></div>
                    <div>Expires: <span class="font-mono text-slate-300">${tok.expiresAt}</span></div>
                </div>
                <div class="bg-slate-950 p-2 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-400 break-all">
                    <span class="text-slate-500 select-none">SHA-256 Sig: </span>${tok.signature}
                </div>
            </div>
        `).join('');
    }
}

async function saveBudgetSettings() {
    const dailyLimit = parseInt(document.getElementById('vault-daily-limit').value) || 50000;
    const singleCap = parseInt(document.getElementById('vault-single-cap').value) || 30000;
    const stepUp = parseInt(document.getElementById('vault-stepup-threshold').value) || 20000;

    state.budgetVault.dailyLimit = dailyLimit;
    state.budgetVault.singleTxCap = singleCap;
    state.budgetVault.requireStepUpAbove = stepUp;

    // Generate new signed token
    const newTokenId = 'tok_deleg_' + Math.random().toString(36).substring(2, 7);
    const newSig = await generateSha256(`${newTokenId}|${singleCap}|${new Date().toISOString()}|${state.razorpayConfig.keySecret}`);

    state.budgetVault.activeTokens.unshift({
        tokenId: newTokenId,
        scope: 'shopping.general.autonomous',
        maxLimit: singleCap,
        expiresAt: new Date(Date.now() + 86400000).toISOString(),
        status: 'ACTIVE',
        signature: newSig
    });

    renderAll();
    alert('Delegation vault policy updated. New signed authorization token published.');
}

// ==========================================
// 5. ABANDONED CART AI RECOVERY SIMULATOR
// ==========================================

function renderRecoverySim() {
    const user = state.recoverySim.activeUser;
    const userBox = document.getElementById('recovery-user-details');
    const chatBox = document.getElementById('recovery-chat-window');

    if (userBox) {
        userBox.innerHTML = `
            <div class="space-y-3">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-bold flex items-center justify-center text-base shadow-md">
                        ${user.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                        <h4 class="text-sm font-bold text-white">${user.name}</h4>
                        <p class="text-xs text-slate-400 font-mono">${user.phone}</p>
                    </div>
                </div>
                <div class="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                    <div class="flex justify-between"><span class="text-slate-500">Cart Item:</span> <span class="font-medium text-slate-300">${user.cartItem}</span></div>
                    <div class="flex justify-between"><span class="text-slate-500">Cart Value:</span> <span class="font-bold text-slate-200">${formatINR(user.cartValue)}</span></div>
                    <div class="flex justify-between"><span class="text-slate-500">Drop-off Stage:</span> <span class="text-amber-400 font-medium">${user.dropOffStage}</span></div>
                    <div class="flex justify-between"><span class="text-slate-500">Elapsed:</span> <span class="text-slate-400">${user.timeAgo}</span></div>
                </div>
            </div>
        `;
    }

    if (chatBox) {
        chatBox.innerHTML = state.recoverySim.chatHistory.map(msg => {
            if (msg.sender === 'system') {
                return `
                    <div class="flex justify-center my-2">
                        <span class="text-[11px] bg-slate-800 text-slate-400 px-3 py-1 rounded-full border border-slate-700 font-mono">
                            ${msg.text}
                        </span>
                    </div>
                `;
            }

            const isAI = msg.sender === 'ai';
            return `
                <div class="flex ${isAI ? 'justify-start' : 'justify-end'} mb-3">
                    <div class="max-w-[85%] ${isAI ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700' : 'bg-emerald-700 text-white rounded-tr-none'} p-3.5 rounded-2xl shadow-md space-y-2">
                        <div class="flex items-center justify-between gap-4 text-[10px] ${isAI ? 'text-blue-400' : 'text-emerald-200'} font-semibold">
                            <span>${isAI ? '🤖 Nexus AI Recovery Assistant' : '👤 ' + user.name}</span>
                            <span class="text-slate-400 font-mono">${msg.timestamp}</span>
                        </div>
                        <p class="text-xs leading-relaxed">${msg.text}</p>
                        ${msg.hasPaymentLink ? `
                            <div class="mt-2 p-3 bg-slate-950/80 rounded-xl border border-emerald-500/40 space-y-2">
                                <div class="flex items-center justify-between text-xs">
                                    <span class="font-bold text-white">Razorpay Dynamic Payment Link</span>
                                    <span class="text-emerald-400 font-black">${formatINR(msg.paymentLink.amount)}</span>
                                </div>
                                <div class="flex items-center justify-between text-[11px] text-slate-400">
                                    <span class="line-through">Original: ${formatINR(msg.paymentLink.discountedFrom)}</span>
                                    <span class="text-amber-400 font-mono font-bold animate-pulse">Expires in ${msg.paymentLink.expiresIn}</span>
                                </div>
                                <button onclick="settleRecoveryPaymentLink('${msg.paymentLink.id}', ${msg.paymentLink.amount})" class="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-lg shadow flex items-center justify-center gap-1.5 transition-all">
                                    <i data-lucide="zap" class="w-3.5 h-3.5"></i>
                                    <span>Pay ${formatINR(msg.paymentLink.amount)} via Razorpay Turbo UPI</span>
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    lucide.createIcons();
}

function sendRecoveryReply() {
    const input = document.getElementById('recovery-input-text');
    const text = input.value.trim();
    if (!text) return;

    state.recoverySim.chatHistory.push({
        sender: 'user',
        text: text,
        timestamp: 'Just now'
    });
    input.value = '';
    renderRecoverySim();

    // AI dynamic response
    setTimeout(() => {
        state.recoverySim.chatHistory.push({
            sender: 'ai',
            text: `Thanks for the reply, ${state.recoverySim.activeUser.name.split(' ')[0]}. We've also added the 1-year extended warranty at no additional cost. You can complete the checkout using the link above whenever you're ready.`,
            timestamp: 'Just now',
            hasPaymentLink: false
        });
        renderRecoverySim();
    }, 1200);
}

function settleRecoveryPaymentLink(linkId, amount) {
    state.merchantMetrics.recoveredRevenue += amount;
    state.merchantMetrics.recoveredCartsCount += 1;
    state.merchantMetrics.totalGmv += amount;
    state.merchantMetrics.ordersCount += 1;
    state.merchantMetrics.transactionFeed.unshift({
        id: 'txn_recov_' + Math.random().toString(36).substring(2, 6),
        product: state.recoverySim.activeUser.cartItem + ' (Recovered)',
        buyerAgent: 'Nexus-Recovery-AI',
        originalPrice: state.recoverySim.activeUser.cartValue,
        settledPrice: amount,
        method: 'Razorpay Dynamic Payment Link (Turbo UPI)',
        status: 'PAID',
        timestamp: 'Just now'
    });

    state.recoverySim.chatHistory.push({
        sender: 'system',
        text: `Payment Link ${linkId} settled for ${formatINR(amount)}. Order marked as PAID in Razorpay.`,
        timestamp: 'Just now'
    });

    renderAll();
    alert(`Payment link ${linkId} settled for ${formatINR(amount)}. Order confirmed.`);
}

// ==========================================
// 6. PROTOCOL & WEBHOOK INSPECTOR
// ==========================================

function recordProtocolMessage(method, direction, payload) {
    state.protocolMessages.unshift({
        id: 'msg_' + Math.random().toString(36).substring(2, 8),
        method,
        direction,
        timestamp: new Date().toISOString(),
        payload
    });
    if (state.activeTab === 'protocol-inspector') {
        renderProtocolInspector();
    }
}

function renderProtocolInspector() {
    const list = document.getElementById('protocol-logs-list');
    if (!list) return;

    if (state.protocolMessages.length === 0) {
        list.innerHTML = `
            <div class="text-center py-12 text-slate-500 text-xs">
                No A2A or Razorpay messages generated yet. Run a shopping flow to inspect live traces.
            </div>
        `;
        return;
    }

    list.innerHTML = state.protocolMessages.map(msg => `
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono text-xs font-bold border border-indigo-500/20">
                        ${msg.method}
                    </span>
                    <span class="text-xs text-slate-400 font-mono">${msg.direction}</span>
                </div>
                <span class="text-[11px] text-slate-500 font-mono">${msg.timestamp}</span>
            </div>
            <pre class="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto"><code>${JSON.stringify(msg.payload, null, 2)}</code></pre>
        </div>
    `).join('');
}

function clearProtocolLogs() {
    state.protocolMessages = [];
    renderProtocolInspector();
}

// ==========================================
// Event Listeners & Helpers
// ==========================================

function initEventListeners() {
    const recovInput = document.getElementById('recovery-input-text');
    if (recovInput) {
        recovInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendRecoveryReply();
        });
    }
}

function switchTab(tabId) {
    const btn = document.querySelector(`.nav-tab[data-tab="${tabId}"]`);
    if (btn) btn.click();
}
