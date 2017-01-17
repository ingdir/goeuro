import React from 'react';
import Accessibility from './Accessibility';
import {shallow} from 'enzyme';

describe('Accessibility', () => {
    let acc;
    let onUpdate;

    beforeEach(() => {
        onUpdate = jest.fn();
        acc = shallow(<Accessibility onUpdate={onUpdate} />);
    });

    describe('render', () => {
        it('renders 2 buttons', () => {
            expect(acc.find('.b-Accessibility__button').length).toEqual(2);
            expect(acc.find('.b-Accessibility__button').at(0).text()).toEqual('A');
            expect(acc.find('.b-Accessibility__button').at(1).text()).toEqual('A');
        });

        it('renders a button to switch to normal text', () => {
            expect(acc.find('.b-Accessibility__button.b-Accessibility__button--normal').length).toEqual(1);
        });

        it('renders a button to switch to large text', () => {
            expect(acc.find('.b-Accessibility__button.b-Accessibility__button--large').length).toEqual(1);
        });

        it('selects normal button by default', () => {
            expect(acc.find('.b-Accessibility__button--selected.b-Accessibility__button--normal').length).toEqual(1);
            expect(acc.find('.b-Accessibility__button--selected.b-Accessibility__button--large').length).toEqual(0);
        });

        it('responds to props change to large by selecting another button', () => {
            acc.setProps({
                mode: 'large'
            });

            expect(acc.find('.b-Accessibility__button--selected.b-Accessibility__button--normal').length).toEqual(0);
            expect(acc.find('.b-Accessibility__button--selected.b-Accessibility__button--large').length).toEqual(1);
        });

        it('responds to props change to normal by selecting another button', () => {
            acc.setProps({
                mode: 'normal'
            });

            expect(acc.find('.b-Accessibility__button--selected.b-Accessibility__button--normal').length).toEqual(1);
            expect(acc.find('.b-Accessibility__button--selected.b-Accessibility__button--large').length).toEqual(0);
        });
    });

    describe('click actions', () => {
        it('calls onUpdate with "normal" when switching to normal', () => {
            acc.find('.b-Accessibility__button--normal').simulate('click', {});

            expect(onUpdate).toHaveBeenCalledTimes(1);
            expect(onUpdate).toHaveBeenCalledWith('normal');
        });

        it('calls onUpdate with "large" when switching to large', () => {
            acc.find('.b-Accessibility__button--large').simulate('click', {});

            expect(onUpdate).toHaveBeenCalledTimes(1);
            expect(onUpdate).toHaveBeenCalledWith('large');
        });
    });

});
