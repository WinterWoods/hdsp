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
          <div className="message-list">
            <div className="message-one">
              <div className="msg-head">
                <div className="msg-head-panel">
                  <img  className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0"/>
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
                  <img  className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0"/>
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
                  <img  className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0"/>
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
                  <img  className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0"/>
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
                  <img  className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0"/>
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
                  <img  className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0"/>
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
                  <img  className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0"/>
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
                  <img  className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0"/>
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
                  <img  className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0"/>
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
                  <img  className="msg-head-img" src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM7tltmXiceCVHEMjlXwXUUcyZXNNbP64ibIKxdT2c2ibDnQ6uh25ZdeWRuabn770000lBBSRWZjjFiboA/0"/>
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

