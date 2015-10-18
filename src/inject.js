function injectScript(file) {
    const element = document.createElement('script');
    element.setAttribute('type', 'text/javascript');
    element.setAttribute('src', file);
    document.body.appendChild(element);
}

window.onload = () => {
    injectScript(chrome.extension.getURL('/javascripts/backend.js'));
}
