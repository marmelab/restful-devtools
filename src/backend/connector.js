import proxy from './service/proxy';

proxy(chrome.runtime.connect({
    name: 'restful-devtools-backend',
}));
