import JSONTree from 'react-json-tree';
import React, { Component, PropTypes } from 'react';

export default class Section extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        titleColor: PropTypes.string,
        url: PropTypes.string,
    };

    render() {
        const { data, theme, title, titleColor = 'white', url } = this.props;

        return (
            <section>
                <h4 style={{
                    backgroundColor: 'rgba(245, 245, 245, 0.1)',
                    color: titleColor,
                    fontWeight: 500,
                    padding: '5px 10px',
                    margin: '0 -10px 10px -10px',
                }}>
                    {title}
                    <br/>
                    <small>{url}</small>
                </h4>
                <JSONTree {...{data, theme}} />
            </section>
        );
    }
 }
