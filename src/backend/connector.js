import proxy from './service/proxy';

proxy(window, chrome.runtime.connect({
    name: 'restful-devtools-backend',
}));
