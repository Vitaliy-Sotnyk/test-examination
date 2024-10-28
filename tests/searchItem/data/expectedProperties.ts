import styles from './styles.json';
import expectedData from './expectedData.json'
import ElementVariables from '../../interfaces/elementVariables';

export const expectedProperties: Record<string, ElementVariables[]> = {
    searchedItemsPromotionStatus: [{ expectedText: 'ТОП', expectedStyle: styles.topFlag}],
    searchedItemsState:  expectedData.map(item => {
        if(!item.promotion.top_ad){
            return { expectedText: item.params.find(item => item.key === "state")?.value.label, expectedStyle: styles.itemState }
        } else {
            return { expectedText: '', expectedStyle: styles.itemState }
        }
    }),
    searchedItemsTitle: expectedData.map(item => {
        if(!item.promotion.top_ad){
            return { expectedText: item.title, expectedStyle: styles.itemTitleText }
        } else {
            return { expectedText: '', expectedStyle: styles.itemTitleText }
        }
    }),
    searchedItemsPrice:  expectedData.map(item => {
        if(!item.promotion.top_ad){
            return { expectedText: item.params.find(item => item.key === "price")?.value.label, expectedStyle: styles.itemPrice }
        } else {
            return { expectedText: '', expectedStyle: styles.itemPrice }
        }
    }),
}