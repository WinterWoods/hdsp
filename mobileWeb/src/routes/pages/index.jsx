import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { hashHistory, Link } from 'react-router';
import { Icon, Toast, Button, Grid } from 'antd-mobile';

import './index.less';
import bp from '../../assets/images/bp.png'
import xp from '../../assets/images/xp.png'
import yyy from '../../assets/images/yyy.png'
import tp from '../../assets/images/tp.png'
import fj from '../../assets/images/fj.png'
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.gridData = [{
      icon: xp,
      text: '照片',
    },
    {
      icon: bp,
      text: '霸屏',
    },
    {
      icon: yyy,
      text: '摇一摇',
    },
    {
      icon: fj,
      text: '打飞机',
    },
    {
      icon: tp,
      text: '投票',
    }];
    this.gridFaceData = [
      { icon: xp },
      { icon: xp },
      { icon: xp },
      { icon: xp },
      { icon: xp },
      { icon: xp },{ icon: xp },
      { icon: xp },
      { icon: xp },
      { icon: xp },
      { icon: xp },
      { icon: xp },{ icon: xp },
      { icon: xp },
      { icon: xp },
      { icon: xp },
      { icon: xp },
      { icon: xp },{ icon: xp },
      { icon: xp },
      { icon: xp },
      { icon: xp },
      { icon: xp },
      { icon: xp },{ icon: xp },
      { icon: xp },
      { icon: xp },
      { icon: xp },
    ];
    this.state = {
      inputMessage: "",
      plusPanelShow: false,
      faceOrOther: false,
      plusBtnOrSendBtn: false,
      messageList: [],
      gridData: this.gridData,
      gridFaceData: this.gridFaceData
    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    servcieHub.msgManager.messageList().done(result => {
      this.setState({ messageList: result });
    })

  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.msg, this.props.msg);
    if (nextProps.msg != this.props.msg) {
      if (this.state.messageList.length > 20)
        this.state.messageList.splice(0, 1)
      this.state.messageList.push(nextProps.msg);
      this.setState({ messageList: this.state.messageList })
    }
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
  openFacePanel() {
    Toast.info('发送照片的按钮被点击了', 1);
    setTimeout(() => {
      this.setState({ plusPanelShow: true, faceOrOther: false });
    }, 150);
  }
  openPlusPanel() {
    Toast.info('发送照片的按钮被点击了', 1);
    setTimeout(() => {
      this.setState({ plusPanelShow: true, faceOrOther: true });
    }, 150);

  }
  inputHandleClick() {
    this.setState({ plusPanelShow: false })
  }
  hidePlusPanel() {
    this.setState({ plusPanelShow: false })
  }
  sendMessage() {
    console.log(window.servcieHub.msgManager);
    servcieHub.msgManager.sendMessage(this.state.inputMessage, "1", "").done(result => {
      this.setState({ inputMessage: "", plusBtnOrSendBtn: false });
    }).fail(() => {
      Toast.info(this.state.inputMessage, 1);
    });
  }
  componentDidUpdate() {
    this.refs.messagelist.scrollTop = this.refs.messagelist.scrollHeight;
  }
  renderMsgList() {
    return this.state.messageList.map((item, index) => {
      var ismyMsg = false;
      if (item.User_Key == window.UserInfo.Key) {
        ismyMsg = true;
      }
      return (<div key={item.Key} className={ismyMsg ? "message-one message-one-my" : "message-one"}>
        <div className="msg-head">
          <div className="msg-head-panel">
            <img className="msg-head-img" src={item.WXHeadImgUrl + "/132"} />
          </div>
        </div>
        <div className="msg-content">
          <div className="msg-content-top">
            <div className="msg-content-name">{item.WXName}</div>
            <div className="msg-content-time">{item.SendTime}</div>
          </div>
          <div className="msg-content-border">
            {ismyMsg ? <div className="msg-opt">删除</div> : ""}
            <div className="msg-content-panel">
              <div className="msg-content-str">{item.Message}</div>
            </div>
            <div className="msg-content-sjx">
              <div className="msg-content-sjx-bg"></div>
            </div>

          </div>
        </div>

      </div>);
    });
  }
  render() {
    return (
      <div className="wall-list">
        <div className="top">
          {window.OrgInfo.OrgName}
        </div>
        <div className="content" onTouchEnd={this.hidePlusPanel.bind(this)}>
          <div ref="messagelist" className="message-list">
            {this.renderMsgList()}
          </div>
        </div>
        <div className="buttom">
          <div className="buttom-left">
            <a onTouchEnd={this.openFacePanel.bind(this)}><Icon type={require('../../assets/fonts/emoji.svg')} /></a>
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
          {this.state.faceOrOther ?
            <Grid data={this.state.gridData} columnNum={5} onClick={(_el, index) => alert(index)} /> :
            <Grid data={this.state.gridFaceData} columnNum={7} onClick={(_el, index) => alert(index)} />
          }
        </div>
      </div>
    );
  }
}

