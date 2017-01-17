import React from 'react';
import RepoList from './RepoList';
import {shallow} from 'enzyme';

describe('RepoList', () => {
    let list;
    const reposFixture = {
        items: [
            {
                url: 'http://github.com/user/1',
                name: '1'
            },
            {
                url: 'http://github.com/user/2',
                name: '2'
            },
        ]
    };

    beforeEach(() => {
        list = shallow(<RepoList />);
    });

    describe('render', () => {
        describe('header', () => {
            it('renders header', () => {
                expect(list.find('.b-RepoList__header').length).toEqual(1);
            });

            it('renders num of items', () => {
                list.setProps(reposFixture);

                expect(list.find('.b-RepoList__header').text()).toEqual('2 items found');
            });

            it('considers plural vs singular', () => {
                list.setProps({
                    items: [].concat(reposFixture.items[0])
                });

                expect(list.find('.b-RepoList__header').text()).toEqual('1 item found');
            });

            it('renders nothing when no items', () => {
                list.setProps({
                    items: null
                });

                expect(list.find('.b-RepoList__header').text()).toEqual('');
            });
        });

        describe('items', () => {
            it('renders b-RepoList__item for each repo', () => {
                list.setProps(reposFixture);

                list.find('.b-RepoList__item').forEach((item, i) => {
                    expect(item.text()).toEqual(reposFixture.items[i].name);
                });
            });

            it('renders b-RepoList__link for each repo', () => {
                list.setProps(reposFixture);

                list.find('.b-RepoList__link').forEach((item, i) => {
                    expect(item.prop('href')).toEqual(reposFixture.items[i].url);
                    expect(item.prop('target')).toEqual('_blank');
                });
            });

        });
    });
});
