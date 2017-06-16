import React, { Component } from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';
import PropTypes from 'prop-types';
import './messageList.less';
const itemHeight = 180;
export default class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    getDefaultStyles = () => {
        return this.props.messageList.map(todo => {
            return ({
                key: todo.Key,
                data: todo,
                style: { marginTop: 0, opacity: 1, height: itemHeight }
            })
        });
    };
    getStyles = () => {
        return this.props.messageList.map(todo => {
            return ({
                key: todo.Key,
                data: todo,
                style: {
                    marginTop: spring(0, presets.gentle),
                    opacity: spring(1, presets.gentle),
                    height: itemHeight
                }
            })
        });
    }
    willEnter() {
        return {
            marginTop: itemHeight,
            opacity: 0,
            height: itemHeight
        };
    };

    willLeave() {
        return {
            marginTop: spring(-itemHeight),
            opacity: spring(0),
            height: itemHeight
        };
    };
    render() {
        return (<TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}>
            {styles => {
                return (<div>{
                    styles.map(({ data, style }) => {
                        var item = data;
                        return (<div key={item.Key} className="layout-list" style={style} >
                            <div className="head-img">
                                <img className="img" src={item.WXHeadImgUrl + "/132"} />
                            </div>
                            <div className="mid">
                                <div className="title">
                                    {item.WXName}
                                </div>
                                <div className="message">
                                    {item.Message}
                                </div>
                            </div>
                            <div className="time">
                                {item.SendTime}
                            </div>
                        </div>);
                    })
                }
                </div>);
            }
            }
        </TransitionMotion>
        );
    }
}
MessageList.propTypes = {
};

MessageList.defaultProps = {
    messageList: []
};
