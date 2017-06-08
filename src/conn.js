import { message } from 'antd';
import moment from 'moment';
import Moment from 'moment';
import { hashHistory } from 'react-router'
import axios from 'axios';

axios.defaults.baseURL = 'api/';
sessionStorage.ticket?axios.defaults.headers.common['ticket'] = sessionStorage.ticket:null;
