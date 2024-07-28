import { BrowserContext, expect, test } from '@playwright/test';
import { login } from '../helpers';


test.only('login', async ({ browser }) => {

    try {

        const context = await browser.newContext()
        const page =await context.newPage()

        await login(page, "Amazon")

    } catch (error) {

        console.error(error)
        console.log("error while login------", error);

    }

});






