import { expect, Locator, Page } from "@playwright/test";

export class LogIn {
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly signupButton: Locator;

    constructor(private page: Page) {
        this.username = page.getByRole('textbox', { name: 'Username or email address *' });
        this.password = page.getByRole('textbox', { name: 'Password *' });
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.signupButton = page.getByRole('link', { name: 'Log in / Sign up' });
    }

    async login(username: string, password: string) {
            await this.page.goto('/my-account/');
            await this.signupButton.click();
            await this.username.fill(username);
            await this.password.fill(password);
            await this.loginButton.click();
            console.log('Login completed');
    }
}