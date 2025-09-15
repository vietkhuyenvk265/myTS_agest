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
        } else {
            await this.listviewSwitch.click();
        }
    }

    async addToCart(item: string) {
        let regex: RegExp = new RegExp('Add.*' + item);
        await this.page.getByRole('link', { name: regex }).nth(1).click();
    }
}
