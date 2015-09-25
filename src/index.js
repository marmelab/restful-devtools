import notifier from './service/notifier';
// import debug from './service/debug';

import Root from './container/Root';
import React from 'react';
import ReactDOM from 'react-dom';

export default function(restful) {
    const container = window.document.createElement('div');
    window.document.body.appendChild(container);

    ReactDOM.render(
        <Root { ...{ notifier: notifier(restful) } } />,
        container
    );
}
