import { expect, Page, Locator } from '@playwright/test';

export class Helpers {
    static async validateAttribute(locator: Locator, attribute: string, value: string | RegExp) {
        const attributeValue = await locator.getAttribute(attribute);
        await expect(attributeValue).toMatch(value);
    };

    static async checkLocatorExist(page: Page, locator: Locator, timeout: number = 5000): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'visible', timeout });
            return true;
        } catch (error) {
            return false;
        }
    };

    static async validatePageTitle(page: Page, expectedTitle: string) {
        await expect(page).toHaveTitle(expectedTitle);
    }
    
}