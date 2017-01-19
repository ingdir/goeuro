import React from 'react';
import './Accessibility.css';
import classNames from 'classnames';

const Accessibility = ({mode, onUpdate}) => {
    mode = mode === 'large' ? 'large' : 'normal';

    const normalClassName = classNames(
        'b-Accessibility__button',
        'b-Accessibility__button--normal',
        {
            'b-Accessibility__button--selected': mode === 'normal'
        }
    );

    const largeClassName = classNames(
        'b-Accessibility__button',
        'b-Accessibility__button--large',
        {
            'b-Accessibility__button--selected': mode === 'large'
        }
    );

    return (<div role="form" className="b-Accessibility">
        <button
            aria-label="Switch to normal text"
            className={normalClassName} onClick={() => onUpdate('normal')}>A</button>
        <button
            aria-label="Switch to large text"
            className={largeClassName} onClick={() => onUpdate('large')}>A</button>
    </div>);
};

export default Accessibility;