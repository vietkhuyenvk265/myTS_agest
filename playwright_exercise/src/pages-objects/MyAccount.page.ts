import { expect, Locator, Page } from "@playwright/test";

export class MyAccountPage {
    readonly page: Page;
    readonly recentOrder: Locator;


    constructor(page: Page) {
        this.page = page;
        this.recentOrder = page.getByRole('link', { name: /\d\s\Recent Order/});
    }

    async navigateToRecentOrder() {
        this.recentOrder.click();
    }

    async verifyProcessingOrder(value: number) {
        const count = await this.page.getByRole('cell', { name: 'Processing' }).count();
        expect(count).toBe(value);
    }

   
    

}