import React, {Component} from 'react';
import './ErrorMsg.css';

class ErrorMsg extends Component {
    render() {
        return (
            <div className="b-ErrorMsg">HTTP Status: {this.props.status}<br/>{this.props.message}</div>
        );
    }
}

export default ErrorMsg;