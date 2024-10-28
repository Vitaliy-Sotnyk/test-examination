import { Page } from "playwright-core";
import BasePage from "./basePage";

class SearchItemsPage extends BasePage {
    public readonly searchedItemsBox: string;
    public readonly searchedItemsPromotionStatus: string;
    public readonly searchedItemsTitle: string;
    public readonly searchedItemsPrice: string;
    public readonly searchedItemsState: string;

    constructor(page: Page) {
        super(page);
        this.searchedItemsBox = '//div[@data-testid="l-card"]';
        this.searchedItemsPromotionStatus = '//div[@data-testid="card-delivery-badge"]//preceding-sibling::div';
        this.searchedItemsTitle = '[data-cy="ad-card-title"] h6';
        this.searchedItemsPrice = '[data-testid="ad-price"]';
        this.searchedItemsState = '//span[@title]';
    }
}

export default SearchItemsPage;