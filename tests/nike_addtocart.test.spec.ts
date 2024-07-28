import { BrowserContext, expect, test } from '@playwright/test';
import { addToCart, clickOnProduct, searchItem, verifyItem } from '../helpers';

test('add item to cart', async ({ browser }) => {

    try {

        const context = await browser.newContext()
        const page =await context.newPage()

        await searchItem(page, "Shoes" , "Nike" , "12")

        const [newPage] = await Promise.all([

            context.waitForEvent("page"),
            await clickOnProduct(page)

        ])

        await verifyItem(newPage, "12")

        await addToCart(newPage)


    } catch (error) {

        console.log("error while adding item to cart---------", error);

    }


});



