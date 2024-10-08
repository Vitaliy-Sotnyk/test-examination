import { Locator, Page } from "playwright-core";
import BasePage from "../../basePage";

class MainPage extends BasePage {
    public readonly title: Locator;
    
    constructor(page: Page) {
        super(page);
        this.title = page.locator('[data-testid="home-categories-title"]');
    }
}

export default MainPage;