import networkService from './service/network';
import Panel from './component/Panel';
import React from 'react';
import ReactDOM from 'react-dom';

const network = networkService(chrome.runtime.connect({
    name: '' + chrome.devtools.inspectedWindow.tabId,
}));

network.once('ready', () => {
    ReactDOM.render(<Panel {... {network}} />, document.getElementById('container'));
});

network.emit('send', {
    hello: true,
});
