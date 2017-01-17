import React from 'react';
import InputForm from './InputForm';
import {shallow} from 'enzyme';

describe('InputForm', () => {
    let form;
    let onChange;
    let onSubmit;

    beforeEach(() => {
        onChange = jest.fn();
        onSubmit = jest.fn();

        form = shallow(<InputForm
            onChange={onChange}
            onSubmit={onSubmit}
        />);
    });

    describe('render', () => {
        it('renders b-InputForm__user', () => {
            expect(form.find('input.b-InputForm__user').length).toEqual(1);
            expect(form.find('input.b-InputForm__user').prop('placeholder')).toEqual('Search Github users');
        });

        it('renders b-InputForm__submit', () => {
            expect(form.find('.b-InputForm__submit').length).toEqual(1);
            expect(form.find('.b-InputForm__submit').text()).toEqual('FIND');
            expect(form.find('.b-InputForm__submit').prop('type')).toEqual('submit');
        });
    });

    describe('onChange', () => {
        it('calls props.onChange', () => {
            let mockEvent = {answer: 42};

            form.find('input.b-InputForm__user').simulate('change', mockEvent);

            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledWith(mockEvent);
        });
    });

    describe('onSubmit', () => {
        it('calls props.onSubmit', () => {
            let mockEvent = {preventDefault: jest.fn()};

            form.simulate('submit', mockEvent);

            expect(onSubmit).toHaveBeenCalledTimes(1);
        });

        it('prevents default event', () => {
            let mockEvent = {preventDefault: jest.fn()};

            form.simulate('submit', mockEvent);

            expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
        });
    });
});
