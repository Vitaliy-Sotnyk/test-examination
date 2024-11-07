import styles from './styles.json';
import ElementVariables from '../../interfaces/elementVariables';
import { mapData } from '../../utils/dataFunctions';
import SearchedItem from '../../interfaces/searchedItem';

export function generateExpectedProperties(expectedData: SearchedItem[]): Record<string, ElementVariables[]> {
    return {
        searchedItemsPromotionStatus: [{ expectedText: 'ТОП', expectedStyle: styles.topFlag}],
        searchedItemsState: mapData(expectedData, "params", styles.itemState, "state"),
        searchedItemsTitle: mapData(expectedData, "title", styles.itemTitleText),
        searchedItemsPrice: mapData(expectedData, "params", styles.itemPrice, "price")
    };
}