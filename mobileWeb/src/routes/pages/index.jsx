import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { hashHistory, Link } from 'react-router';
import { Icon, Toast, Button } from 'antd-mobile';

import './index.less'
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMessage: "",
      plusPanelShow: false,
      plusBtnOrSendBtn: false
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
  inputHandleChange(e) {
    console.log(e.target.value, e.target.value.length);
    if (e.target.value.length > 0) {
      this.setState({ inputMessage: e.target.value, plusBtnOrSendBtn: true })
    }
    else {
      this.setState({ inputMessage: e.target.value, plusBtnOrSendBtn: false })
    }

  }
  openPlusPanel() {
    Toast.info('发送照片的按钮被点击了', 1);
    setTimeout(() => {
      this.setState({ plusPanelShow: true });
    }, 150);

  }
  inputHandleClick() {
    this.setState({ plusPanelShow: false })
  }
  hidePlusPanel() {
    this.setState({ plusPanelShow: false })
  }
  sendMessage() {

  }
  render() {
    return (
      <div className="wall-list">
        <div className="top">
          欢迎光临xxx
        </div>
        <div className="content" onTouchEnd={this.hidePlusPanel.bind(this)}>
          <div className="message-list">
            <div className="message-one">
              <div className="msg-head">
                <div className="msg-head-panel">
                  <img className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0" />
                </div>
              </div>
              <div className="msg-content">
                <div className="msg-content-top">
                  <div className="msg-content-name">张三</div>
                  <div className="msg-content-time">时间</div>
                </div>
                <div className="msg-content-border">
                  <div className="msg-content-panel">
                    <div className="msg-content-str">测试消息测试消息测试消息测试消啊水电费水电费是水电费</div>
                  </div>
                  <div className="msg-content-sjx">
                    <div className="msg-content-sjx-bg"></div>
                  </div>
                </div>
              </div>
            </div>


            <div className="message-one">
              <div className="msg-head">
                <div className="msg-head-panel">
                  <img className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0" />
                </div>
              </div>
              <div className="msg-content">
                <div className="msg-content-top">
                  <div className="msg-content-name">张三</div>
                  <div className="msg-content-time">时间</div>
                </div>
                <div className="msg-content-border">
                  <div className="msg-content-panel">
                    <div className="msg-content-str">测试消息测试消息测试消息测试消啊水电费水电费是水电费</div>
                  </div>
                  <div className="msg-content-sjx">
                    <div className="msg-content-sjx-bg"></div>
                  </div>
                </div>
              </div>
            </div>


            <div className="message-one message-one-my">
              <div className="msg-head">
                <div className="msg-head-panel">
                  <img className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0" />
                </div>
              </div>
              <div className="msg-content">
                <div className="msg-content-top">
                  <div className="msg-content-name">张三</div>
                  <div className="msg-content-time">时间</div>
                </div>
                <div className="msg-content-border">
                  <div className="msg-content-panel">
                    <div className="msg-content-str">测试消息测试消息测试消息测试消啊水电费水电费是水电费</div>
                  </div>
                  <div className="msg-content-sjx">
                    <div className="msg-content-sjx-bg"></div>
                  </div>
                </div>
              </div>
              <div className="msg-opt">删除</div>
            </div>


            <div className="message-one message-one-my">
              <div className="msg-head">
                <div className="msg-head-panel">
                  <img className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0" />
                </div>
              </div>
              <div className="msg-content">
                <div className="msg-content-top">
                  <div className="msg-content-name">张三</div>
                  <div className="msg-content-time">时间</div>
                </div>
                <div className="msg-content-border">
                  <div className="msg-content-panel">
                    <div className="msg-content-str">测试消息</div>
                  </div>
                  <div className="msg-content-sjx">
                    <div className="msg-content-sjx-bg"></div>
                  </div>
                </div>
              </div>
              <div className="msg-opt">删除</div>
            </div>

            <div className="message-one message-one-my">
              <div className="msg-head">
                <div className="msg-head-panel">
                  <img className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0" />
                </div>
              </div>
              <div className="msg-content">
                <div className="msg-content-top">
                  <div className="msg-content-name">张三</div>
                  <div className="msg-content-time">时间</div>
                </div>
                <div className="msg-content-border">
                  <div className="msg-content-panel">
                    <div className="msg-content-str">测试消息</div>
                  </div>
                  <div className="msg-content-sjx">
                    <div className="msg-content-sjx-bg"></div>
                  </div>
                </div>
              </div>
              <div className="msg-opt">删除</div>
            </div>

            <div className="message-one message-one-my">
              <div className="msg-head">
                <div className="msg-head-panel">
                  <img className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0" />
                </div>
              </div>
              <div className="msg-content">
                <div className="msg-content-top">
                  <div className="msg-content-name">张三</div>
                  <div className="msg-content-time">时间</div>
                </div>
                <div className="msg-content-border">
                  <div className="msg-content-panel">
                    <div className="msg-content-str">测试消息</div>
                  </div>
                  <div className="msg-content-sjx">
                    <div className="msg-content-sjx-bg"></div>
                  </div>
                </div>
              </div>
              <div className="msg-opt">删除</div>
            </div>

            <div className="message-one message-one-my">
              <div className="msg-head">
                <div className="msg-head-panel">
                  <img className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0" />
                </div>
              </div>
              <div className="msg-content">
                <div className="msg-content-top">
                  <div className="msg-content-name">张三</div>
                  <div className="msg-content-time">时间</div>
                </div>
                <div className="msg-content-border">
                  <div className="msg-content-panel">
                    <div className="msg-content-str">测试消息</div>
                  </div>
                  <div className="msg-content-sjx">
                    <div className="msg-content-sjx-bg"></div>
                  </div>
                </div>
              </div>
              <div className="msg-opt">删除</div>
            </div>

            <div className="message-one message-one-my">
              <div className="msg-head">
                <div className="msg-head-panel">
                  <img className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0" />
                </div>
              </div>
              <div className="msg-content">
                <div className="msg-content-top">
                  <div className="msg-content-name">张三</div>
                  <div className="msg-content-time">时间</div>
                </div>
                <div className="msg-content-border">
                  <div className="msg-content-panel">
                    <div className="msg-content-str">测试消息</div>
                  </div>
                  <div className="msg-content-sjx">
                    <div className="msg-content-sjx-bg"></div>
                  </div>
                </div>
              </div>
              <div className="msg-opt">删除</div>
            </div>

            <div className="message-one message-one-my">
              <div className="msg-head">
                <div className="msg-head-panel">
                  <img className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0" />
                </div>
              </div>
              <div className="msg-content">
                <div className="msg-content-top">
                  <div className="msg-content-name">张三</div>
                  <div className="msg-content-time">时间</div>
                </div>
                <div className="msg-content-border">
                  <div className="msg-content-panel">
                    <div className="msg-content-str">测试消息</div>
                  </div>
                  <div className="msg-content-sjx">
                    <div className="msg-content-sjx-bg"></div>
                  </div>
                </div>
              </div>
              <div className="msg-opt">删除</div>
            </div>

            <div className="message-one message-one-my">
              <div className="msg-head">
                <div className="msg-head-panel">
                  <img className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0" />
                </div>
              </div>
              <div className="msg-content">
                <div className="msg-content-top">
                  <div className="msg-content-name">张三</div>
                  <div className="msg-content-time">时间</div>
                </div>
                <div className="msg-content-border">
                  <div className="msg-content-panel">
                    <div className="msg-content-str">测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息</div>
                  </div>
                  <div className="msg-content-sjx">
                    <div className="msg-content-sjx-bg"></div>
                  </div>
                </div>
              </div>
              <div className="msg-opt">删除</div>
            </div>

          </div>
        </div>
        <div className="buttom">
          <div className="buttom-left">
            <Icon type={require('../../assets/fonts/emoji.svg')} />
          </div>
          <div className="buttom-input">
            <input className="msg-input" value={this.state.inputMessage} onTouchEnd={this.inputHandleClick.bind(this)} onChange={this.inputHandleChange.bind(this)} />
          </div>
          <div className="buttom-send">
            {this.state.plusBtnOrSendBtn ? <Button onTouchEnd={this.sendMessage.bind(this)} size="small" className="btn" type="primary">发送</Button> :
              <a onTouchEnd={this.openPlusPanel.bind(this)}><Icon type={require('../../assets/fonts/addition.svg')} /></a>}

          </div>
        </div>
        <div className={this.state.plusPanelShow ? "plusPanel plusPanelShow" : "plusPanel"}>
          表情或者其他的控件
        </div>
      </div>
    );
  }
}

