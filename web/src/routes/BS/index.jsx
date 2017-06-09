import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './index.less';
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false
    };
  }
  menuClick() {
    this.setState({ menuVisible: !this.state.menuVisible });
    
  }
  render() {
    return (<div className="root-context">
      {!this.state.menuVisible?this.props.children:<div/>}
      <div className="menu-button" onClick={this.menuClick.bind(this)}>菜单按钮</div>
      <div className={this.state.menuVisible ? "menu-panel-bg menu-panel-bg-show" : "menu-panel-bg"}>
        <div className="menu-panel-other"></div>
        <div className= "menu-panel">
          <div className="menu-row">
            <div className="menu-one">

            </div>
            <div className="menu-one">

            </div>
            <div className="menu-one">

            </div>
            <div className="menu-one">

            </div>
          </div>
          <div className="menu-row">
            <div className="menu-one">

            </div>
            <div className="menu-one">

            </div>
          </div>
        </div>
        <div className="menu-panel-other"></div>
      </div>
    </div>);
  }
}

Main.propTypes = {
};

Main.defaultProps = {
};
