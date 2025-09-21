import { test, expect } from '@playwright/test';
import { BillingInfo } from '../pages-objects/CheckOut.page';
import { config } from '../config';
import { createPages } from '../utils/pageFactory';

test('Verify users can sort items by price', async ({ page }) => {

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
    await homePage.navigateMenu('Shop');

    // 4.  Switch view to list
    await shopPage.switchView('List');

    // 5. Sort items by price(low to high / high to low)
    // 6. Verify the order of items






});
