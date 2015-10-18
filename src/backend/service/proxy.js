export default function proxy(port) {
    function onBackendMessage(event) {
        const { data } = event;

        if (data.source !== 'restful-devtools-backend') {
            return;
        }

        port.postMessage(data);
    }

    window.addEventListener('message', onBackendMessage);

    port.onDisconnect.addListener(() => {
        window.postMessage({
            disconnect: true,
            source: 'restful-devtools-frontend',
        }, '*');
        window.removeEventListener('message', onBackendMessage);
    });

    port.onMessage.addListener((message) => {
        window.postMessage({
            ...message,
            source: 'restful-devtools-frontend',
        }, '*');
    });
}
