import ElementVariables from "../interfaces/elementVariables";
import SearchedItem from "../interfaces/searchedItem";

function cyrillicToLatin(input: string) {
    const cyrillicMap: { [key: string]: string } = {
        'а': 'a', 'в': 'b', 'д': 'd', 'е': 'e', 
        'и': 'u', 'і': 'i', 'к': 'k', 'м': 'm', 
        'н': 'h', 'о': 'o', 'p': 'p', 'с': 'c',
        'т': 't', 'у': 'y', 'х': 'x', 'ш': 'w'
    };

    return input.toLowerCase().replace(/[\s\S]/g, function(char: string) {
        return cyrillicMap[char] || char;
    });
}

export function everyItemsIncludesSearchElement(list: string[], searchElement: string): boolean {
    return list.every((item => {
        const normalizedString = cyrillicToLatin(item);
        return normalizedString.includes(searchElement.toLowerCase())
    }));
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
            let directValue: string | undefined;
            if (key && property === 'params') {
                directValue = item.params.find(param => param.key === key)?.value?.label;
            } else {
                directValue = item[property].toString();
            }
            const value: string | undefined = typeof directValue === 'string' ? directValue : '';
            return { expectedText: value, expectedStyle: style };
        }
    });
}

export function getRandomIndex(arrayLength: number): number {
    return Math.floor(Math.random() * arrayLength);
}