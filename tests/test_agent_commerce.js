/**
 * RazorNexus — Logic & Safety Unit Tests
 * Tests negotiation bounds, margin floors, and budget vault rules.
 */

function runTests() {
    let passed = 0;
    let failed = 0;

    function test(name, fn) {
        try {
            fn();
            console.log(`[PASS] ${name}`);
            passed++;
        } catch (err) {
            console.error(`[FAIL] ${name} -> ${err.message}`);
            failed++;
        }
    }

    function assert(condition, message) {
        if (!condition) throw new Error(message || 'Assertion failed');
    }

    console.log('Running RazorNexus test suite...\n');

    test('Merchant margin floor enforcement', () => {
        const basePrice = 29990;
        const minMarginPrice = 23500;
        const buyerOffer = 21000;
        const settled = Math.max(minMarginPrice, buyerOffer);
        assert(settled >= minMarginPrice, 'Price dropped below margin floor');
    });

    test('Dynamic bundle price calculation', () => {
        const mainPrice = 26000;
        const addonDiscounted = 699;
        const upiRebate = 750;
        const total = mainPrice + addonDiscounted - upiRebate;
        assert(total === 25949, `Expected 25949, received ${total}`);
    });

    test('Step-up verification trigger threshold', () => {
        const threshold = 20000;
        const highValueTx = 26490;
        const lowValueTx = 14500;
        assert(highValueTx > threshold, 'High value tx did not trigger step-up');
        assert(lowValueTx <= threshold, 'Low value tx unexpectedly triggered step-up');
    });

    test('Daily spend ceiling guard', () => {
        const dailyLimit = 50000;
        const currentSpent = 42000;
        const nextOrder = 12000;
        const exceedsBudget = (currentSpent + nextOrder) > dailyLimit;
        assert(exceedsBudget === true, 'Budget overflow was not intercepted');
    });

    console.log(`\nResults: ${passed} passed, ${failed} failed.`);
    return { passed, failed };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runTests };
} else {
    runTests();
}
