import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './login.less';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formData:{
                LoginAccount:"",
                password:"",
                checkCode:""
             }
        }
    }
    clickHandle() {
        this.props.checkLogin(this.state.formData);
    }

    LoginAccountChange(e) {
        var data = this.state.formData;
        data.LoginAccount = e.target.value;
        this.setState({ formData: data });
    }

     PasswordChange(e) {
        var data = this.state.formData;
        data.password = e.target.value;
        this.setState({ formData: data });
    }

    CheckCodeChange(e) {
        var data = this.state.formData;
        data.checkCode = e.target.value;
        this.setState({ formData: data });
    }

    render() {
        //<div className="mm-login-input">
                  //  <input type="text" placeholder="验证码" onChange={this.CheckCodeChange.bind(this)}  className="login_txtbx" />
                   // <img src="http://qzo.galasystrip.com/Home/CheckCode?ID=11" />
                //</div>
        return (<div className="mm-login-main">
            <div className="mm-login-content">
                <div className="mm-login-logo">

                </div>
                <div className="mm-login-input">
                    <input type="text" placeholder="账号" onChange={this.LoginAccountChange.bind(this)} className="login_txtbx" />
                </div>
                <div className="mm-login-input">
                    <input type="password" placeholder="密码"  onChange={this.PasswordChange.bind(this)}  className="login_txtbx" />
                </div>
                <div className="mm-login-input">
                    <input type="button" onClick={this.clickHandle.bind(this)} value="立即登陆" className="submit_btn" />
                </div>
            </div>
        </div>);
    }
}
Login.propTypes = {

};
Login.defaultProps = {
    checkLogin:function () { 

    }
};
