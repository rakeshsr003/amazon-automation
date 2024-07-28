import { BrowserContext, expect, Page } from '@playwright/test';
import * as ele from './utils/elements.json'


export async function login(page: Page, website: string) {

  try {

    var site = website.toLowerCase()
    let path = `./storageState-${site}.json`

    await page.goto(ele.url);
    await page.locator(ele.click_to_find_signin_button).click()
    await page.locator(ele.username_textfield).fill(ele.mobile_number)
    await page.locator(ele.continue_button).click()
    await page.locator(ele.password_textfield).waitFor()
    await page.locator(ele.password_textfield).fill(ele.password);
    await page.locator(ele.proceed_to_signin_button).click();

    await page.waitForSelector(ele.my_profile_name)

    await page.context().storageState({ path: path })

    return path

  } catch (error) {

    console.error(error)

  }

}


export async function searchItem(page, item: string, brand: string, itemSize: string) {

  try {

    await page.goto(ele.homepage_rakesh_amazon)
    await page.waitForSelector(ele.my_profile_name)

    if (await page.locator(ele.my_profile_name).isVisible(item)) {

      await page.locator(ele.search_textfield).fill(item)
      await page.locator(ele.search_button).click()
      await page.locator(ele.validate_search_result_shoes).isVisible()

      expect(ele.validate_search_result_shoes).toContain(item)

      await page.locator(ele.see_more).click()

      const brandNames = await page.locator(ele.brand_filter).innerText()

      const brandNamesArray = brandNames.split('\n')

      for (const names of brandNamesArray) {

        let brandValue = brand;

        if (names == brandValue) {

          await page.waitForTimeout(2000)
          await page.locator(ele.specific_brand.replace(/BRAND/g, brandValue)).click()

        }
      }


      const size = await page.locator(ele.size_filter).innerText()

      const sizeArray = size.split('\n')

      for (const sizes of sizeArray) {

        let requiredSize = itemSize;

        if (sizes == requiredSize) {

          await page.waitForTimeout(2000)
          await page.locator(ele.specific_size.replace(/INDEX/g, requiredSize)).click()
          await page.waitForTimeout(2000)

        }
      }

      expect(ele.filtered_item.replace(/BRAND/g, brand)).toContain(brand)
      await page.waitForTimeout(2000)



    }

  } catch (error) {

  }


}

export async function clickOnProduct(page) {
  try {

    await page.locator(ele.filtered_item_img).click()


  } catch (error) {

  }

}

export async function addToCart(page) {

  try {

    await page.locator(ele.add_to_cart_button).click()
    await page.waitForTimeout(3000)

  } catch (error) {

  }


}

export async function verifyItem(page, itemSize) {

  try {

    await page.locator(ele.validate_size).textContent()

    const requiredSize = `${itemSize - 3}`

    await page.selectOption('#native_dropdown_selected_size_name', { id: `native_size_name_${requiredSize}` })

    await page.waitForTimeout(3000)

  } catch (error) {

  }
}

