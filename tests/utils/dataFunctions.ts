import ElementVariables from "../interfaces/elementVariables";
import SearchedItem from "../interfaces/searchedItem";

export function everyItemsIncludesSearchElement(list: string[], searchElement: string): boolean {
    return list.every((item => item.toLowerCase().includes(searchElement.toLowerCase())))
}

export function getAllValuesByParamsFromArrayOfObjects<T extends keyof SearchedItem>(list: SearchedItem[], parameter: T): SearchedItem[T][]{
    return Array.from(new Set(list.map(item => item[parameter])));
}

export function areNextNumberOfItemsPresentInTheList(data: {list: string[], expectedItems: string[], numberOfItems: number}): boolean{ 
    return data.expectedItems.slice(0, data.numberOfItems-1)
        .every(item => {
            return data.list.includes(item);
        })
}

export function mapData(items: SearchedItem[], property: keyof SearchedItem, style: { [key: string]: string }, key?: string): ElementVariables[] {
    return items.map(item => {
        if (item.promotion.top_ad) {
            return { expectedText: '', expectedStyle: style };
        } else {
            let value: string | undefined;
            if (key && property === 'params') {
                value = item.params.find(param => param.key === key)?.value?.label;
            } else {
                const directValue = item[property];
                value = typeof directValue === 'string' ? directValue : '';
            }
            return { expectedText: value, expectedStyle: style };
        }
    });
}
