import React, { Component } from 'react';
import { render } from 'react-dom'
import routes from './routes'
// 推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import 'conn.js'

render(routes, document.getElementById("react-content"))
import './styles/index.less' 
console.log('开始翻滚吧!!!!')