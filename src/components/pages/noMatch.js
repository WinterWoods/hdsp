import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: '1'
        }
    }
    render() {
        return (<div><h1>404 没有找到页面</h1></div>);
    }
}
