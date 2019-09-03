// import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';

console.log = function(txt) {
    chrome.devtools.inspectedWindow.eval('console.log("' + txt + '")');
}

export default class Panel extends Component {
    static propTypes = {
        network: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            // events: List([{ type: 'test'}]),
            events: [],
        };
    }

    componentDidMount() {
        const { network } = this.props;

        network.on('message', (message) => {
            console.log('message');
            this.setState(({ events }) => ({
                // events: events.push(message),
                events: events.concat([message]),
            }));
        });
    }

    render() {
        const { events } = this.state;
        console.log(events.length);
        return (
            <ul>
                {events.map((event) => {
                    return <li>entry: {JSON.stringify(event)}</li>;
                })}
            </ul>
        );
    }za
}
