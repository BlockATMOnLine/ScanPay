export function getParams(name) {
    const scriptUrl = window.location.href;
    const url = new URL(scriptUrl);
    const urlParams = Object.fromEntries(url.searchParams);
    if(name) {
        return urlParams[name];
    } else {
        return urlParams;
    }
}