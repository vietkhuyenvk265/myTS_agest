import { expect, Locator, Page } from "@playwright/test";
import { BillingInfo } from "../pages-objects/CheckOut.page"

export class OrderStatusPage {
    readonly successfullMessage: Locator;

    constructor(private page: Page) {
        this.successfullMessage = page.getByText('Thank you. Your order has been received.');
    };

    async verifyOrderSuccess() {
        await expect(this.successfullMessage).toBeVisible({ timeout: 20000 });
    }
}