import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import { Toast, NoticeBar, ActivityIndicator, Result, Icon } from 'antd-mobile';

import './app.less';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'app',
      open: false,
      isLoading: true,
      showErrMsg: false,
      errMsg: "",
      ErrBSKey: false,
      msg: {}
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
    clientHub.exceptionHandler = (err) => {
      console.log("!!!!", err);
      this.setState({ showErrMsg: true, errMsg: err });
    };
    clientHub.sendMsg = (msg) => {
      console.log("!!!!!!!" + msg);
      this.setState({ msg: msg });
    };
    Toast.info('连接成功...', 1);
    var parms = this.GetRequest();
    console.log(parms);
    if (parms.bs) {
      //如果不是从二维码参数进来的.就报错.必须包含有参数连接,并且连接是正确的.
      servcieHub.msgManager.getOrgInfo(parms.bs).done(org => {
        window.OrgInfo = org;
        document.title = org.OrgName;
        console.log(org);
        //获取到的屏幕信息
        if (parms.code) {
          servcieHub.msgManager.getUserForCode(parms.code).done(result => {
            window.UserInfo = result;
            console.log(result);
            this.setState({ isLoading: false, showErrMsg: false });

          }).fail(err => {
            this.hrefGoAuthUrl();
          });
        }
        else {
          this.hrefGoAuthUrl();
        }
      }).fail(err1 => {
        this.setState({ ErrBSKey: true });
      });
    }
    else {
      this.setState({ ErrBSKey: true });
    }


    //要拉去是谁,并初始化公众号的本地配置
  }
  hrefGoAuthUrl() {
    servcieHub.msgManager.getAuthUrl().done(url => {
      location.href = url;
    });
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
    if (this.state.isLoading) {
      if (this.state.ErrBSKey) {
        return (<Result
          img={<Icon type="cross-circle-o" className="icon" style={{ fill: '#F13642' }} />}
          title="进入大屏失败"
          message="请扫描二维码进入"
        />);
      }
      else {
        return (<div className="container">
          <div className="align-loading">
            <ActivityIndicator size="large" />
            <span style={{ marginTop: 8 }}>加载中...</span>
          </div>
        </div>);
      }

    }
    else {
      return (
        <div className="container">
          {this.state.showErrMsg ? <NoticeBar mode="closable" icon={null}>{this.state.errMsg}</NoticeBar> : ""}
          {this.props && this.props.children && React.cloneElement(this.props.children, {
            changeTitle: title => this.setState({ title }),
            msg: this.state.msg
          }) || <div />}
        </div>
      );
    }

  }
}

App.propTypes = {
};
App.contextTypes = {
  router: PropTypes.object.isRequired
};
App.defaultProps = {
};
