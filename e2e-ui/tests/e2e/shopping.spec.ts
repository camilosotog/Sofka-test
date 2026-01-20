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
        // const loginPage = new LoginPage(page);
        // await loginPage.login(testUser.username, testUser.password);
    });
    test('Flujo de compra', async ({ page }) => {
        const buyPage = new BuyPage(page);
        await test.step('Agregar dos prodcutos al carrito', async () => {
            const [responseProduct1] = await Promise.all([
                page.waitForResponse(r => r.url().includes('addtocart') && r.status() === 200),
                buyPage.addToCart(galaxyS7.name)
            ]);
            await expect(responseProduct1.status(), `El producto ${galaxyS7.name} NO se agrego al carrito`).toBe(200);
            await buyPage.goToModule(homeModule.name);

            const [responseProduct2] = await Promise.all([
                page.waitForResponse(r => r.url().includes('addtocart') && r.status() === 200),
                buyPage.addToCart(sonyVaioI5.name)
            ]);
            await expect(responseProduct2.status(), `El producto ${sonyVaioI5.name} -NO se agrego al carrito`).toBe(200);
        })
        await test.step('Visualizar el carrito', async () => {
            await buyPage.goToModule(cartModule.name);
            await expect(page.getByRole('heading', { name: 'Products' }), 'NO es la sección de carrito').toBeVisible();
            await expect(page.getByRole('cell', { name: galaxyS7.name }), 'Samsung galaxy s7 NO está visible').toBeVisible();
            await expect(page.getByRole('cell', { name: sonyVaioI5.name }), 'Sony vaio i5 NO está visible').toBeVisible();
        })
    })

})
