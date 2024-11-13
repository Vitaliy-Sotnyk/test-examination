import { Page } from "playwright-core";
import selectors from './selectors.json';

class BasePage {
    public page: Page;
    public pageUrl: string;
    public readonly searchField: string;
    public readonly searchButton: string;

    constructor(page: Page) {
        this.page = page;
        this.pageUrl = process.env.BASE_URL || '';
        this.searchField = selectors.searchField;
        this.searchButton = selectors.searchButton;
    }

    async navigate() {  
        await this.page.goto(this.pageUrl);
    }

    async getTitle() {
        return this.page.title();
    }
}

export default BasePage;