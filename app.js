// RazorNexus — Multi-Agent Shopping Engine
// Built by Palash Tripathi (Noida, India)

const state = {
    activeTab: 'buyer-arena',
    catalog: [
        {
            id: 'prod_101',
            name: 'Sony WH-1000XM5 Wireless Headphones',
            category: 'Electronics',
            base_price: 29990,
            min_margin_price: 23500,
            current_inventory: 42,
            inventory_holding_cost_daily: 15,
            elasticity_score: 1.45,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
            bundle_addons: [
                { id: 'addon_1', name: 'Protective Travel Case', retail_price: 2499, negotiated_price: 699 },
                { id: 'addon_2', name: '1-Year Comprehensive Warranty', retail_price: 1999, negotiated_price: 499 }
            ],
            razorpay_incentives: {
                turbo_upi: { discount_pct: 3, max_discount: 750 }
            }
        },
        {
            id: 'prod_102',
            name: 'Ergonomic Office Chair with 4D Armrests',
            category: 'Furniture',
            base_price: 18499,
            min_margin_price: 13999,
            current_inventory: 18,
            inventory_holding_cost_daily: 45,
            elasticity_score: 1.65,
            image: 'https://images.unsplash.com/photo-1580481077195-c3a8a37f714b?w=500&auto=format&fit=crop&q=80',
            bundle_addons: [
                { id: 'addon_3', name: 'Memory Foam Lumbar Cushion', retail_price: 1899, negotiated_price: 399 },
                { id: 'addon_4', name: 'Smooth Rollerblade Wheels Set', retail_price: 1299, negotiated_price: 299 }
            ],
            razorpay_incentives: {
                turbo_upi: { discount_pct: 4, max_discount: 600 }
            }
        },
        {
            id: 'prod_103',
            name: '34-inch UltraWide Curved Monitor',
            category: 'Electronics',
            base_price: 38990,
            min_margin_price: 31500,
            current_inventory: 11,
            inventory_holding_cost_daily: 60,
            elasticity_score: 1.25,
            image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80',
            bundle_addons: [
                { id: 'addon_5', name: 'Heavy-Duty Gas Spring Monitor Arm', retail_price: 3999, negotiated_price: 1199 },
                { id: 'addon_6', name: 'Auto-Dimming Monitor Light Bar', retail_price: 4499, negotiated_price: 1499 }
            ],
            razorpay_incentives: {
                turbo_upi: { discount_pct: 2.5, max_discount: 900 }
            }
        },
        {
            id: 'prod_104',
            name: 'CloudScale Developer Cloud Platform (Annual)',
            category: 'Developer Tools',
            base_price: 24000,
            min_margin_price: 16000,
            current_inventory: 9999,
            inventory_holding_cost_daily: 0,
            elasticity_score: 2.1,
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=80',
            bundle_addons: [
                { id: 'addon_7', name: 'Dedicated GPU Accelerator (500 Compute Hrs)', retail_price: 6000, negotiated_price: 1499 }
            ],
            razorpay_incentives: {
                turbo_upi: { discount_pct: 5, max_discount: 1200 }
            }
        }
    ],
    budgetVault: {
        dailyLimit: 50000,
        singleTxCap: 30000,
        requireStepUpAbove: 20000,
        currentSpent: 14200,
        activeTokens: [
            { tokenId: 'tok_pass_984a', scope: 'General Shopping', maxLimit: 30000, expiresAt: 'Tomorrow', status: 'ACTIVE' }
        ]
    },
    activeNegotiation: null,
    negotiationLogs: [],
    merchantMetrics: {
        totalGmv: 489240,
        conversionRate: 64.8,
        conversionUplift: 31.4,
        averageOrderValue: 11648,
        recoveredRevenue: 98450,
        recoveredCartsCount: 14,
        ordersCount: 42,
        transactionFeed: [
            { id: 'txn_9821', product: 'Sony WH-1000XM5 + Case', buyerAgent: 'Personal Shopper AI', originalPrice: 32489, settledPrice: 26490, method: 'Razorpay Turbo UPI', status: 'PAID', timestamp: '2 mins ago' },
            { id: 'txn_9820', product: 'Ergonomic Office Chair', buyerAgent: 'Workspace Assistant', originalPrice: 18499, settledPrice: 14999, method: 'Razorpay Cards (No-Cost EMI)', status: 'PAID', timestamp: '11 mins ago' },
            { id: 'txn_9819', product: 'CloudScale Pro Platform', buyerAgent: 'DevOps Auto-Buyer', originalPrice: 24000, settledPrice: 19200, method: 'Razorpay Subscriptions', status: 'PAID', timestamp: '28 mins ago' }
        ]
    },
    recoverySim: {
        activeUser: {
            name: 'Priya Sharma',
            phone: '+91 98765 43210',
            cartItem: 'Sony WH-1000XM5 Headphones',
            cartValue: 29990,
            dropOffStage: 'Payment Step (exited at payment method selection)',
            timeAgo: '14 minutes ago'
        },
        chatHistory: [
            {
                sender: 'system',
                text: 'Shopper left cart on Razorpay Checkout.',
                timestamp: '14 mins ago'
            },
            {
                sender: 'ai',
                text: 'Hi Priya, we noticed you left the Sony WH-1000XM5 in your cart. We just created a special ₹2,500 discount + bundled the free protective travel case if you complete your order in the next 15 minutes via UPI.',
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

// Currency Formatter
function formatINR(num) {
    if (isNaN(num)) return '₹0';
    return '₹' + Number(num).toLocaleString('en-IN');
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    renderAll();
});

// Tab Switcher
function initTabs() {
    const tabButtons = document.querySelectorAll('.nav-tab');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            switchTab(target);
        });
    });
}

function switchTab(targetTabId) {
    state.activeTab = targetTabId;
    const tabButtons = document.querySelectorAll('.nav-tab');

    tabButtons.forEach(b => {
        const t = b.getAttribute('data-tab');
        if (t === targetTabId) {
            b.classList.add('active-tab', 'text-zinc-100', 'bg-[#1e1e1e]', 'border', 'border-[#333333]');
            b.classList.remove('text-zinc-400');
        } else {
            b.classList.remove('active-tab', 'text-zinc-100', 'bg-[#1e1e1e]', 'border', 'border-[#333333]');
            b.classList.add('text-zinc-400');
        }
    });

    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.add('hidden'));
    const activeContent = document.getElementById(targetTabId);
    if (activeContent) activeContent.classList.remove('hidden');

    renderAll();
}

// Master Render Controller
function renderAll() {
    renderHeaderStats();
    if (state.activeTab === 'buyer-arena') renderBuyerArena();
    if (state.activeTab === 'merchant-growth') renderMerchantGrowth();
    if (state.activeTab === 'budget-vault') renderBudgetVault();
    if (state.activeTab === 'recovery-sim') renderRecoverySim();
    lucide.createIcons();
}

function renderHeaderStats() {
    const budgetText = document.getElementById('header-budget-text');
    if (budgetText) {
        budgetText.textContent = `Daily Budget: ${formatINR(state.budgetVault.dailyLimit)}`;
    }
}

// ==========================================
// 1. SHOP WITH AI (BARGAINING FLOW)
// ==========================================

function selectProductPreset(productId, promptText, budget) {
    document.querySelectorAll('#product-card-selector > div').forEach(card => {
        card.classList.remove('black-selected');
    });
    const selectedCard = document.getElementById('card-' + productId);
    if (selectedCard) selectedCard.classList.add('black-selected');

    const promptInput = document.getElementById('buyer-goal-input');
    const budgetInput = document.getElementById('buyer-budget-input');
    const hiddenSelect = document.getElementById('target-product-select');

    if (promptInput) promptInput.value = promptText;
    if (budgetInput && budget) budgetInput.value = budget;
    if (hiddenSelect) hiddenSelect.value = productId;
}

function renderBuyerArena() {
    renderNegotiationTimeline();
}

async function startAgentNegotiation() {
    const goalInput = document.getElementById('buyer-goal-input').value.trim();
    const selectedProdId = document.getElementById('target-product-select').value || 'prod_101';
    const maxBudget = parseInt(document.getElementById('buyer-budget-input').value) || 28000;

    if (!goalInput) {
        alert('Please select an item or specify instructions.');
        return;
    }

    let targetProduct = state.catalog.find(p => p.id === selectedProdId) || state.catalog[0];

    const btn = document.getElementById('btn-start-negotiation');
    const statusPill = document.getElementById('negotiation-status-pill');
    btn.disabled = true;
    btn.innerHTML = `Bargaining in progress...`;
    if (statusPill) {
        statusPill.textContent = '● BARGAINING';
        statusPill.className = 'text-[11px] font-mono text-amber-400';
    }

    state.negotiationLogs = [];
    state.activeNegotiation = {
        product: targetProduct,
        maxBudget,
        deal: null
    };

    renderNegotiationTimeline();

    // Step 1: Buyer AI Strategy
    await logAgentStep('buyer', 'Step 1: Item & Spending Limit Check', [
        `Target: ${targetProduct.name}`,
        `Your Budget Cap: ${formatINR(maxBudget)}`,
        `Safety Check: Authorized within daily limit (${formatINR(state.budgetVault.dailyLimit)})`,
        `Action: Connecting to store pricing agent...`
    ], 800);

    // Step 2: Store AI Offer
    const initialStoreOffer = Math.round(targetProduct.base_price * 0.93);
    await logAgentStep('merchant', 'Step 2: Store Inventory Check & First Offer', [
        `Inventory: ${targetProduct.current_inventory} units in stock`,
        `Regular Retail Price: ${formatINR(targetProduct.base_price)}`,
        `Initial Offer: ${formatINR(initialStoreOffer)} (7% discount)`
    ], 1000);

    // Step 3: Buyer AI Counter & Bundle Request
    const targetBundle = targetProduct.bundle_addons[0];
    await logAgentStep('buyer', 'Step 3: Buyer Counter & Bundle Proposal', [
        `Counter Pitch: "We will settle immediately via Razorpay if you bundle the ${targetBundle.name} (regular: ${formatINR(targetBundle.retail_price)}) at a steep discount."`
    ], 1100);

    // Step 4: Final Deal Agreement
    const baseSettled = Math.round(targetProduct.base_price * 0.87);
    const addonSettled = targetBundle.negotiated_price;
    const upiDiscount = targetProduct.razorpay_incentives.turbo_upi.max_discount;
    const finalPackageTotal = baseSettled + addonSettled - upiDiscount;
    const totalSavings = (targetProduct.base_price + targetBundle.retail_price) - finalPackageTotal;

    await logAgentStep('merchant', 'Step 4: Package Agreement & Turbo UPI Rebate Applied', [
        `Store accepted bundle combination!`,
        `Main Item: ${formatINR(baseSettled)}`,
        `Bundle Accessory (${targetBundle.name}): ${formatINR(addonSettled)} (Save ${formatINR(targetBundle.retail_price - addonSettled)})`,
        `Razorpay Turbo UPI Incentive: -${formatINR(upiDiscount)} rebate`,
        `Final Locked Price: ${formatINR(finalPackageTotal)} (Total Savings: ${formatINR(totalSavings)})`
    ], 1200);

    // Step 5: Safety Clearance
    const requiresStepUp = finalPackageTotal > state.budgetVault.requireStepUpAbove;
    await logAgentStep('buyer', 'Step 5: Safety Verification & Clearance', [
        `Budget Verification: ${formatINR(finalPackageTotal)} is within daily limits.`,
        requiresStepUp 
            ? `Step-Up Trigger: Order exceeds ₹${formatINR(state.budgetVault.requireStepUpAbove)} threshold. Quick 1-click human confirmation required.`
            : `Autonomous Clearance: Order ready for settlement.`
    ], 700);

    // Save active deal
    state.activeNegotiation.deal = {
        product: targetProduct,
        addon: targetBundle,
        originalTotal: targetProduct.base_price + targetBundle.retail_price,
        finalTotal: finalPackageTotal,
        savings: totalSavings,
        paymentRail: 'Razorpay Turbo UPI',
        requiresStepUp
    };

    btn.disabled = false;
    btn.innerHTML = `<span>Find Best Deal & Bargain</span> <span class="font-mono text-[10px]">↵</span>`;
    if (statusPill) {
        statusPill.textContent = '● DEAL LOCKED';
        statusPill.className = 'text-[11px] font-mono text-emerald-400';
    }

    renderNegotiationTimeline();
}

async function logAgentStep(agentType, title, bulletPoints, delayMs) {
    return new Promise(resolve => {
        setTimeout(() => {
            state.negotiationLogs.push({
                agentType,
                title,
                bulletPoints,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
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
                Awaiting instruction. Pick an item on the left and click "Find Best Deal & Bargain".
            </div>
        `;
        if (resultBox) resultBox.classList.add('hidden');
        return;
    }

    container.innerHTML = state.negotiationLogs.map(log => {
        const isBuyer = log.agentType === 'buyer';
        const roleLabel = isBuyer ? 'BUYER_AI' : 'STORE_AI';
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

    // Render Deal Summary Box
    if (state.activeNegotiation && state.activeNegotiation.deal && resultBox) {
        const d = state.activeNegotiation.deal;
        resultBox.classList.remove('hidden');
        resultBox.innerHTML = `
            <div class="black-panel p-4 space-y-3 font-mono text-xs">
                <div class="flex items-center justify-between border-b border-[#262626] pb-2">
                    <span class="text-zinc-100 font-semibold uppercase">03 / Negotiated Order Summary</span>
                    <span class="text-emerald-400">READY_FOR_PAYMENT</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-300">
                    <div class="space-y-1">
                        <div>Item: <strong>${d.product.name}</strong></div>
                        <div class="text-emerald-400">Bundle Addon: <strong>${d.addon.name}</strong></div>
                        <div class="text-zinc-500">Payment: Razorpay Turbo UPI</div>
                    </div>
                    <div class="space-y-1 sm:text-right">
                        <div class="text-zinc-500 line-through">Regular Total: ${formatINR(d.originalTotal)}</div>
                        <div class="text-sm font-bold text-zinc-100">Settlement Total: ${formatINR(d.finalTotal)}</div>
                        <div class="text-emerald-400 font-semibold">Total Savings: ${formatINR(d.savings)}</div>
                    </div>
                </div>

                <div class="flex gap-2 pt-2 border-t border-[#262626]">
                    <button onclick="launchRazorpayCheckout()" class="flex-1 py-2.5 px-3 btn-primary text-xs font-semibold">
                        Pay with Razorpay (${formatINR(d.finalTotal)})
                    </button>
                </div>
            </div>
        `;
    }
}

// ==========================================
// 2. RAZORPAY CHECKOUT MODAL
// ==========================================

function launchRazorpayCheckout() {
    if (!state.activeNegotiation || !state.activeNegotiation.deal) return;
    const deal = state.activeNegotiation.deal;

    const modal = document.getElementById('razorpay-modal');
    if (!modal) return;

    state.currentCheckoutOrder = {
        orderId: 'order_rzp_' + Math.random().toString(36).substring(2, 8),
        amount: deal.finalTotal,
        savings: deal.savings,
        item: `${deal.product.name} (+ ${deal.addon.name})`,
        requiresStepUp: deal.requiresStepUp
    };

    document.getElementById('rzp-modal-order-id').textContent = 'order_' + state.currentCheckoutOrder.orderId;
    document.getElementById('rzp-modal-amount').textContent = formatINR(deal.finalTotal);
    document.getElementById('rzp-modal-item-name').textContent = state.currentCheckoutOrder.item;
    document.getElementById('rzp-modal-savings').textContent = `Saved ${formatINR(deal.savings)}`;

    const stepUpBox = document.getElementById('rzp-stepup-notice');
    if (stepUpBox) {
        if (deal.requiresStepUp) stepUpBox.classList.remove('hidden');
        else stepUpBox.classList.add('hidden');
    }

    selectPaymentTab('turbo-upi');
    modal.classList.remove('hidden');
}

function selectPaymentTab(tabName) {
    const tabs = ['turbo-upi', 'cards', 'emi'];
    tabs.forEach(t => {
        const btn = document.getElementById(`paytab-btn-${t}`);
        const view = document.getElementById(`payview-${t}`);
        if (t === tabName) {
            if (btn) {
                btn.className = 'py-1.5 text-xs font-medium bg-[#222222] text-white rounded';
            }
            if (view) view.classList.remove('hidden');
        } else {
            if (btn) {
                btn.className = 'py-1.5 text-xs font-medium text-zinc-400 hover:text-white rounded';
            }
            if (view) view.classList.add('hidden');
        }
    });
}

function closeRazorpayModal() {
    const modal = document.getElementById('razorpay-modal');
    if (modal) modal.classList.add('hidden');
}

function executePayment(paymentMethod) {
    if (!state.currentCheckoutOrder) return;

    const btn = document.getElementById('btn-confirm-pay');
    btn.disabled = true;
    btn.innerHTML = `Authorizing...`;

    setTimeout(() => {
        const paymentId = 'pay_' + Math.random().toString(36).substring(2, 9);

        state.budgetVault.currentSpent += state.currentCheckoutOrder.amount;
        state.merchantMetrics.totalGmv += state.currentCheckoutOrder.amount;
        state.merchantMetrics.ordersCount += 1;

        state.merchantMetrics.transactionFeed.unshift({
            id: 'txn_' + Math.random().toString(36).substring(2, 6),
            product: state.currentCheckoutOrder.item,
            buyerAgent: 'Personal Shopper AI',
            originalPrice: state.currentCheckoutOrder.amount + state.currentCheckoutOrder.savings,
            settledPrice: state.currentCheckoutOrder.amount,
            method: paymentMethod || 'Razorpay Turbo UPI',
            status: 'PAID',
            timestamp: 'Just now'
        });

        closeRazorpayModal();
        showPaymentSuccessModal(paymentId, state.currentCheckoutOrder.amount, paymentMethod);
        renderAll();
    }, 1200);
}

function showPaymentSuccessModal(paymentId, amount, method) {
    const successModal = document.getElementById('success-modal');
    if (!successModal) return;

    document.getElementById('success-payment-id').textContent = paymentId;
    document.getElementById('success-amount').textContent = formatINR(amount);
    document.getElementById('success-method').textContent = method || 'Razorpay Turbo UPI';

    successModal.classList.remove('hidden');
}

function closeSuccessModal() {
    document.getElementById('success-modal').classList.add('hidden');
}

// ==========================================
// 3. STORE DASHBOARD
// ==========================================

function renderMerchantGrowth() {
    const gmvEl = document.getElementById('growth-gmv');
    const convEl = document.getElementById('growth-conversion');
    const aovEl = document.getElementById('growth-aov');
    const recovEl = document.getElementById('growth-recovered');

    if (gmvEl) gmvEl.textContent = formatINR(state.merchantMetrics.totalGmv);
    if (convEl) convEl.textContent = `${state.merchantMetrics.conversionRate}%`;
    if (aovEl) aovEl.textContent = formatINR(state.merchantMetrics.averageOrderValue);
    if (recovEl) recovEl.textContent = `${formatINR(state.merchantMetrics.recoveredRevenue)} (${state.merchantMetrics.recoveredCartsCount} carts)`;

    renderTransactionsTable();
}

function renderTransactionsTable() {
    const tbody = document.getElementById('tx-feed-tbody');
    if (!tbody) return;

    tbody.innerHTML = state.merchantMetrics.transactionFeed.map(tx => `
        <tr class="hover:bg-[#151515] transition-colors">
            <td class="py-2.5 px-2.5 font-medium text-zinc-200">${tx.product}</td>
            <td class="py-2.5 px-2.5 text-zinc-400">${tx.buyerAgent}</td>
            <td class="py-2.5 px-2.5 text-zinc-500 line-through">${formatINR(tx.originalPrice)}</td>
            <td class="py-2.5 px-2.5 font-bold text-zinc-100">${formatINR(tx.settledPrice)}</td>
            <td class="py-2.5 px-2.5 text-zinc-400">${tx.method}</td>
            <td class="py-2.5 px-2.5"><span class="text-emerald-400 font-semibold">PAID</span></td>
        </tr>
    `).join('');
}

// ==========================================
// 4. SAFETY & BUDGET CONTROLS
// ==========================================

function renderBudgetVault() {
    const dailyInput = document.getElementById('vault-daily-limit');
    const stepUpInput = document.getElementById('vault-stepup-threshold');
    const tokensList = document.getElementById('vault-tokens-list');

    if (dailyInput) dailyInput.value = state.budgetVault.dailyLimit;
    if (stepUpInput) stepUpInput.value = state.budgetVault.requireStepUpAbove;

    if (tokensList) {
        tokensList.innerHTML = `
            <div class="p-3 rounded bg-[#0d0d0d] border border-[#222222] space-y-1 font-mono text-xs">
                <div class="flex items-center justify-between">
                    <span class="font-semibold text-zinc-200">tok_deleg_984a1</span>
                    <span class="text-emerald-400">ACTIVE</span>
                </div>
                <div class="text-zinc-400 text-[11px]">
                    Scope: shopping.general.autonomous | Cap: ${formatINR(state.budgetVault.dailyLimit)}
                </div>
                <div class="text-zinc-500 text-[10px]">
                    Enforces strict daily spend limits and human step-up authorization.
                </div>
            </div>
        `;
    }
}

function saveBudgetSettings() {
    const dailyLimit = parseInt(document.getElementById('vault-daily-limit').value) || 50000;
    const stepUp = parseInt(document.getElementById('vault-stepup-threshold').value) || 20000;

    state.budgetVault.dailyLimit = dailyLimit;
    state.budgetVault.requireStepUpAbove = stepUp;

    renderAll();
    alert('Safety rules saved. New spending authorization token published.');
}

// ==========================================
// 5. WHATSAPP CART RECOVERY
// ==========================================

function renderRecoverySim() {
    const user = state.recoverySim.activeUser;
    const detailsBox = document.getElementById('recovery-user-details');
    const chatBox = document.getElementById('recovery-chat-window');

    if (detailsBox) {
        detailsBox.innerHTML = `
            <div class="space-y-1.5">
                <div><span class="text-zinc-500">Customer:</span> <span class="text-zinc-200">${user.name}</span></div>
                <div><span class="text-zinc-500">Item:</span> <span class="text-zinc-200">${user.cartItem}</span></div>
                <div><span class="text-zinc-500">Cart Value:</span> <span class="text-zinc-100 font-bold">${formatINR(user.cartValue)}</span></div>
                <div><span class="text-zinc-500">Drop-off:</span> <span class="text-amber-400">${user.dropOffStage}</span></div>
            </div>
        `;
    }

    if (chatBox) {
        chatBox.innerHTML = state.recoverySim.chatHistory.map(msg => {
            if (msg.sender === 'system') {
                return `
                    <div class="flex justify-center my-2">
                        <span class="text-[10px] bg-[#141414] text-zinc-500 px-2.5 py-1 rounded border border-[#222222] font-mono">
                            ${msg.text}
                        </span>
                    </div>
                `;
            }

            const isAI = msg.sender === 'ai';
            return `
                <div class="flex ${isAI ? 'justify-start' : 'justify-end'} mb-3">
                    <div class="max-w-[85%] ${isAI ? 'bg-[#141414] text-zinc-200 rounded-tl-none border border-[#262626]' : 'bg-[#1f2420] text-zinc-100 rounded-tr-none border border-emerald-800/40'} p-3 rounded-lg shadow space-y-2 font-mono">
                        <div class="flex items-center justify-between gap-4 text-[10px] ${isAI ? 'text-zinc-400' : 'text-emerald-300'} font-semibold">
                            <span>${isAI ? 'STORE_AI' : user.name}</span>
                            <span class="text-zinc-600">${msg.timestamp}</span>
                        </div>
                        <p class="text-xs leading-relaxed font-sans">${msg.text}</p>
                        ${msg.hasPaymentLink ? `
                            <div class="mt-2 p-2.5 bg-[#0a0a0a] rounded border border-[#262626] space-y-1.5">
                                <div class="flex items-center justify-between text-xs font-mono">
                                    <span class="text-zinc-300">Razorpay Payment Link</span>
                                    <span class="text-emerald-400 font-bold">${formatINR(msg.paymentLink.amount)}</span>
                                </div>
                                <div class="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                                    <span class="line-through">Regular: ${formatINR(msg.paymentLink.discountedFrom)}</span>
                                    <span class="text-amber-400">Expires in ${msg.paymentLink.expiresIn}</span>
                                </div>
                                <button onclick="settleRecoveryPaymentLink('${msg.paymentLink.id}', ${msg.paymentLink.amount})" class="w-full py-1.5 btn-primary text-xs font-mono">
                                    Pay ${formatINR(msg.paymentLink.amount)} via UPI
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
        chatBox.scrollTop = chatBox.scrollHeight;
    }
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

    setTimeout(() => {
        state.recoverySim.chatHistory.push({
            sender: 'ai',
            text: `Thanks for the reply, ${state.recoverySim.activeUser.name.split(' ')[0]}. We've also included the 1-year warranty for free. You can finish your order directly through the link above whenever you're ready.`,
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
        buyerAgent: 'WhatsApp Recovery AI',
        originalPrice: state.recoverySim.activeUser.cartValue,
        settledPrice: amount,
        method: 'Razorpay Payment Link (UPI)',
        status: 'PAID',
        timestamp: 'Just now'
    });

    state.recoverySim.chatHistory.push({
        sender: 'system',
        text: `Payment link ${linkId} settled for ${formatINR(amount)}. Order marked as PAID in Razorpay.`,
        timestamp: 'Just now'
    });

    renderAll();
    alert(`Payment link settled for ${formatINR(amount)}. Order confirmed.`);
}
