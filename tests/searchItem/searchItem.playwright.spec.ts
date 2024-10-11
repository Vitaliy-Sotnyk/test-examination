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
 
    test('search item in the system: api', async ({request, page}) => { 
        const url = new BasePage(page);
        const getOffersPath = 'api/v1/offers/?offset&query='
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
        const listOfTitlesApi: string[] = [];

        for(let i=0; i<=1000; i=i+40) {
            const getOffersPath = `api/v1/offers?offset=${i}&query=`;
            const response = await getApiRequestWithApi<ApiResponse>( request, `${url.pageUrl}${getOffersPath}${searchString}`);
            listOfTitlesApi.push(...response.data.map(item =>item.title));
        }

        await mainPage.navigate();
        await validateElement(page, '[data-testid="search-input"]', element => element.fill(searchString));
        await validateElement(page, '[data-testid="search-submit"]', element => element.click());
        
        const listOfTitlesUi = await validateElement(page, '[data-testid="l-card"] h6', element => element.innerText());
        for(let index = 0; index < 2; index++){
            expect(listOfTitlesApi).toContain(listOfTitlesUi[index]);
        }
    });
});
