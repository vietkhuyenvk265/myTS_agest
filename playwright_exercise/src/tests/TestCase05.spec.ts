import { test, expect } from '@playwright/test';
import { BillingInfo } from '../pages-objects/CheckOut.page';
import { config } from '../config';
import { createPages } from '../utils/pageFactory';

test('Verify orders appear in order history', async ({ page }) => {

    const {
        homePage,
        loginPage,
        shopPage,
        shopCartPage,
        checkOutPage,
        orderStatusPage,
        myAccountPage
    } = createPages(page);

    const multiProductInfo = [['AirPods'], ['Bose SoundLink Mini']]

    const billInfo: BillingInfo = {
        firstname: 'Khuyen',
        lastname: 'Le',
        country: 'Vietnam',
        address: '111 Pham Van Dong',
        city: 'Ho Chi Minh',
        email: 'khuyen.le@email.com',
        phone: '0359389266',
    }
    //Pre-condition: User has placed 02 orders
    await homePage.navigate();
    await loginPage.login(config.username, config.password);
    for (let item of multiProductInfo) {
        await homePage.navigateMenu('Shop');
        await shopPage.addToCart(item);
        await homePage.openCart();
        await shopCartPage.proceedToCheckout();
        await checkOutPage.fillBillingDetails(billInfo, 'Direct bank transfer');
        //await orderStatusPage.verifyOrderSuccess();
    }
    
    // 1. Go to My Account page
    await page.goto('/my-account/');

    // 2. Click on Orders in left navigation
    myAccountPage.navigateToRecentOrder();

    // 3. Verify order details
    myAccountPage.verifyProcessingOrder(2)

});
