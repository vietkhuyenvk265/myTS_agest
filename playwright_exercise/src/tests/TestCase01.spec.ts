import { test, expect } from '@playwright/test';
import { BillingInfo } from '../pages-objects/CheckOut.page';
import { Helpers } from '../helpers/Helpers.func';
import { config } from '../config';
import { createPages } from '../utils/pageFactory';

test('Verify purchase an item processing successfully', async ({ page }) => {
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
        paymentMethod: 'Direct bank transfer',
    }

    const items = ['DJI Mavic Pro Camera Drone']

    //Step 1: Open browser and go to https://demo.testarchitect.com/
    await homePage.navigate();

    //Step 2: Login with valid credentials
    await loginPage.login(config.username, config.password);

    //Step 3: Navigate to All departments section
    //Step 4: Select Electronic Components & Supplies
    await homePage.selectItemInMainMenu('Electronic Components & Supplies');

    //Step 5: Verify the items should be displayed as a grid
    await Helpers.validateAttribute(shopPage.gridviewSwitch, 'class', /.*active/);

    //Step 6: Switch view to list
    await shopPage.switchView('List');

    //Step 7: Verify the items should be displayed as a list
    await Helpers.validateAttribute(shopPage.listviewSwitch, 'class', /.*active/);

    //Step 8: Select any item randomly to purchase
    //Step 9: Click 'Add to Cart'
    await shopPage.addToCart(items);

    //Step 10: Go to the cart
    await homePage.openCart();

    //Step 11: Verify item details in mini content
    await shopCartPage.verifyShoppingCart(items);

    //Step 12: Click on Checkout
    await shopCartPage.proceedToCheckout();

    //Step 13: Verify Checkout page displays
    await Helpers.validatePageTitle(page,'Checkout – TestArchitect Sample Website');

    //Step 14: Fill the billing details with default payment method
    //Step 15: Click on PLACE ORDER
    await checkOutPage.fillBillingDetails(billInfo);

    //Step 16: Verify Order status page displays
    //Step 17: Verify the Order details with billing and item information
    await orderStatusPage.verifyOrderSuccess();

});
