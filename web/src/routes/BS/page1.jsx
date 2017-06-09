import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './page1.less';

import aa from "../../assets/img/defalut/slide-bg.jpg"
import bb from "../../assets/img/defalut/showqrcode.jpg"
export default class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMode: false
    };
  }
  render() {
    return (<div className="layout-main">
      <div className="layout-top">
        <div className="layout-left">
          <div className="layout-title">
            银基水世界
          </div>
          <div className="layout-list-panel">
            <div className="layout-list">
              <div className="head-img">
                <div className="img"></div>
              </div>
              <div className="mid">
                <div className="title">
                  east
                </div>
                <div className="message">
                  我发的测试消息我发的测试消息我发的测试消息我发的测试消息我发的测试消息我发的测试消息我发的测试消息我发的测试消息我发的测试消息我发的测试消息
                </div>
              </div>
              <div className="time">
                昨天 17:18
              </div>
            </div>
            <div className="layout-list">

            </div>
            <div className="layout-list">

            </div>
            <div className="layout-list">

            </div>
          </div>
        </div>
        <div className="layout-right">
          <div className="layout-img">
            <img src={aa} />
          </div>
          <div className="layout-ewm">
            <img src={bb} />
          </div>
        </div>
      </div>
      <div className="layout-bottom"></div>
    </div>);
  }
}

Page1.propTypes = {
};

Page1.defaultProps = {
};
