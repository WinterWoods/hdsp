import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { hashHistory, Link } from 'react-router';
import { Icon } from 'antd-mobile';

import './index.less'
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'app',
      open: false,
    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    document.title = "测试";
  }
  componentWillReceiveProps(nextProps) {

  }
  componentWillUnmount() {

  }
  render() {
    return (
      <div className="wall-list">
        <div className="top">
          欢迎光临xxx
        </div>
        <div className="content">
          聊天记录
        </div>
        <div className="buttom">
          <div className="buttom-left">
            <Icon type={require('../../assets/fonts/emoji.svg')} />
          </div>
          <div className="buttom-input">
            <input className="msg-input" />
          </div>
          <div className="buttom-send">
            <Icon type={require('../../assets/fonts/addition.svg')} />
          </div>
        </div>
      </div>
    );
  }
}

