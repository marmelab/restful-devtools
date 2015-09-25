import React, { Component, PropTypes } from 'react';

export default class Section extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        titleColor: PropTypes.string,
        children: PropTypes.node,
        url: PropTypes.string,
    };

    render() {
        const { children, title, titleColor = 'white', url } = this.props;

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
                { children }
            </section>
        );
    }
 }
