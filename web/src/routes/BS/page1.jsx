import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './page1.less';

import MessageList from './page1/messageList';

import aa from "../../assets/img/defalut/slide-bg.jpg"
export default class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMode: false,
      messageList: []
    };
  }
  componentDidMount() {
    servcieHub.msgManager.messageList().done(result => {
      var len = result.length;
      console.log("result.length", len);
      if (len > 4) {
        result.splice(0, len - 4)
      }
      console.log("result.length", result.length);
      this.setState({ messageList: result });
    })

  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.msg, this.props.msg);
    if (nextProps.msg != this.props.msg) {
      if (this.state.messageList.length > 3)
        this.state.messageList.splice(0, 1)
      this.state.messageList.push(nextProps.msg);
      this.setState({ messageList: this.state.messageList })
    }
  }


  render() {
    return (<div className="layout-main">
      <div className="layout-top">
        <div className="layout-left">
          <div className="layout-title">
            {window.OrgInfo.OrgName}
          </div>
          <div className="layout-list-panel">
            <MessageList messageList={this.state.messageList} />
          </div>
        </div>
        <div className="layout-right">
          <div className="layout-img">
            <img src={aa} />
          </div>
          <div className="layout-ewm">
            <img src={"https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + window.OrgInfo.Ticket} />
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
