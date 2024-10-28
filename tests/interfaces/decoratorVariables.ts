import { Locator } from "playwright"
import ElementVariables from "./elementVariables"

export default interface DecoratorVariables {
    element?: Locator,
    selector: string,
    properties: ElementVariables
}