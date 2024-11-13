import { Page } from "playwright-core";
import BasePage from "./basePage";
import selectors from './selectors.json';

class MainPage extends BasePage {
    public readonly title: string;
    
    constructor(page: Page) {
        super(page);
        this.pageUrl = this.pageUrl+'/uk'
        this.title = selectors.mainPageTitle;
    }
}

export default MainPage;