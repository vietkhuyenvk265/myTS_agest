import { expect, Page, Locator } from '@playwright/test';

export class Helpers {
    static async validateClassAttribute(locator: Locator, value: string | RegExp) {
        await expect(locator).toHaveClass(value, { timeout: 10000 });
    }

    static async checkLocatorExist(page: Page, locator: Locator, timeout: number = 5000): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'visible', timeout });
            return true;
        } catch (error) {
            return false;
        }
    };

    static async validatePageTitle(page: Page, expectedTitle: string) {
        await page.waitForLoadState('load');
        const actualTitle = await page.title();
        console.log('Current page title: ' + actualTitle);
        await expect(page).toHaveTitle(expectedTitle);
    }
    
}