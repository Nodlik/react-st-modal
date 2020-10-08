export function appendToBody(id: string): HTMLElement {
    let result = document.getElementById(id);

    if (!result) {
        result = document.createElement('div');
        result.setAttribute('id', id);
        document.body.appendChild(result);
    }

    return result;
}
