import React from 'react';
import Throbber from './Throbber';
import {shallow} from 'enzyme';

describe('Throbber', () => {
    let throbber;

    beforeEach(() => {
        throbber = shallow(<Throbber />);
    });

    describe('render', () => {
        it('renders text', () => {
            expect(throbber.text()).toEqual('searching...');
        });
    });

});
