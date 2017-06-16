// // Proxy created on the fly
import { NoticeBar } from 'antd-mobile'

var hubList = [{
  name: 'msgManager',
  Fun: [
    'messageList'
    , 'getUserForCode' //获取微信信息
    , 'getAuthUrl' //获取授权跳转地址
    , 'getOrgInfo' //获取大屏的信息
    , 'sendMessage' //发送消息
  ]
}]
var hubClientList = [
  "exceptionHandler"
  , "sendMsg"
]

// 注册所有异常助理
function errShow(msg) {

}
window.startSignal = function (okCallBack, errCallBack, stateChangedCallBack, disconnectedCallBack) {
  try {
    window.messageServiceConn = $.hubConnection()
    console.log('准备装载事件')
    window.servcieHub = {}
    $.each(hubList, function (i, v) {
      var proxy = window.messageServiceConn.createHubProxy(v.name)
      proxy.ClientType = 'HubNonAutoProxy';
      window.servcieHub[v.name] = proxy;
      // 注册服务端事件
      console.log('装载服务端事件')
      $.each(v.Fun, function (ii, values) {
        console.log('装载服务端事件', window.servcieHub[v.name], values)
        window.servcieHub[v.name][values] = function () {
          console.log(values)
          return window.servcieHub[v.name].invoke(values, ...arguments)
        }
      })
    })
    // 注册回调本地事件
    console.log('装载监听事件')
    window.clientHub = window.messageServiceConn.createHubProxy('clientManager');
    window.clientHub.ClientType = 'HubNonAutoProxy';
    $.each(hubClientList, function (i, value) {
      window.clientHub.on(value, function () {
        console.log(value + ':', arguments)
        if (window.clientHub[value]) {
          window.clientHub[value](...arguments);
        } else {
          console.log('没有注册' + value + '事件')
        }
      })
    })
    console.log(window.clientHub.exceptionHandler)

    window.messageServiceConn.stateChanged(function (change) {
      console.log('object')
      if (change.newState == 2) {
        window.messageTimerConn = setInterval(function () {
          Toast.info('正在努力连接到服务器...', 1)
        }, 3000)
      } else {
        if (change.newState == 1 && change.oldState == 2) {
          Toast.success('连接成功啦!!!', 1)
        }
        if (window.messageTimerConn) {
          clearInterval(window.messageTimerConn)
          window.messageTimerConn == null
        }
      }
      stateChangedCallBack ? stateChangedCallBack(change) : null
    })
    window.messageServiceConn.disconnected(function (error) {
      Toast.offline('网络连接失败!!!', 1)
      disconnectedCallBack ? disconnectedCallBack(error) : null
    })
    window.messageServiceConn.start({ xdomain: true }).done(okCallBack).fail(errCallBack)
  } catch (e) {
    console.log('出现异常', e)
  }
}
