import { Page } from 'playwright';
import errorMessageGenerator from './errorMessageGenerator';
import DecoratorVariables from '../interfaces/decoratorVariables';

export class Decorators {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    @visibilityDecorator
    async checkElementProperties(data: DecoratorVariables) {
        if (data) {
            return true;
        }
    }
}

function visibilityDecorator() {
    return async function (this: Decorators, args: DecoratorVariables) {
        const { selector, properties } = args;
        const { expectedClass, expectedStyle } = properties;
        let { expectedText } = properties;
        let element 
        if(args.element){
            element = args.element;
        } else {
            element = await this.page.locator(selector);
        }

        if (!element) {
            errorMessageGenerator(selector, `is not found`);
        }

        await element.waitFor({ state: "visible", timeout: 10000 });
        const visible = await element.isVisible();
        if (!visible) {
            errorMessageGenerator(selector, 'is not visible');
        }

        let elementText = await element.innerText();
        elementText = elementText.replace("\n", " ");
        expectedText = elementText.replace(/\s+/g, ' ').trim()
        if ((!elementText || elementText !== expectedText) && expectedText) {
            errorMessageGenerator(selector, `text is not as expected. Expected: ${expectedText}, Got: ${elementText}`);
        }

        const elementClass = await element.getAttribute('class');
        if ((!elementClass  || elementClass  !== expectedClass) && expectedClass) {
            errorMessageGenerator(selector, `class is not as expected. Expected: ${expectedClass}, Got: ${elementClass}`);
        }

        for (const property in expectedStyle) {
            const elementStyle = await element.evaluate((el, prop) => {
                return window.getComputedStyle(el).getPropertyValue(prop);
            }, property);
            if (elementStyle !== expectedStyle[property]) {
                errorMessageGenerator(selector, `style validation error on ${property}: Expected ${expectedStyle[property]}, found ${elementStyle}`);
            }
        }
        console.log('Visibility and properties check passed.');
        return true;
    };
}