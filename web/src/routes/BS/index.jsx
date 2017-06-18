import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Spin } from 'antd'

import Particles from '../../components/particles';
import './index.less';
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
      isLoading: true,
      msg: {},
      bgName: "bg1"
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
    console.log("!!!!连接成功");
    clientHub.exceptionHandler = (err) => {
      console.log("!!!!", err);
    };
    clientHub.sendMsg = (msg) => {
      console.log("!!!!!!!" + msg);
      this.setState({ msg: msg });
    };
    var parms = this.GetRequest();
    console.log(parms);
    if (parms.bs) {
      //如果不是从二维码参数进来的.就报错.必须包含有参数连接,并且连接是正确的.
      servcieHub.msgManager.getOrgInfo(parms.bs).done(org => {
        console.log("!!!!正在获取机构信息", org);
        window.OrgInfo = org;
        document.title = org.OrgName;

        this.setState({ isLoading: false });
      }).fail(err1 => {
        this.setState({ ErrBSKey: true });
      });
    }
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
  menuClick() {
    this.setState({ menuVisible: !this.state.menuVisible });
  }

  render() {
    if (this.state.isLoading) {
      return (<div className="loading-panel">
        <Spin size="large" />
      </div>);
    }
    else {
      return (<div className="root-context bg2" >
        {!this.state.menuVisible ? React.cloneElement(this.props.children, {
          msg: this.state.msg
        }) : <div />}
        <div className="menu-button" onClick={this.menuClick.bind(this)}>菜单按钮</div>
        <div className={this.state.menuVisible ? "menu-panel-bg menu-panel-bg-show" : "menu-panel-bg"}>
          <div className="menu-panel-other"></div>
          <div className="menu-panel">
            <div className="menu-row">
              <div className="menu-one">

              </div>
              <div className="menu-one">

              </div>
              <div className="menu-one">

              </div>
              <div className="menu-one">

              </div>
            </div>
            <div className="menu-row">
              <div className="menu-one">

              </div>
              <div className="menu-one">

              </div>
            </div>
          </div>
          <div className="menu-panel-other"></div>
        </div>

        <Particles className="particlescanvas" />
      </div>);
    }

  }
}

Main.propTypes = {
};
Main.contextTypes = {
  router: PropTypes.object.isRequired
};
Main.defaultProps = {
};
