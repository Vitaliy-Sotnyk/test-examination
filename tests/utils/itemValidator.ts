import { Page } from "playwright";
import { Decorators } from "./decorator";
import { waitForScrolling } from "./genericsUtils";
import ElementVariables from "../interfaces/elementVariables";

export async function itemsValidator(data: {
    page: Page, 
    decorator: Decorators, 
    selector: string, 
    children: string[], 
    expectedProperties: ElementVariables[][]  
}) {
    await waitForScrolling(data.page);
  
    const elements = await data.page.locator(`${data.selector}`).all();  
  
    for (let elementIndex = 0; elementIndex < elements.length; elementIndex++) {
      for(let index = 0; index < data.children.length; index++){
        const childElement = elements[elementIndex].locator(data.children[index]);
  
        if(await childElement.count() > 0) {
            const propertiesData = data.expectedProperties[index].length === data.children.length
                ? data.expectedProperties[index][elementIndex]
                :data.expectedProperties[index][0];

            await data.decorator.checkElementProperties({
                element: childElement, 
                selector: `${childElement}`, 
                properties: propertiesData
            });
        }
      }
    }
  }
  