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
        await this.page.goto('/');
        await this.closeButton.click();
        await expect(this.page).toHaveTitle('TestArchitect Sample Website – Just using for training purpose only')
        console.log('Page loaded successfully')
    }

    async selectItemInMainMenu(item: string) {
        await this.page.waitForLoadState('load');
        await this.categoryMainMenu.click();
        await this.page.getByRole('listitem').filter({ hasText: item }).click();
        console.log('Open ' + item + ' in main menu')
    }

    async openCart() {
        await this.cart.click();
        await this.cart.click();
        console.log('Open Cart')
    }

    async navigateMenu(item: string) {
        await this.page.locator('#menu-main-menu-1').getByRole('link', { name: item}).waitFor({state: 'attached'});
        await this.page.locator('#menu-main-menu-1').getByRole('link', { name: item}).click();
        console.log('Navigate to ' + item);
    }

}