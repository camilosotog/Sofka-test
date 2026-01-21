import { Bill } from "../interfaces/bill.interface";
import { Product } from "../interfaces/product.interface";

export class BuyPage {
    private page;

    constructor(page) {
        this.page = page;
    }

    async addToCart(product: Product) {
        await this.page.getByRole('link', { name: product.name }).click();
        await this.page.getByRole('link', { name: 'Add to cart' }).click();
    }

    async goToModule(moduleName) {
        await this.page.getByRole('link', { name: moduleName, exact: true }).click();
    }

    async fillPurchaseForm(bill: Bill) {
        await this.page.getByRole('button', { name: 'Place Order' }).click();
        await this.page.locator('#name').fill(bill.name);
        await this.page.locator('#country').fill(bill.country);
        await this.page.locator('#city').fill(bill.city);
        await this.page.locator('#card').fill(bill.creditCard);
        await this.page.locator('#month').fill(bill.month);
        await this.page.locator('#year').fill(bill.year);
    }
}