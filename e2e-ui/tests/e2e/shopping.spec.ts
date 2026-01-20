import test, { expect } from "@playwright/test";
import { before } from "node:test";
import { LoginPage } from "../pages/login.page";
import { testUser } from "../data/user.data";
import { BuyPage } from "../pages/buy.page";
import { galaxyS7, sonyVaioI5 } from "../data/product.data";
import { cartModule, homeModule } from "../data/module.data";

test.describe('Validación de funciones de compra en demoblaze', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.login(testUser.username, testUser.password);
    });
    test('Agregar dos prodcutos al carrito', async ({ page }) => {
        const buyPage = new BuyPage(page);
        await buyPage.addToCart(galaxyS7.name);
        await buyPage.goToModule(homeModule.name);
        await buyPage.addToCart(sonyVaioI5.name);
        await buyPage.goToModule(cartModule.name);
        await expect(page.getByRole('cell', { name: galaxyS7.name }), 'Samsung galaxy s7 NO está visible').toBeVisible();
        await expect(page.getByRole('cell', { name: sonyVaioI5.name }), 'Sony vaio i5 NO está visible').toBeVisible();
    })
    
})
