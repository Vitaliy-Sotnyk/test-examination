import { test, expect } from '@playwright/test';
import MainPage from '../mainPage/pages/main.page';
import { getApiRequestWithApi, validateElement } from '../utils/genericsUtils';
import BasePage from '../basePage';
import { everyItemsIncludes } from '../utils/dataFunctions';

interface ApiResponse {
    data: {
      title: string;
    }[];
  }
  
test.describe('Playwright: search functionality of OLX', () => {
    const searchString: string = 'iPhone';
    const getOffersPath = 'api/v1/offers/?offset&query='

    test('search item in the system: api', async ({request, page}) => { 
        const url = new BasePage(page);
        const response = await getApiRequestWithApi<ApiResponse>( request, `${url.pageUrl}${getOffersPath}${searchString}`);
        const listOfTitles = response.data.map(item =>item.title);
        expect(everyItemsIncludes(listOfTitles, searchString)).toBeTruthy();
    });

    test('search item in the system: ui', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.navigate();
        await validateElement(page, '[data-testid="search-input"]', element => element.fill(searchString));
        await validateElement(page, '[data-testid="search-submit"]', element => element.click());
        const listOfTitles = await validateElement(page, '[data-testid="l-card"] h6', element => element.innerText());
        expect(everyItemsIncludes(listOfTitles, searchString)).toBeTruthy();
    });

    test('search item in the system: api and ui', async ({ request, page }) => {
        const url = new BasePage(page);
        const mainPage = new MainPage(page);
        
        const response = await getApiRequestWithApi<ApiResponse>( request, `${url.pageUrl}${getOffersPath}${searchString}`);
        await mainPage.navigate();
        await validateElement(page, '[data-testid="search-input"]', element => element.fill(searchString));
        await validateElement(page, '[data-testid="search-submit"]', element => element.click());
        
        const listOfTitlesApi = response.data.map(item =>item.title);
        const listOfTitlesUi = await validateElement(page, '[data-testid="l-card"] h6', element => element.innerText());
        for(let index = 0; index < 2; index++){
            expect(listOfTitlesApi).toContain(listOfTitlesUi[index]);
        }
    });
});
