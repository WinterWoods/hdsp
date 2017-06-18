import React, { Component } from 'react'
import PropTypes from 'prop-types';
import stores from '../../utils/stores';
import { Spin, Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu;
import './app.less';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultSelectKey: "/",
      selectedKey: "/",
      isLoading: true,
      isLogin: false,
      stores: stores.states
    };
    stores.subscriptions((data) => {
      console.log("修改啦!", data);
      this.setState({ stores: data })
    });
  }
  componentWillMount() {

  }
  componentDidMount() {
    axios.post("User/IsLogin").then(json => {
      if (json != null) {
        sessionStorage.LoginUser = json;
        this.setState({ isLogin: true, isLoading: false });
      }
      else {
        axios.post("User/GetTicket").then(ticket => {
          console.log("设置新的ticket", ticket);
          sessionStorage.ticket = ticket;
          this.setState({ isLogin: false, isLoading: false });
        })
      }
    });
  }
  checkLogin(data) {
    var self = this;
    axios.post("User/UserLogin", { LoginAccount: data.LoginAccount, password: data.password }).then(json => {
      sessionStorage.LoginUser = json;
      self.setState({ isLogin: true, isLoading: false });
    });
  }
  componentWillReceiveProps(nextProps) {

  }
  componentWillUnmount() {

  }
  handleMenuClick(e) {
    this.context.router.push(e.key);
    this.setState({ selectedKey: e.key })
  }
  renderMenuLeft() {
    return (<Menu
      mode="inline"
      onClick={this.handleMenuClick.bind(this)}
      defaultSelectedKeys={[this.defaultSelectKey]}
      selectedKeys={[this.state.selectedKey]}
      style={{ flex: "1" }}>
      <Menu.Item key="/"><Icon type="area-chart" />系统概览</Menu.Item>
      <Menu.Item key="/1"><Icon type="team" />上网人员</Menu.Item>
      <Menu.Item key="/2"><Icon type="team" />旅馆人员</Menu.Item>
      <Menu.Item key="/3"><Icon type="exception" />短信配置</Menu.Item>
      <Menu.Item key="/4"><Icon type="solution" />机构管理</Menu.Item>
      <Menu.Item key="/5"><Icon type="setting" />用户管理</Menu.Item>
    </Menu>);
  }
  render() {
    if (this.state.isLoading) {
      return (<div className="mm-layout-loading"><Spin size="large" /></div>);
    }
    else {
      if (!this.state.isLogin) {
        return (<Login checkLogin={this.checkLogin.bind(this)} />)
      }
      else {
        return (<div className="mm-layout-main">
          <div className="mm-layout-logo">
            <div className="mm-layout-name"><h2>特殊人员实时预警系统</h2></div>
            <div className="mm-layout-loginInfo">
              <div className="mm-layout-loginInfo-name">{"欢迎您，贾辉"}</div>
              <div className="mm-layout-exit-btn"><a><Icon type="poweroff" /></a></div>
            </div>
          </div>
          <div className="mm-layout-mid">
            <div className="mm-layout-mid-content">
              <div className="mm-layout-menu">
                <div className="mm-layout-menu-panel">
                  {this.renderMenuLeft()}
                </div>
              </div>
              <div className="mm-layout-content">
                <div className="mm-layout-scroll">
                  {this.props && this.props.children && React.cloneElement(this.props.children, {
                    stores: this.state.stores
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="mm-layout-bottom">
            © 2017 开封市公安局, 中国.
                </div>
        </div>)
      }
    }

  }

}
App.contextTypes = {
  router: PropTypes.object.isRequired
};
