import { Page } from "playwright-core";

class BasePage {
    public page: Page;
    public pageUrl: string;

    constructor(page: Page) {
        this.page = page;
        this.pageUrl = process.env.BASE_URL || '';
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