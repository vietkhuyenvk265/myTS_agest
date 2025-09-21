import { test, expect } from '@playwright/test';
import { BillingInfo } from '../pages-objects/CheckOut.page';
import { config } from '../config';
import { createPages } from '../utils/pageFactory';

test('Verify users can buy multiple item successfully', async ({ page }) => {

    const {
        homePage,
        loginPage,
        shopPage,
        shopCartPage,
        checkOutPage,
        orderStatusPage
    } = createPages(page);

    const multiProductInfo = ['AirPods', 'Bose SoundLink Mini']

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
    await homePage.navigateMenu('Shop');

    // 4. Select multiple items and add to cart
    await shopPage.addToCart(multiProductInfo);

    // 5. Go to the cart and verify all selected items
    await homePage.openCart();
    await shopCartPage.verifyShoppingCart(multiProductInfo);

    // 6. Proceed to checkout and confirm order
    await shopCartPage.proceedToCheckout();

    // 7. Verify order confirmation message
    await checkOutPage.fillBillingDetails(billInfo, 'Direct bank transfer');
    await orderStatusPage.verifyOrderSuccess();
});
