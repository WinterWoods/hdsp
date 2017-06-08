import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '1',
            text: ""
        }
    }
    componentWillMount() {
        //渲染前执行
    }
    componentDidMount() {
        //渲染后执行
        var self=this;

    }
    componentWillReceiveProps(nextProps) {
        //接受到新的数据处理
    }
    componentWillUpdate(nextProps, nextState) {
        //更新前执行
    }
    componentWillUnmount() {
        //准备卸载前执行
    }

    render() {
        return (<div><h2>ceshi</h2></div>);
    }
}
