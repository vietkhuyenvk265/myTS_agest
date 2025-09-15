import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly closeButton: Locator;
    readonly signupButton: Locator;
    readonly categoryMainMenu: Locator;
    readonly cart: Locator;
    readonly checkoutButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.closeButton = page.getByRole("button", { name: "Close" });
        this.signupButton = page.getByRole('link', { name: 'Log in / Sign up' });
        this.categoryMainMenu = page.getByText("All departments");
        this.cart = page.getByRole('link', { name: /\d\s\$/ });
        this.checkoutButton = page.getByRole('link', { name: 'Checkout' });
    }

    async navigate() {
        const baseUrl = 'https://demo.testarchitect.com/';
        await this.page.goto(baseUrl);
        await this.closeButton.click();
        await expect(this.page).toHaveTitle('TestArchitect Sample Website – Just using for training purpose only')
    }

    async selectItemInMainMenu(item: string) {
        const items = item.split('/');
        const counts = items.length;

        await this.categoryMainMenu.click();
        await this.categoryMainMenu.waitFor();
        await this.categoryMainMenu.click();

        for (let i = 0; i < counts; i++) {
            let regex: RegExp = new RegExp(items[i]);
            await this.page.getByRole('listitem').filter({ hasText: items[i] }).click();
        }
    }

    async openCart() {
        await this.cart.click();
        await this.cart.click();
    }

}