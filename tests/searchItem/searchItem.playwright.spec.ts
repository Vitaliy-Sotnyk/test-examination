import { test, expect } from '@playwright/test';
import BasePage from '../pages/basePage';
import MainPage from '../pages/main.page';
import { getAllSearchedItemsWithApi, performAction, validateElement } from '../utils/genericsUtils';
import { areNextNumberOfItemsPresentInTheList, everyItemsIncludesSearchElement, getAllValuesByParamsFromArrayOfObjects } from '../utils/dataFunctions';
import keywords from './data/keyWords.json'
import SearchItemsPage from '../pages/searchItems.page';
import SearchedItem from '../interfaces/searchedItem';
import { Decorators } from '../utils/decorator';
import expectedData from './data/expectedData.json'
import { itemsValidator } from '../utils/itemValidator';
import { ApiTestCommand, CommandManager, UiTestCommand } from '../utils/patterns/command';
import { generateExpectedProperties } from './data/expectedProperties';


test.describe('Playwright: search functionality of OLX', () => {
    test('search item in the system: api', async ({request, page}) => { 
        const searchString: string = keywords.iphone;
        const basePage = new BasePage(page);
        const response: SearchedItem[] = await getAllSearchedItemsWithApi(request, basePage.pageUrl, searchString);
        const listOfTitles = getAllValuesByParamsFromArrayOfObjects(response, 'title');
        expect(everyItemsIncludesSearchElement(listOfTitles, searchString)).toBeTruthy();
    });

    test('search item in the system: ui', async ({ page }) => {
        const searchString: string = keywords.iphone;
        const mainPage = new MainPage(page);
        const searchPage = new SearchItemsPage(page);
        await mainPage.navigate();
        await validateElement(page, mainPage.searchField, performAction('fill', [searchString]));
        await validateElement(page, mainPage.searchButton, performAction('click'));
        const listOfTitles: string[] = await validateElement(page, searchPage.searchedItemsTitle, performAction('innerText'));
        expect(everyItemsIncludesSearchElement(listOfTitles, searchString)).toBeTruthy();
    });

    test('search item in the system: all api and ui first page', async ({ request, page }) => {
        const searchString: string = keywords.iphone6S;
        const basePage = new BasePage(page);
        const mainPage = new MainPage(page);
        const searchPage = new SearchItemsPage(page);
        const response: SearchedItem[] = await getAllSearchedItemsWithApi(request, basePage.pageUrl, searchString);
        const listOfTitlesApi = getAllValuesByParamsFromArrayOfObjects(response, 'title');
        await mainPage.navigate();
        await validateElement(page, mainPage.searchField, performAction('fill', [searchString]));
        await validateElement(page, mainPage.searchButton,  performAction('click'));
        const listOfTitlesUi: string[] = await validateElement(page, searchPage.searchedItemsTitle, performAction('innerText'));
        expect(areNextNumberOfItemsPresentInTheList({list: listOfTitlesApi, expectedItems: listOfTitlesUi, numberOfItems: 10})).toBeTruthy();
    });

    test('check items with decorators: ui first page', async ({ page }) => {
        const searchString: string = keywords.iphone6S;
        const expectedProperties = generateExpectedProperties(expectedData);
        const mainPage = new MainPage(page);
        const searchPage = new SearchItemsPage(page)
        const decorators = new Decorators(page);
        await mainPage.navigate();
        await validateElement(page, mainPage.searchField, performAction('fill', [searchString]));
        await validateElement(page, mainPage.searchButton,  performAction('click'));
        await itemsValidator({
            page: page, 
            decorator: decorators, 
            selector: searchPage.searchedItemsBox, 
            children: [
                searchPage.searchedItemsPromotionStatus, 
                searchPage.searchedItemsState, 
                searchPage.searchedItemsTitle, 
                searchPage.searchedItemsPrice
            ], 
            expectedProperties: [
                expectedProperties.searchedItemsPromotionStatus, 
                expectedProperties.searchedItemsState, 
                expectedProperties.searchedItemsTitle, 
                expectedProperties.searchedItemsPrice
            ] 
        });
    });

    test('search item in the system with using pattern "command": all api and ui first page', async ({request, page}) => { 
        const searchString: string = keywords.iphone6S;
        const basePage = new BasePage(page)
        const commandManager = new CommandManager();

        const apiCommand = new ApiTestCommand(request, basePage.pageUrl, searchString);
        commandManager.addCommand(apiCommand);
    
        await commandManager.runTests();
        commandManager.resetCommands();

        const apiData = apiCommand.getApiResults();  
        const expectedProperties = generateExpectedProperties(apiData);

        const uiCommand = new UiTestCommand(expectedProperties, page, searchString);
        commandManager.addCommand(uiCommand);
        await commandManager.runTests();
    });
});
