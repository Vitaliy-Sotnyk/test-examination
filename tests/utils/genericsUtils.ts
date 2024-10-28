import { Page, Locator, APIRequestContext } from 'playwright';
import errorMessageGenerator from './errorMessageGenerator';
import apiUrls from '../apiUrls/apiUrls.json'

type ElementAction<T = void> = (element: Locator) => Promise<T>;

export function performAction<T>(action: keyof Locator, args?: string[]): ElementAction<T> {
    return async (element: Locator): Promise<T> => {
        const method = element[action] as ((...args: string[]) => Promise<T>);
        if (typeof method !== 'function') {
            errorMessageGenerator(action, 'is not a valid method of Locator');
        }
        return args ? await method.call(element, ...args) as Promise<T> :
                      await method.call(element) as Promise<T>;
    };
}

export async function validateElement<T>(page: Page, selector: string, action: ElementAction<T>): Promise<T[]> {
  const elements = await page.locator(selector);
  await elements.first().waitFor({ state: "visible", timeout: 10000 });
  const isElementVisible =  await elements.first().isVisible();
  if(!isElementVisible){
    errorMessageGenerator(selector, 'is not found');
  }

  const count = await elements.count();
  const results: T[] = [];
  for (let i = 0; i < count; i++) {
      const element = elements.nth(i);
      const result = await action(element);
      results.push(result);
  }
  return results;
}

type ApiResponse<Data> = {
  data?: Data[];
  error?: string;
};

export async function getAllSearchedItemsWithApi<Item>(request: APIRequestContext, url: string, searchedItemName: string): Promise<Item[]> {
  let offset = 0;
  let hasMore = true;
  const results: Item[] = []; 
  const pageSize = 40;

  while (hasMore) {
    const response = await getApiRequest<ApiResponse<Item>>(request, `${url}${apiUrls.getOffers}${offset}&query=${searchedItemName}`);
    if (!response.data) {
      hasMore = false;
      break; 
    }else {
      offset += pageSize;
    }
    results.push(...response.data); 
  }
  return results;
}

async function getApiRequest<T>(request: APIRequestContext, url: string): Promise<T> {
  const response = await request.get(url);
  return await response.json() as T;
}

type IPage = {
  evaluate: (pageFunction: () => void | Promise<void>) => Promise<void>;
  waitForLoadState: (state: LoadState) => Promise<void>;
}
type LoadState = "load" | "domcontentloaded" | "networkidle";

export async function waitForScrolling<T extends IPage>(page: T): Promise<void> {
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForLoadState("networkidle");
}
