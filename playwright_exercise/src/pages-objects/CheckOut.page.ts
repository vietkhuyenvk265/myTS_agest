import { expect, Locator, Page } from "@playwright/test";

export interface BillingInfo {
    firstname?: string;
    lastname?: string;
    country?: string;
    address?: string;
    city?: string;
    phone?: string;
    email?: string;
    item: string;
    zipcode?: string;
    company?: string;
    apartment?: string;
    notes?: string;
    paymentMethod?: 'Direct bank transfer' | 'Check payments' | 'Cash on delivery';
};

export interface MandatoryFields {
    firstname?: 'check';
    lastname?: 'check';
    country?: 'check';
    address?: 'check';
    city?: 'check';
    phone?: 'check';
    email?: 'check';
}

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
        await this.firstName.fill('');
        await this.lastName.fill('');
        await this.streetAddress.fill('');
        await this.city.fill('');
        await this.phone.fill('');
        await this.email.fill('');
        await this.company.fill('');
        await this.apartment.fill('');
        await this.notes.fill('');

        if (billinginfo.firstname) {
            await this.firstName.fill(billinginfo.firstname);
        };

        if (billinginfo.lastname) {
            await this.lastName.fill(billinginfo.lastname);
        };

        if (billinginfo.country) {
            await this.country.click();
            await this.page.getByRole('option', { name: billinginfo.country }).click();
        };

        if (billinginfo.address) {
            await this.streetAddress.fill(billinginfo.address);
        };

        if (billinginfo.city) {
            await this.city.fill(billinginfo.city);
        };

        if (billinginfo.phone) {
            await this.phone.fill(billinginfo.phone);
        };

        if (billinginfo.email) {
            await this.email.fill(billinginfo.email);
        };

        if (billinginfo.zipcode) {
            await this.zipCode.fill(billinginfo.zipcode);
        };

        if (billinginfo.company) {
            await this.company.fill(billinginfo.company);
        };

        if (billinginfo.apartment) {
            await this.apartment.fill(billinginfo.apartment);
        };

        if (billinginfo.notes) {
            await this.notes.fill(billinginfo.notes);
        };

        await this.page.getByRole('radio', { name: billinginfo.paymentMethod }).setChecked(true);

        await this.placeOrder.click();
    };

}
