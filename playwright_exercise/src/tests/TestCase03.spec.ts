import { test, expect } from '@playwright/test';
import { BillingInfo } from '../pages-objects/CheckOut.page';
import { config } from '../config';
import { createPages } from '../utils/pageFactory';

test('Verify users can buy an item using different payment methods_all payment methods', async ({ page }) => {

    const {
        homePage,
        loginPage,
        shopPage,
        shopCartPage,
        checkOutPage,
        orderStatusPage
    } = createPages(page);

    const ProductInfo = ['AirPods']
    const PaymentMethod = ['Check payments', 'Cash on delivery', 'Direct bank transfer']

    const billInfo: BillingInfo = {
        firstname: 'Khuyen',
        lastname: 'Le',
        country: 'Vietnam',
        address: '111 Pham Van Dong',
        city: 'Ho Chi Minh',
        email: 'khuyen.le@email.com',
        phone: '0359389266',
    }

    // 1. Open browser and go to https://demo.testarchitect.com/
    await homePage.navigate();

    // 2. Login with valid credentials 
    await loginPage.login(config.username, config.password);

    // 3. Go to Shop page
    for (const payitem of PaymentMethod) {
        await homePage.navigateMenu('Shop');

        // 4. Select an item and add to cart
        await shopPage.addToCart(ProductInfo);

        // 5. Go to Checkout page
        await homePage.openCart();
        await shopCartPage.proceedToCheckout();

        // 6. Choose a different payment method (Direct bank transfer, Cash on delivery)
        // 7. Complete the payment process
        // 8. Verify order confirmation message
        await checkOutPage.fillBillingDetails(billInfo, payitem);
        await orderStatusPage.verifyOrderSuccess();

    };


});
