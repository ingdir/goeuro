import React, {Component} from 'react';
import './Accessibility.css';

class Accessibility extends Component {
    render() {
        const mode = this.props.mode === 'large' ? 'large' : 'normal';

        const normalClassName = 'b-Accessibility__button b-Accessibility__button--normal ' +
            (mode === 'normal' ? 'b-Accessibility__button--selected' : '');
        const largeClassName = 'b-Accessibility__button b-Accessibility__button--large ' +
            (mode === 'large' ? 'b-Accessibility__button--selected' : '');

        return (<div role="form" className="b-Accessibility">
            <button
                aria-label="Switch to normal text"
                className={normalClassName} onClick={() => this.props.onUpdate('normal')}>A</button>
            <button
                aria-label="Switch to large text"
                className={largeClassName} onClick={() => this.props.onUpdate('large')}>A</button>
        </div>);
    }
}

export default Accessibility;