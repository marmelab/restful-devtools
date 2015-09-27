import DevTools from './container/DevTools';
import React from 'react';
import ReactDOM from 'react-dom';

export default function(restful) {
    const container = window.document.createElement('div');
    window.document.body.appendChild(container);

    ReactDOM.render(
        <DevTools { ...{ restful } } />,
        container
    );
}

// export { DevTools };
