import { expect, Locator, Page } from "@playwright/test";

export class ShopPage {
    readonly page: Page;
    readonly gridviewSwitch: Locator;
    readonly listviewSwitch: Locator;


    constructor(page: Page) {
        this.page = page;
        this.gridviewSwitch = page.locator('.switch-grid');
        this.listviewSwitch = page.locator('.switch-list');
    }

    async switchView(view: 'Grid' | 'List') {
        if (view === 'Grid') {
            await this.gridviewSwitch.click();
            console.log('Switched to Grid view completed');
        } else {
            await this.listviewSwitch.click(); 
            console.log('Switched to List view completed');
        }
    }

    async verifyViewSwitched(view: 'Grid' | 'List') {
        if (view === 'Grid') {
            await expect(this.gridviewSwitch).toHaveClass(/.*active/, { timeout: 10000 });
        } else {
            await expect(this.listviewSwitch).toHaveClass(/.*active/, { timeout: 10000 });
        }
    }

    async addToCart(items: string[]) {
        await this.page.waitForLoadState('load');
        for (const item of items) {
            await this.page.getByRole('link', { name: 'Add “' + item + '” to your cart' }).nth(1).click();
            await this.page.waitForTimeout(1000); 
            console.log('Add ' + item + ' to Cart')
        }
    }
}
