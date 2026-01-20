export class BuyPage {
    private page;

    constructor(page) {
        this.page = page;
    }

    async addToCart(productName: string) {
        await this.page.getByRole('link', { name: productName }).click();
        await this.page.getByRole('link', { name: 'Add to cart' }).click();
    }

    async goToModule(moduleName) {
        await this.page.getByRole('link', { name: moduleName, exact: true }).click();
    }
}