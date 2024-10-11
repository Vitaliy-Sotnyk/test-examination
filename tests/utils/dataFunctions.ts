export function everyItemsIncludes(list: string[], searchElement: string): boolean {
    return list.every((item => item.toLowerCase().includes(searchElement.toLowerCase())))
}