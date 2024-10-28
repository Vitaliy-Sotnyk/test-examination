import { Page } from "playwright-core";

class BasePage {
    public page: Page;
    public pageUrl: string;
    public readonly searchField: string;
    public readonly searchButton: string;

    constructor(page: Page) {
        this.page = page;
        this.pageUrl = process.env.BASE_URL || '';
        this.searchField = '[data-testid="search-input"]';
        this.searchButton = '[data-testid="search-submit"]';
    }

    async navigate() {
        try{
            await this.page.goto(this.pageUrl);
        } catch {
            throw new Error('url is invalid');
        }
    }

    async getTitle() {
        return this.page.title();
    }
}

export default BasePage;