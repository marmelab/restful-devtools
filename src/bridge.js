const pipes = {};

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

chrome.runtime.onConnect.addListener((pipe) => {
    let { name } = pipe;
    let tabId;

    if ('' + parseInt(name, 10) === name) {
        tabId = name;
        name = 'restful-devtools-frontend';
    } else {
        tabId = '' + pipe.sender.tab.id;
    }


    if (!pipes[tabId]) {
        pipes[tabId] = {
            'restful-devtools-backend': null,
            'restful-devtools-frontend': null,
        };
    }

    pipes[tabId][name] = pipe;

    if (pipes[tabId]['restful-devtools-backend'] && pipes[tabId]['restful-devtools-frontend']) {
        link(
            pipes[tabId]['restful-devtools-backend'],
            pipes[tabId]['restful-devtools-frontend']
        );
    }
});
