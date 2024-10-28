import { Page } from "playwright-core";
import BasePage from "./basePage";

class MainPage extends BasePage {
    public readonly title: string;
    
    constructor(page: Page) {
        super(page);
        this.title = '[data-testid="home-categories-title"]';
    }
}

export default MainPage;