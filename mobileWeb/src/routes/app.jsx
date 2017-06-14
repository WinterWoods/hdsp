import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import { Toast } from 'antd-mobile';

import './app.less';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'app',
      open: false
    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    startSignal(this.okCallBack.bind(this), this.errCallBack, this.stateChangeCallBack, this.disconnectedCallBack);
  }
  GetRequest() {
    var url = location.search; //获取url中"?"符后的字串   
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  }
  okCallBack() {
    Toast.info('连接成功...', 1);
    var parms = this.GetRequest();
    servcieHub.msgManager.getUserForCode(parms.code).done(result => {
      window.UserInfo=result;
      console.log(result);
    })
    console.log("!!!!!!", parms.code);
    //要拉去是谁,并初始化公众号的本地配置
  }
  errCallBack() {

  }
  stateChangeCallBack() {

  }
  disconnectedCallBack() {

  }
  componentWillReceiveProps(nextProps) {

  }
  componentWillUnmount() {

  }
  render() {
    return (
      <div className="container">
        {this.props && this.props.children && React.cloneElement(this.props.children, {
          changeTitle: title => this.setState({ title })
        }) || <div />}
      </div>
    );
  }
}

App.propTypes = {
};

App.defaultProps = {
};
