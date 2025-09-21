import { test, expect } from '@playwright/test';
import { BillingInfo } from '../pages-objects/CheckOut.page';
import { createPages } from '../utils/pageFactory';

test('Verify users try to buy an item without logging in_As a guest)', async ({ page }) => {

    const {
        homePage,
        loginPage,
        shopPage,
        shopCartPage,
        checkOutPage,
        orderStatusPage,
    } = createPages(page);

    const billInfo: BillingInfo = {
        firstname: 'Khuyen',
        lastname: 'Le',
        country: 'Vietnam',
        address: '111 Pham Van Dong',
        city: 'Ho Chi Minh',
        email: 'khuyen.le@email.com',
        phone: '0359389266',
    }

    // 1. Open https://demo.testarchitect.com/
    await homePage.navigate();

    // 2. Navigate to 'Shop' or 'Products' section
    await homePage.navigateMenu('Shop');

    // 3. Add a product to cart
    await shopPage.addToCart(['AirPods']);

    // 4. Click on Cart button
    await homePage.openCart();

    // 5. Proceed to complete order
    await shopCartPage.proceedToCheckout();
    await checkOutPage.fillBillingDetails(billInfo, 'Direct bank transfer');
    await orderStatusPage.verifyOrderSuccess();
});
