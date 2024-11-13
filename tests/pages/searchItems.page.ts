import { Page } from "playwright-core";
import BasePage from "./basePage";
import selectors from './selectors.json';

class SearchItemsPage extends BasePage {
    public readonly searchedItemsBox: string;
    public readonly searchedItemsPromotionStatus: string;
    public readonly searchedItemsTitle: string;
    public readonly searchedItemsPrice: string;
    public readonly searchedItemsState: string;

    constructor(page: Page) {
        super(page);
        this.searchedItemsBox = selectors.searchedItemsBox;
        this.searchedItemsPromotionStatus = selectors.searchedItemsPromotionStatus;
        this.searchedItemsTitle = selectors.searchedItemsTitle;
        this.searchedItemsPrice = selectors.searchedItemsPrice;
        this.searchedItemsState = selectors.searchedItemsState;
    }
}

export default SearchItemsPage;