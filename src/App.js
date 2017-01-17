import React, { Component } from 'react';
import Throbber from './Throbber';
import InputForm from './InputForm';
import RepoList from './RepoList';
import ErrorMsg from './ErrorMsg';
import request from 'superagent';
import './App.css';

class App extends Component {
    constructor() {
        super();

        this.state = {
            isRequestPending: false,
            user: '',
            repos: null,
            errorMessage: null
        };

        this.onGithubSearch = this.onGithubSearch.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.processResponse = this.processResponse.bind(this);
    }

    onInputChange(e) {
        this.setState({user: e.target.value.trim().replace(/\s/g, '')});
    }

    processResponse(err, res) {
        this.setState({
            isRequestPending: false
        });

        if (err) {
            return this.setState({
                repos: null,
                user: '',
                errorMessage: {
                    status: err.status,
                    text: err.message
                }
            });
        }

        let repos = res.body.map(item => ({
            name: item.name,
            url: item.html_url
        }));

        this.setState({
            repos,
            errorMessage: null
        });
    }

    onGithubSearch() {
        if (this.state.isRequestPending) {
            return;
        }

        this.setState({
            isRequestPending: true
        });

        const user = this.state.user;

        if (user === '') {
            return this.setState({
                isRequestPending: false
            });
        }

        request
            .get(`https://api.github.com/users/${encodeURIComponent(user)}/repos`)
            .end(this.processResponse);
    }

    render() {
        return (
            <div className="b-App">
                <div className="b-App__header">
                    <div className="b-App__title">Search GitHub:</div>
                </div>
                <div className="b-App__search">
                    <InputForm value={this.state.user}
                               onChange={this.onInputChange}
                               onSubmit={this.onGithubSearch}
                               isDisabled={this.state.isRequestPending} />
                </div>
                <div className="b-App__result">
                    {this.state.isRequestPending ?
                        <Throbber /> :
                        (this.state.errorMessage ?
                            <ErrorMsg message={this.state.errorMessage.text}
                                      type={this.state.errorMessage.type} /> :
                            <RepoList items={this.state.repos} />)}
                </div>
            </div>
        );
    }
}

export default App;
