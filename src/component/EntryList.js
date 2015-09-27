import React, { Component, PropTypes } from 'react';
import Entry from '../component/Entry';

/* eslint-disable new-cap */
export default class EntryList extends Component {
    static propTypes = {
        entries: PropTypes.array.isRequired,
        theme: PropTypes.object.isRequired,
    };

    _renderEntry(data, key, title, titleColor) {
        const { theme } = this.props;

        return <Entry {...{data, theme, title, titleColor, key, url: data.config.url}} />;
    }

    _renderError(data, key) {
        const title = data.payload.response.statusCode ? `ERROR ${data.payload.response.statusCode}` : 'ERROR';

        return this._renderEntry(data, key, title, 'red');
    }

    _renderRequest(data, key) {
        return this._renderEntry(data, key, 'REQUEST');
    }

    _renderResponse(data, key) {
        const title = `RESPONSE ${data.payload.statusCode}`;

        return this._renderEntry(data, key, title);
    }

    render() {
        const { entries, theme } = this.props;

        return (
            <div style={{
                backgroundColor: theme.base00,
                bottom: 0,
                boxShadow: '0px 0px 1px 0px #000',
                position: 'fixed',
                fontFamily: 'monaco, Consolas, Lucida Console, monospace',
                fontSize: '18px',
                fontWeight: 300,
                overflowY: 'auto',
                padding: '0 10px',
                right: 0,
                top: 0,
                width: '300px',
            }}>
                {entries.map((entry, key) => {
                    const type = entry.type;
                    delete entry.type;

                    switch (type) {
                    case 'error':
                        return this._renderError(entry, key);
                    case 'request':
                        return this._renderRequest(entry, key);
                    case 'response':
                        return this._renderResponse(entry, key);
                    default:
                        return null;
                    }
                })}
            </div>
        );
    }
 }
