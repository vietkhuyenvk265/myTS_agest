import { test, expect } from '@playwright/test';
import { BillingInfo } from '../pages-objects/CheckOut.page';
import { createPages } from '../utils/pageFactory';

test('Ensure proper error handling when mandatory fields are blank)', async ({ page }) => {

    const {
        homePage,
        shopPage,
        shopCartPage,
        checkOutPage,
    } = createPages(page);

    const billInfo: BillingInfo = {
        firstname: 'Khuyen',
        lastname: 'Le',
        country: 'Vietnam',
        address: '',
        city: 'Ho Chi Minh',
        email: 'khuyen.le@email.com',
        phone: '0359389266',
    }
    //Precondition: User is checkout
    await homePage.navigate();
    await homePage.navigateMenu('Shop');
    await shopPage.addToCart(['AirPods']);
    await homePage.openCart();
    await shopCartPage.proceedToCheckout();

    // 1. Leave mandatory fields(address, payment info) blank
    // 2. Click 'Confirm Order'
    await checkOutPage.fillBillingDetails(billInfo, 'Direct bank transfer');

    // 3. Verify error messages
    await checkOutPage.verifyErrorMessage('Billing Street address is a required field.')
});
