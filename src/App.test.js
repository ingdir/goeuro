import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import App from './App';
import {shallow} from 'enzyme';

describe('App', () => {
    let app;

    beforeEach(() => app = shallow(<App />));

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

    describe('render', () => {
        it('renders b-App__header', () => {
            expect(app.find('.b-App__header').length).toEqual(1);
        });

        it('renders b-App__search', () => {
            expect(app.find('.b-App__search').length).toEqual(1);
        });

        it('renders b-App__result', () => {
            expect(app.find('.b-App__result').length).toEqual(1);
        });

    });

    describe('accessibility modifiers', () => {
        it('does not set accessibility modifier by default', () => {
            expect(app.hasClass('b-App--large')).toEqual(false);
        });

        it('set accessibility modifier', () => {
            app.instance().updateAccessibilityMode('large');

            expect(app.hasClass('b-App--large')).toEqual(true);
        });

        it('removes accessibility modifier again', () => {
            app.instance().updateAccessibilityMode('large');
            app.instance().updateAccessibilityMode('normal');

            expect(app.hasClass('b-App--large')).toEqual(false);
        });
    });

    describe('controlling search input', () => {
        it('sets state.user with a post-processed value', () => {
            let input = 'test123';
            var appInstance = app.instance();

            appInstance.onInputChange({target: {value: input}});

            expect(appInstance.state.user).toEqual(input);

            appInstance.onInputChange({target: {value: '   ' + input + ' '}});

            expect(appInstance.state.user).toEqual(input);

            appInstance.onInputChange({target: {value: input.substr(0, 1) + ' ' + input.substr(1)}});

            expect(appInstance.state.user).toEqual(input);
        });
    });

    describe('processing github api response', () => {
        it('responds to an error', () => {
            var appInstance = app.instance();
            appInstance.setState({
                user: 'bla',
                isRequestPending: false
            });

            let fixture = {
                body: [
                    {
                        name: 'abc',
                        html_url: 'http://github.com/xxx/abc'
                    },
                    {
                        name: 'def',
                        html_url: 'http://github.com/xxx/def'
                    },
                ]
            };

            let err = {
                status: '404',
                message: 'Not found'
            };

            request.get = jest.fn(() => ({
                end: (fn) => fn(err, fixture)
            }));

            appInstance.onGithubSearch();

            expect(request.get).toHaveBeenCalledWith('https://api.github.com/users/bla/repos');
            expect(appInstance.state.repos).toEqual(null);
            expect(appInstance.state.user).toEqual('');
            expect(appInstance.state.errorMessage).toEqual({
                status: err.status,
                text: err.message
            });
        });

        it('responds to api data', () => {
            var appInstance = app.instance();
            appInstance.setState({
                user: 'bla',
                isRequestPending: false
            });

            let fixture = {
                body: [
                    {
                        name: 'abc',
                        html_url: 'http://github.com/xxx/abc'
                    },
                    {
                        name: 'def',
                        html_url: 'http://github.com/xxx/def'
                    },
                ]
            };

            request.get = jest.fn(() => ({
                end: (fn) => fn(null, fixture)
            }));

            appInstance.onGithubSearch();

            expect(request.get).toHaveBeenCalledWith('https://api.github.com/users/bla/repos');
            expect(appInstance.state.repos.length).toEqual(fixture.body.length);
            expect(appInstance.state.user).toEqual('bla');
            expect(appInstance.state.errorMessage).toEqual(null);
        });
    });
});
