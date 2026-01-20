export class LoginPage {
    private page;

    constructor(page) {
        this.page = page;
    }

    async login(username: string, password: string) {
        await this.page.getByRole('link', { name: 'Log in' }).click();
        await this.page.locator('#loginusername').fill(username);
        await this.page.locator('#loginpassword').fill(password);
        await this.page.getByRole('button', { name: 'Log in' }).click();
    }
}