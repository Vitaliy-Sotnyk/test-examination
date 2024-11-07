import { APIRequestContext, Page } from "playwright";
import { getAllSearchedItemsWithApi, performAction, validateElement } from "../genericsUtils";
import SearchedItem from "../../interfaces/searchedItem";
import MainPage from "../../pages/main.page";
import { itemsValidator } from "../itemValidator";
import SearchItemsPage from "../../pages/searchItems.page";
import { Decorators } from "../decorator";
import ElementVariables from "../../interfaces/elementVariables";
import { getRandomIndex } from "../dataFunctions";

interface Command {
    execute(): Promise<void>;
}

export class ApiTestCommand implements Command {
    private results?: SearchedItem[];
    private request: APIRequestContext; 
    private url: string;
    private searchedItemName: string;
    
    constructor(request: APIRequestContext, url: string, searchedItemName: string) {
        this.request = request;
        this.url = url;
        this.searchedItemName = searchedItemName;
    }

    async execute(): Promise<void> {
        console.log('Executing API test...');
        this.results = await getAllSearchedItemsWithApi(this.request,this.url, this.searchedItemName);
    }

    getApiResults(): SearchedItem[]  {
        return this.results || [];
    }
}

export class UiTestCommand implements Command {
    private apiData: Record<string, ElementVariables[]>;

    constructor(apiData: Record<string, ElementVariables[]>, private page: Page, private searchString: string) {
        this.apiData = apiData;
    }

    async execute() {
        console.log('Executing UI test with API data');       
        const mainPage = new MainPage(this.page);
        const searchPage = new SearchItemsPage(this.page);
        const decorators = new Decorators(this.page);
        const childrenElements = [
            searchPage.searchedItemsPromotionStatus, 
            searchPage.searchedItemsState, 
            searchPage.searchedItemsTitle, 
            searchPage.searchedItemsPrice
        ]
        const expectProperties =  [
            this.apiData.searchedItemsPromotionStatus, 
            this.apiData.searchedItemsState, 
            this.apiData.searchedItemsTitle, 
            this.apiData.searchedItemsPrice
        ] 
        const randomElement = getRandomIndex(childrenElements.length);

        await mainPage.navigate();
        await validateElement(this.page, mainPage.searchField, performAction('fill', [this.searchString]));
        await validateElement(this.page, mainPage.searchButton, performAction('click'));

        
        await itemsValidator({
            page: this.page, 
            decorator: decorators, 
            selector: searchPage.searchedItemsBox, 
            children: [ childrenElements[randomElement] ], 
            expectedProperties: [ expectProperties[randomElement] ]
        });
    }
}

export class CommandManager {
    private commands: Command[] = [];

    addCommand(command: Command): void {
        this.commands.push(command);
    }

    async runTests() {
        console.log('Starting test sequence...');
        for (const command of this.commands) {
            await command.execute();
        }
        console.log('Test sequence completed.');
    }
    
    resetCommands() {
        this.commands = []; 
    }
}