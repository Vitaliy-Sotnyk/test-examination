import { test, expect } from '@playwright/test';
import MainPage from '../pages/main.page';
import pageData from './data/mainPageData.json'

test.describe('Playwright: main page of OLX', () => {
    test('opened page has the right title', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.navigate();
        expect(await mainPage.getTitle()).toEqual(pageData.pageTitle); 
        expect(await page.textContent(mainPage.title)).toEqual(pageData.title);
    });
    
});
