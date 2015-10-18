const ports = {};

function link(left, right) {
    function leftToRight(message) {
        right.postMessage(message);
    }
    left.onMessage.addListener(leftToRight);
    function rightToLeft(message) {
        left.postMessage(message);
    }
    right.onMessage.addListener(rightToLeft);

    function onDisconnect() {
        left.onMessage.removeListener(leftToRight);
        right.onMessage.removeListener(rightToLeft);
        left.disconnect();
        right.disconnect();
    }
    left.onDisconnect.addListener(onDisconnect);
    right.onDisconnect.addListener(onDisconnect);
}

chrome.runtime.onConnect.addListener((port) => {
    let { name } = port;
    let tabId;

    if ('' + parseInt(name, 10) === name) {
        tabId = name;
        name = 'restful-devtools-frontend';
    } else {
        tabId = '' + port.sender.tab.id;
    }


    if (!ports[tabId]) {
        ports[tabId] = {
            'restful-devtools-backend': null,
            'restful-devtools-frontend': null,
        };
    }

    ports[tabId][name] = port;

    if (ports[tabId]['restful-devtools-backend'] && ports[tabId]['restful-devtools-frontend']) {
        link(
            ports[tabId]['restful-devtools-backend'],
            ports[tabId]['restful-devtools-frontend']
        );
    }
});
