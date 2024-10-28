import styles from './styles.json';
import expectedData from './expectedData.json'
import ElementVariables from '../../interfaces/elementVariables';
import { mapData } from '../../utils/dataFunctions';

export const expectedProperties: Record<string, ElementVariables[]> = {
    searchedItemsPromotionStatus: [{ expectedText: 'ТОП', expectedStyle: styles.topFlag}],
    searchedItemsState: mapData(expectedData, "params", styles.itemState, "state"),
    searchedItemsTitle: mapData(expectedData, "title", styles.itemTitleText),
    searchedItemsPrice: mapData(expectedData, "params", styles.itemPrice, "price")
}