import React, { Component } from 'react'
import PropTypes from 'prop-types';
import stores from '../../../utils/stores';
import { Button, Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import './workBench.less';
export default class WorkBench extends Component {
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
        return (<div className="workBench" >
        </div>)
    }

}
WorkBench.propTypes = {
};
