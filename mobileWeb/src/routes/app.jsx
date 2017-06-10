import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';


import './app.less';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'app',
      open: false,
    };
  }
  render() {
    // console.log(this.props.route, this.props.params, this.props.routeParams);
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
