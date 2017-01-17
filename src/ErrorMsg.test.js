import React from 'react';
import ErrorMsg from './ErrorMsg';
import {shallow} from 'enzyme';

describe('ErrorMsg', () => {
    let msg;

    beforeEach(() => msg = shallow(<ErrorMsg status="401" message="hello"/>));

    describe('render', () => {
        it('renders text', () => {
            expect(msg.text()).toEqual('HTTP Status: 401hello');
        });
    });
});
