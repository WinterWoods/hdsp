import React, { Component } from 'react'
import PropTypes from 'prop-types';
import stores from '../../../utils/stores';
import { Button } from 'antd';
import './test.less';
export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

    }
    componentWillUnmount() {

    }
    handleClick = () => {
        stores.states.testStr = "我就是测试一下";
        stores.dispatch()
    }
    render() {
        return (<div className="test" ><h1>{this.props.stores.testStr}</h1><Button type="primary" onClick={this.handleClick}>Primary</Button>
           
        </div>)
    }

}
Test.propTypes = {
};
