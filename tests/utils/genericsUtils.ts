import { Page, Locator, APIRequestContext } from 'playwright';

type ElementAction<T = void> = (element: Locator) => Promise<T>;

export async function validateElement<T>(page: Page, selector: string, action: ElementAction<T>): Promise<T[]> {
  const elements = page.locator(selector);
  
  await elements.first().waitFor({ state: "visible", timeout: 10000 });
  const isElementVisible =  await elements.first().isVisible();
  if(!isElementVisible){
    throw new Error(`Element with selector ${selector} not found`);
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

export async function getApiRequestWithApi<T>(request: APIRequestContext, url: string): Promise<T> {
  const response = await request.get(url);
  const status = response.status();
  if (status < 200 || status >= 300) {
    throw new Error(`API request to ${url} failed with status ${status}`);
  }
  return await response.json() as T;
}