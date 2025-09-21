import { expect, Locator, Page } from "@playwright/test";

export class ShopCartPage {
    readonly proceedToCheckOut: Locator;
    readonly itemTable: Locator;
    readonly itemRow: Locator;

    constructor(private page: Page) {
        this.proceedToCheckOut = page.getByRole('link', { name: 'Proceed to checkout' });
        this.itemTable = page.getByRole('table').filter({ hasText: 'Product' });
        this.itemRow = page.getByRole('row');
    }

    async proceedToCheckout() {
        if (await this.page.getByTitle('No').count() > 0) {
            this.page.getByTitle('No').click();
            console.log('Reject Cookie ')
        }
        await this.proceedToCheckOut.click();
        await this.page.waitForLoadState('load');
    }

    async clearShoppingCart() {
        await expect(this.page.getByText('Shopping cart Checkout Order')).toBeVisible();
        const removeButtons = await this.itemTable.getByRole('link', { name: 'Remove' }).all();
        const buttonCounts = removeButtons.length;

        for (let i = buttonCounts - 1; i >= 0; i--) {
            const remove = removeButtons[i];
            await remove.click();
            await this.page.waitForLoadState('domcontentloaded',{timeout: 10000})
        }
    }

    async verifyShoppingCart(items: string[]) {
        for (const item of items) {
            const locator = this.itemRow.filter({ hasText: item });
            await expect(locator).toBeVisible();
            console.log(`"${item}" is visible in the cart.`);
        }
    }

    async verifyCartIsEmpty() {
        await expect(this.page.getByRole('heading', { name: 'YOUR SHOPPING CART IS EMPTY' })).toBeVisible();
        console.log('YOUR SHOPPING CART IS EMPTY');
    }
}

