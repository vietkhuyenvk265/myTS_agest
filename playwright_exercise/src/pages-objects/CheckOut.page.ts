import { expect, Locator, Page } from "@playwright/test";

export interface BillingInfo {
    firstname?: string;
    lastname?: string;
    country?: string;
    address?: string;
    city?: string;
    phone?: string;
    email?: string;
    zipcode?: string;
    company?: string;
    apartment?: string;
    notes?: string;
    paymentMethod?: 'Direct bank transfer' | 'Check payments' | 'Cash on delivery';
};

export class CheckOutPage {
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly country: Locator;
    readonly streetAddress: Locator;
    readonly city: Locator;
    readonly email: Locator;
    readonly phone: Locator;
    readonly placeOrder: Locator;
    readonly directBankTransfer: Locator;
    readonly checkPayment: Locator;
    readonly cashOnDelivery: Locator;
    readonly zipCode: Locator;
    readonly company: Locator;
    readonly apartment: Locator;
    readonly notes: Locator;

    constructor(private page: Page) {
        this.firstName = page.getByRole('textbox', { name: 'First name *' });
        this.lastName = page.getByRole('textbox', { name: 'Last name *' });
        this.country = page.getByRole('combobox', { name: 'Country / Region' });
        this.streetAddress = page.getByRole('textbox', { name: 'Street address *' });
        this.city = page.getByRole('textbox', { name: 'Town / City *' });
        this.email = page.getByRole('textbox', { name: 'Email address *' });
        this.phone = page.getByRole('textbox', { name: 'Phone *' });
        this.placeOrder = page.getByRole('button', { name: 'Place order' });
        this.directBankTransfer = page.getByRole('radio', { name: 'Direct bank transfer' });
        this.checkPayment = page.getByRole('radio', { name: 'Check payments' });
        this.cashOnDelivery = page.getByRole('radio', { name: 'Cash on delivery' });
        this.zipCode = page.getByRole('textbox', { name: 'ZIP Code *' });
        this.company = page.getByRole('textbox', { name: 'Company name (optional)' });
        this.apartment = page.getByRole('textbox', { name: 'Apartment, suite, unit, etc' });
        this.notes = page.getByRole('textbox', { name: 'Order notes (optional)' });
    };

    async fillBillingDetails(billinginfo: BillingInfo) {
        const fieldLocators: { [key in keyof BillingInfo]: Locator | null } = {
            firstname: this.firstName,
            lastname: this.lastName,
            country: this.country,
            address: this.streetAddress,
            city: this.city,
            phone: this.phone,
            email: this.email,
            zipcode: this.zipCode,
            company: this.company,
            apartment: this.apartment,
            notes: this.notes,
            paymentMethod: null,
        };

        for (const field in billinginfo) {
            const value = billinginfo[field as keyof BillingInfo];
            if (value) {
                if (field === "country") {
                    await this.country.click();
                    await this.page.getByRole('option', { name: billinginfo.country }).click();
                } else if (field === "paymentMethod") {
                    await this.page.getByRole('radio', { name: billinginfo.paymentMethod }).setChecked(true);
                } else {
                    const locator = fieldLocators[field as keyof BillingInfo];
                    if (locator) {
                        await locator.fill(value);
                    }
                };
            }
        }

        await this.placeOrder.click();
        console.log('Place Done');
    };
}
