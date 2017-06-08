import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Breadcrumb, Icon, Row, Col, message, Modal, Popover, notification, Badge, Progress, Spin, Dropdown } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
const SubMenu = Menu.SubMenu;
import axios from 'axios';
import { hashHistory } from 'react-router'
import './app.less';

import Login from './pages/login';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isLogin: false,
            selectedKey: this.defaultSelectKey,
            formData: {}
        }
    }

    componentDidMount() {
        if (sessionStorage) {

        }
        var self = this;
        //去后台查询是否登录,如果没有登陆则需要登录
        this.setState({ isLoading: true });
        axios.post("/User/IsLogin").then(result => {
            if (result.data != null) {
                console.log("object");
                window.LoginUser = result.data;
                self.setState({ isLogin: true, isLoading: false });
            }
            else {
                console.log("!!!!!!!!!!");
                axios.post("User/GetTicket").then(ticket => {
                    console.log("设置新的ticket", ticket.data);
                    sessionStorage.ticket = ticket.data;
                    axios.defaults.headers.common['ticket'] = sessionStorage.ticket
                    self.setState({ isLogin: false, isLoading: false });
                })
            }
        })
        // post("User/IsLogin").done(json => {
        //     if (json != null) {
        //         window.LoginUser = json;
        //         self.setState({ isLogin: true, isLoading: false });
        //     }
        //     else {
        //         post("User/GetTicket").done(ticket => {
        //             console.log("设置新的ticket", ticket);
        //             sessionStorage.ticket=ticket;
        //             $.ajaxSetup({ headers: { ticket: ticket } });
        //             self.setState({ isLogin: false, isLoading: false });
        //         })
        //     }
        // });
    }
    componentWillUpdate(nextProps, nextState) {
        //更新前执行

    }
    componentDidUpdate() {
    }
    checkLogin(data) {
        var self = this;
        axios.post("User/UserLogin", { LoginAccount: data.LoginAccount, password: data.password }).then(json => {
            window.LoginUser = json.data;
            self.setState({ isLogin: true, isLoading: false });
            if (window.LoginUser.role == "1") {
                hashHistory.replace({ pathname: "/memberList" });
            }
            if (window.LoginUser.role == "2") {
                hashHistory.replace({ pathname: "/luckList" });
            }
            if (window.LoginUser.role == "3") {
                hashHistory.replace({ pathname: "/VIPRollList" });
            }
        });
    }
    handleMenuClick(e) {
        hashHistory.push({ pathname: e.key });
        this.setState({ selectedKey: e.key });
    }
    handleLoginMenuClick(e) {
        if (e.key == "1") {

        }
        else if (e.key == "9") {
            this.setState({ isLoading: true });
            post("User/LoginOut").done(ticket => {
                console.log("设置新的ticket", ticket);
                this.setState({ isLogin: false, isLoading: false });
            })
        }
    }
    renderMenu() {
        return (<Menu onClick={this.handleLoginMenuClick.bind(this)}>
            <Menu.Item key="1">
                修改密码
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="9">退出</Menu.Item>
        </Menu>)
    }
    renderMenuLeft() {
        return (<Menu
            mode="inline"
            theme="dark" onClick={this.handleMenuClick.bind(this)}
            defaultSelectedKeys={[this.defaultSelectKey]}
            selectedKeys={[this.state.selectedKey]}
            style={{ flex: "1" }}>
            <SubMenu key="sub1" title={<span><Icon type="team" /><span>会员管理</span></span>}>
                <Menu.Item key="/memberList">会员查询</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>活动管理</span></span>}>
                <Menu.Item key="/luckList">抽奖活动</Menu.Item>
                <Menu.Item key="/winningList">中奖人员</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="credit-card" /><span>贵宾票管理</span></span>}>
                <Menu.Item key="/VIPRollList">贵宾票管理</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="setting" /><span>系统管理</span></span>}>
                <Menu.Item key="/userList">用户管理</Menu.Item>
            </SubMenu>
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

                        <div className="mm-layout-name">会员管理系统</div>
                        <div className="mm-layout-loginInfo">
                            <Dropdown overlay={this.renderMenu()} trigger={['click']}>
                                <a className="ant-dropdown-link">
                                    {window.LoginUser.LoginAccount} <Icon type="down" />
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="mm-layout-mid">
                        <div className="mm-layout-mid-content">
                            <div className="mm-layout-menu">
                                {this.renderMenuLeft()}
                            </div>
                            <div className="mm-layout-content">
                                <div className="mm-layout-scroll">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mm-layout-bottom">
                        河南永基文化传播有限公司
                </div>
                </div>)
            }
        }

    }
}
