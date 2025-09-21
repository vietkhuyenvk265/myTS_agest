import { test, expect } from '@playwright/test';
import { BillingInfo } from '../pages-objects/CheckOut.page';
import { createPages } from '../utils/pageFactory';
import { config } from '../config';

test('Verify users try to buy an item without logging in_As a guest)', async ({ page }) => {

    const {
        homePage,
        loginPage,
        shopPage,
        shopCartPage,
        checkOutPage,
        orderStatusPage,
    } = createPages(page);

    const multiProductInfo = ['AirPods', 'Bose SoundLink Mini']

    // 1. Open browser and go to https://demo.testarchitect.com/
    await homePage.navigate();

    // 2. Login with valid credentials
    await loginPage.login(config.username, config.password);

    //Precondition: User added the items into cart
    await homePage.navigateMenu('Shop');
    await shopPage.addToCart(multiProductInfo);

    // 3. Go to Shopping cart page
    // 4. Verify items show in table
    await homePage.openCart();
    await shopCartPage.verifyShoppingCart(multiProductInfo);

    // 5. Click on Clear shopping cart
    await shopCartPage.clearShoppingCart();

    // 6. Verify empty cart page displays
    await shopCartPage.verifyCartIsEmpty();

});
