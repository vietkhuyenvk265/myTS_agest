import { test, expect } from '@playwright/test';
import { HomePage } from '../pages-objects/Home.page';
import { LogIn } from '../pages-objects/Login.page';
import { ShopPage } from '../pages-objects/Shop.page';
import { ShopCartPage } from '../pages-objects/ShopCart.page';
import { BillingInfo } from '../pages-objects/CheckOut.page';
import { CheckOutPage } from '../pages-objects/CheckOut.page';
import { OrderStatusPage } from '../pages-objects/OrderStatus.page';

test('Verify purchase an item processing successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LogIn(page);
    const shopPage = new ShopPage(page);
    const shopCartPage = new ShopCartPage(page);
    const checkOutPage = new CheckOutPage(page);
    const orderStatusPage = new OrderStatusPage(page);

    let billInfo: BillingInfo = {
        firstname: 'Khuyen',
        lastname: 'Le',
        country: 'Vietnam',
        address: '111 Pham Van Dong',
        city: 'Ho Chi Minh',
        email: 'khuyen.le@email.com',
        phone: '0359389266',
        item: 'DJI Mavic Pro Camera Drone',
        paymentMethod: 'Direct bank transfer',
    }

    //Step 1: Open browser and go to https://demo.testarchitect.com/
    await homePage.navigate();

    //Step 2: Login with valid credentials
    await loginPage.login('khuyen.le','P@ssw0rd123!');

    //Step 3: Navigate to All departments section
    //Step 4: Select Electronic Components & Supplies
    await homePage.selectItemInMainMenu('Electronic Components & Supplies');

    //Step 5: Verify the items should be displayed as a grid
    await expect(shopPage.gridviewSwitch).toHaveAttribute('class', /.*active/);

    //Step 6: Switch view to list
    await shopPage.switchView('List');

    //Step 7: Verify the items should be displayed as a list
    await expect(shopPage.listviewSwitch).toHaveAttribute('class', /.*active/);

    //Step 8: Select any item randomly to purchase
    //Step 9: Click 'Add to Cart'
    await shopPage.addToCart(billInfo.item);

    //Step 10: Go to the cart
    await homePage.openCart();

    //Step 11: Verify item details in mini content
    await shopCartPage.verifyShoppingCart(billInfo.item);

    //Step 12: Click on Checkout
    await shopCartPage.proceedToCheckout();

    //Step 13: Verify Checkout page displays
    await expect(page).toHaveTitle('Checkout – TestArchitect Sample Website');

    //Step 14: Fill the billing details with default payment method
    //Step 15: Click on PLACE ORDER
    await checkOutPage.fillBillingDetails(billInfo);

    //Step 16: Verify Order status page displays
    //Step 17: Verify the Order details with billing and item information
    await orderStatusPage.verifyOrderSuccess(billInfo);

});
