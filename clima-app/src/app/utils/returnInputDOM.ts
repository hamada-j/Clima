export function returnElementDOM(elementId: string): string{
    let elementDOM: string = `<input type="text" id="${elementId}" ngModel />`
    return elementDOM;
}
