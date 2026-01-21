import test, { expect } from "@playwright/test";
import { BuyPage } from "../pages/buy.page";
import { galaxyS7, sonyVaioI5 } from "../data/product.data";
import { cartModule, homeModule } from "../data/module.data";
import { billData } from "../data/bill.data";

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
                buyPage.addToCart(galaxyS7)
            ]);
            await expect(responseProduct1.status(), `El producto ${galaxyS7.name} NO se agrego al carrito`).toBe(200);
            await buyPage.goToModule(homeModule.name);

            const [responseProduct2] = await Promise.all([
                page.waitForResponse(r => r.url().includes('addtocart') && r.status() === 200),
                buyPage.addToCart(sonyVaioI5)
            ]);
            await expect(responseProduct2.status(), `El producto ${sonyVaioI5.name} -NO se agrego al carrito`).toBe(200);
        })

        await test.step('Visualizar el carrito', async () => {
            await buyPage.goToModule(cartModule.name);
            await expect(page.getByRole('heading', { name: 'Products' }), 'NO es la sección de carrito').toBeVisible();
            await expect(page.getByRole('cell', { name: galaxyS7.name }), 'Samsung galaxy s7 NO está visible').toBeVisible();
            await expect(page.getByRole('cell', { name: sonyVaioI5.name }), 'Sony vaio i5 NO está visible').toBeVisible();
        })

        await test.step('Completar el formulario', async () => {
            await buyPage.fillPurchaseForm(billData);
            await expect(page.getByRole('textbox', { name: 'Name:' }), 'No se completó el campo Name').toHaveValue(billData.name);
            await expect(page.getByRole('textbox', { name: 'Country:' }), 'No se completó el campo Country').toHaveValue(billData.country);
            await expect(page.getByRole('textbox', { name: 'City:' }), 'No se completó el campo City').toHaveValue(billData.city);
            await expect(page.getByRole('textbox', { name: 'Credit card:' }), 'No se completó el campo Credit card').toHaveValue(billData.creditCard);
            await expect(page.getByRole('textbox', { name: 'Month:' }), 'No se completó el campo Month').toHaveValue(billData.month);
            await expect(page.getByRole('textbox', { name: 'Year:' }), 'No se completó el campo Year').toHaveValue(billData.year);
        })
        
        await test.step('Finalizar la compra', async () => {
            await page.getByRole('button', { name: 'Purchase' }).click();
            await expect(page.getByRole('heading', { name: 'Thank you for your purchase!' }), 'No se realizó la compra').toBeVisible(); 
        })
    })
})
