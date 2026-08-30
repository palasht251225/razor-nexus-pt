// RazorNexus — Simple, Clean & Friendly Multi-Agent Shopping Engine
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
                text: 'Hi Priya! We noticed you left the Sony WH-1000XM5 in your cart. We just created a special ₹2,500 discount + bundled the free protective travel case if you complete your order in the next 15 minutes via UPI.',
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
            b.classList.add('active-tab', 'text-white', 'bg-blue-600', 'shadow-sm');
            b.classList.remove('text-slate-300');
        } else {
            b.classList.remove('active-tab', 'text-white', 'bg-blue-600', 'shadow-sm');
            b.classList.add('text-slate-300');
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
    // Update active highlight on cards
    document.querySelectorAll('#product-card-selector > div').forEach(card => {
        card.classList.remove('app-card-selected');
    });
    const selectedCard = document.getElementById('card-' + productId);
    if (selectedCard) selectedCard.classList.add('app-card-selected');

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
        alert('Please pick an item or enter your instructions.');
        return;
    }

    let targetProduct = state.catalog.find(p => p.id === selectedProdId) || state.catalog[0];

    const btn = document.getElementById('btn-start-negotiation');
    const statusPill = document.getElementById('negotiation-status-pill');
    btn.disabled = true;
    btn.innerHTML = `<span>⏳ AI is bargaining with store...</span>`;
    if (statusPill) {
        statusPill.textContent = '● Bargaining in Progress...';
        statusPill.className = 'text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20';
    }

    state.negotiationLogs = [];
    state.activeNegotiation = {
        product: targetProduct,
        maxBudget,
        deal: null
    };

    renderNegotiationTimeline();

    // Step 1: Buyer AI Strategy
    await logAgentStep('buyer', '🔍 Step 1: Checking Item & Budget Rules', [
        `Looking for: ${targetProduct.name}`,
        `Your Budget Cap: ${formatINR(maxBudget)}`,
        `Safety Check: Authorized within daily limit (${formatINR(state.budgetVault.dailyLimit)})`,
        `Action: Connecting to store to request initial price...`
    ], 800);

    // Step 2: Store AI Offer
    const initialStoreOffer = Math.round(targetProduct.base_price * 0.93);
    await logAgentStep('merchant', '🏪 Step 2: Store Checks Inventory & Gives Offer', [
        `Store has ${targetProduct.current_inventory} units in stock.`,
        `Regular Retail Price: ${formatINR(targetProduct.base_price)}`,
        `Store's First Offer: ${formatINR(initialStoreOffer)} (7% off).`
    ], 1000);

    // Step 3: Buyer AI Counter & Bundle Request
    const targetBundle = targetProduct.bundle_addons[0];
    await logAgentStep('buyer', '🤝 Step 3: Your AI Asks for a Bundle Deal', [
        `Your AI: "We can pay right now if you include the ${targetBundle.name} (regular price: ${formatINR(targetBundle.retail_price)}) at a steep discount."`
    ], 1100);

    // Step 4: Final Deal Agreement
    const baseSettled = Math.round(targetProduct.base_price * 0.87);
    const addonSettled = targetBundle.negotiated_price;
    const upiDiscount = targetProduct.razorpay_incentives.turbo_upi.max_discount;
    const finalPackageTotal = baseSettled + addonSettled - upiDiscount;
    const totalSavings = (targetProduct.base_price + targetBundle.retail_price) - finalPackageTotal;

    await logAgentStep('merchant', '🎉 Step 4: Deal Agreed & Extra UPI Discount Applied!', [
        `Store agreed to package both items together!`,
        `Main Item: ${formatINR(baseSettled)}`,
        `Bundle Addon (${targetBundle.name}): Only ${formatINR(addonSettled)} (Save ${formatINR(targetBundle.retail_price - addonSettled)})`,
        `Razorpay Turbo UPI Incentive: Instant -${formatINR(upiDiscount)} off!`,
        `Final Locked Price: ${formatINR(finalPackageTotal)} (You save ${formatINR(totalSavings)} total!)`
    ], 1200);

    // Step 5: Safety Clearance
    const requiresStepUp = finalPackageTotal > state.budgetVault.requireStepUpAbove;
    await logAgentStep('buyer', '🛡️ Step 5: Safety Verification & Checkout Ready', [
        `Total ${formatINR(finalPackageTotal)} is within your daily budget.`,
        requiresStepUp 
            ? `Notice: Amount is above ₹${formatINR(state.budgetVault.requireStepUpAbove)} threshold. Quick 1-click confirmation required.`
            : `Verified & Ready: 1-Click checkout prepared.`
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
    btn.innerHTML = `<span>🤝 Find Best Deal & Bargain Now</span>`;
    if (statusPill) {
        statusPill.textContent = '✅ Deal Locked!';
        statusPill.className = 'text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20';
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
            <div class="py-12 text-center text-slate-400 space-y-2">
                <div class="text-3xl">🤖 💬 🏪</div>
                <p class="text-sm font-semibold text-white">No active negotiation yet</p>
                <p class="text-xs text-slate-400 max-w-sm mx-auto">Pick an item on the left and click <strong>"Find Best Deal & Bargain Now"</strong> to watch your AI bargain live.</p>
            </div>
        `;
        if (resultBox) resultBox.classList.add('hidden');
        return;
    }

    container.innerHTML = state.negotiationLogs.map(log => {
        const isBuyer = log.agentType === 'buyer';
        const senderBadge = isBuyer 
            ? `<span class="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-md font-bold text-[11px] border border-blue-500/20">👤 Your AI Shopper</span>`
            : `<span class="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-md font-bold text-[11px] border border-emerald-500/20">🏪 Store AI</span>`;

        return `
            <div class="p-3.5 rounded-xl bg-[#0e121a] border border-[#242c3d] space-y-2 text-xs">
                <div class="flex items-center justify-between">
                    ${senderBadge}
                    <span class="text-slate-500 text-[11px]">${log.timestamp}</span>
                </div>
                <h4 class="font-bold text-white text-xs">${log.title}</h4>
                <div class="space-y-1 text-slate-300 pl-2 border-l-2 border-slate-700">
                    ${log.bulletPoints.map(bp => `<div>• ${bp}</div>`).join('')}
                </div>
            </div>
        `;
    }).join('');

    container.scrollTop = container.scrollHeight;

    // Render Deal Summary
    if (state.activeNegotiation && state.activeNegotiation.deal && resultBox) {
        const d = state.activeNegotiation.deal;
        resultBox.classList.remove('hidden');
        resultBox.innerHTML = `
            <div class="app-card p-5 space-y-4 border-emerald-500/40 bg-gradient-to-br from-[#141822] to-[#12201c] shadow-xl">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="text-lg">🎉</span>
                        <h3 class="text-sm font-bold text-white">Best Deal Secured!</h3>
                    </div>
                    <span class="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold text-xs rounded-full border border-emerald-500/30">
                        You Save ${formatINR(d.savings)} Total!
                    </span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-[#0e121a] rounded-xl border border-[#242c3d]">
                    <div class="space-y-1 text-xs">
                        <div class="text-white font-bold">${d.product.name}</div>
                        <div class="text-emerald-400 font-medium">🎁 Includes: ${d.addon.name}</div>
                        <div class="text-slate-400 text-[11px]">Payment: Razorpay Turbo UPI</div>
                    </div>
                    <div class="sm:text-right space-y-0.5">
                        <div class="text-slate-400 text-xs line-through">Regular Total: ${formatINR(d.originalTotal)}</div>
                        <div class="text-xl font-black text-emerald-400">${formatINR(d.finalTotal)}</div>
                        <div class="text-[11px] text-blue-400 font-medium">Instant ₹750 UPI rebate applied</div>
                    </div>
                </div>

                <button onclick="launchRazorpayCheckout()" class="w-full py-3.5 px-4 btn-green text-sm font-bold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2">
                    <span>💳 Complete Purchase on Razorpay (${formatINR(d.finalTotal)})</span>
                </button>
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

    document.getElementById('rzp-modal-order-id').textContent = 'Order #' + state.currentCheckoutOrder.orderId;
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
                btn.className = 'py-2 text-xs font-bold bg-blue-600 text-white rounded-lg';
            }
            if (view) view.classList.remove('hidden');
        } else {
            if (btn) {
                btn.className = 'py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg';
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
    btn.innerHTML = `<span>⏳ Authorizing on Razorpay...</span>`;

    setTimeout(() => {
        const paymentId = 'pay_' + Math.random().toString(36).substring(2, 9);

        // Update state
        state.budgetVault.currentSpent += state.currentCheckoutOrder.amount;
        state.merchantMetrics.totalGmv += state.currentCheckoutOrder.amount;
        state.merchantMetrics.ordersCount += 1;

        // Add to Feed
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
    if (recovEl) recovEl.textContent = formatINR(state.merchantMetrics.recoveredRevenue);

    renderTransactionsTable();
}

function renderTransactionsTable() {
    const tbody = document.getElementById('tx-feed-tbody');
    if (!tbody) return;

    tbody.innerHTML = state.merchantMetrics.transactionFeed.map(tx => `
        <tr class="hover:bg-[#1a202c]/50 transition-colors">
            <td class="py-3 px-3 font-semibold text-white">${tx.product}</td>
            <td class="py-3 px-3 text-slate-400">${tx.buyerAgent}</td>
            <td class="py-3 px-3 text-slate-400 line-through">${formatINR(tx.originalPrice)}</td>
            <td class="py-3 px-3 font-bold text-emerald-400">${formatINR(tx.settledPrice)}</td>
            <td class="py-3 px-3 text-slate-300">${tx.method}</td>
            <td class="py-3 px-3"><span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[11px] border border-emerald-500/20">PAID</span></td>
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
            <div class="p-3 rounded-xl bg-[#0e121a] border border-[#242c3d] space-y-1.5">
                <div class="flex items-center justify-between">
                    <span class="font-bold text-white text-xs">🛍️ General Shopping Pass</span>
                    <span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">ACTIVE</span>
                </div>
                <div class="text-slate-400 text-[11px]">
                    Max Spend Cap: <strong class="text-white">${formatINR(state.budgetVault.dailyLimit)}</strong>
                </div>
                <p class="text-slate-500 text-[10px]">Protects against unauthorized or accidental spending.</p>
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
    alert('✅ Safety rules saved! Your AI will strictly follow these spending limits.');
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
            <div class="space-y-2">
                <div><span class="text-slate-400 block text-[11px]">Customer:</span> <strong class="text-white">${user.name}</strong></div>
                <div><span class="text-slate-400 block text-[11px]">Item Left Behind:</span> <strong class="text-white">${user.cartItem}</strong></div>
                <div><span class="text-slate-400 block text-[11px]">Cart Value:</span> <strong class="text-emerald-400">${formatINR(user.cartValue)}</strong></div>
                <div><span class="text-slate-400 block text-[11px]">Drop-off Stage:</span> <span class="text-amber-400">${user.dropOffStage}</span></div>
            </div>
        `;
    }

    if (chatBox) {
        chatBox.innerHTML = state.recoverySim.chatHistory.map(msg => {
            if (msg.sender === 'system') {
                return `
                    <div class="flex justify-center my-2">
                        <span class="text-[11px] bg-[#1c2230] text-slate-400 px-3 py-1 rounded-full border border-[#2d3748]">
                            ${msg.text}
                        </span>
                    </div>
                `;
            }

            const isAI = msg.sender === 'ai';
            return `
                <div class="flex ${isAI ? 'justify-start' : 'justify-end'} mb-3">
                    <div class="max-w-[85%] ${isAI ? 'bg-[#1a2130] text-slate-200 rounded-tl-none border border-[#2d3a52]' : 'bg-blue-600 text-white rounded-tr-none'} p-3.5 rounded-2xl shadow space-y-2">
                        <div class="flex items-center justify-between gap-4 text-[10px] ${isAI ? 'text-blue-400' : 'text-blue-100'} font-bold">
                            <span>${isAI ? '🤖 Store AI' : '👤 ' + user.name}</span>
                            <span class="text-slate-400">${msg.timestamp}</span>
                        </div>
                        <p class="text-xs leading-relaxed">${msg.text}</p>
                        ${msg.hasPaymentLink ? `
                            <div class="mt-2 p-3 bg-[#0c1018] rounded-xl border border-emerald-500/40 space-y-2">
                                <div class="flex items-center justify-between text-xs">
                                    <span class="font-bold text-white">Razorpay Discount Link</span>
                                    <span class="text-emerald-400 font-bold">${formatINR(msg.paymentLink.amount)}</span>
                                </div>
                                <div class="flex items-center justify-between text-[11px] text-slate-400">
                                    <span class="line-through">Regular: ${formatINR(msg.paymentLink.discountedFrom)}</span>
                                    <span class="text-amber-400 font-bold">Expires in ${msg.paymentLink.expiresIn}</span>
                                </div>
                                <button onclick="settleRecoveryPaymentLink('${msg.paymentLink.id}', ${msg.paymentLink.amount})" class="w-full py-2 btn-green text-xs font-bold shadow flex items-center justify-center gap-1.5">
                                    <span>⚡ Pay ${formatINR(msg.paymentLink.amount)} via Razorpay UPI</span>
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
            text: `Thanks for the reply, ${state.recoverySim.activeUser.name.split(' ')[0]}! We've also added the 1-year extended warranty for free. You can finish your order directly through the link above whenever you're ready!`,
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
        text: `✅ Payment of ${formatINR(amount)} confirmed on Razorpay. Order completed!`,
        timestamp: 'Just now'
    });

    renderAll();
    alert(`🎉 Success! Payment link settled for ${formatINR(amount)}. Cart recovered!`);
}
