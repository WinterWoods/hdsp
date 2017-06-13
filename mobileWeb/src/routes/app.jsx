import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import { Toast } from 'antd-mobile';

import './app.less';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'app',
      open: false
    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    startSignal(this.okCallBack.bind(this), this.errCallBack, this.stateChangeCallBack, this.disconnectedCallBack);
  }
  okCallBack() {
    Toast.info('连接成功...', 1);
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
  render() {
    return (
      <div className="container">
        {this.props && this.props.children && React.cloneElement(this.props.children, {
          changeTitle: title => this.setState({ title })
        }) || <div />}
      </div>
    );
  }
}

App.propTypes = {
};

App.defaultProps = {
};
