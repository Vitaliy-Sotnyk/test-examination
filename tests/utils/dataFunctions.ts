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
