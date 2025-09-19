import { expect, Locator, Page } from "@playwright/test";

export class ShopPage {
    readonly gridviewSwitch: Locator;
    readonly listviewSwitch: Locator;


    constructor(private page: Page) {
        this.gridviewSwitch = page.locator('.switch-grid');
        this.listviewSwitch = page.locator('.switch-list');
    }

    async switchView(view: 'Grid' | 'List') {
        if (view === 'Grid') {
            await this.gridviewSwitch.click();
            await this.page.waitForURL(/view_mode=grid/);
        } else {
            await this.listviewSwitch.click();
            await this.page.waitForURL(/view_mode=list/);
        }
    }

    async addToCart(items: string[]) {
        for (const item of items) {
            await this.page.getByRole('link', { name: 'Add “' + item + '” to your cart' }).nth(1).click();
            await this.page.waitForTimeout(500); 
            console.log('Add ' + item + ' to Cart')
        }
    }
}
