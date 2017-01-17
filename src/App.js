import React, { Component } from 'react';
import Throbber from './Throbber';
import InputForm from './InputForm';
import RepoList from './RepoList';
import ErrorMsg from './ErrorMsg';
import Accessibility from './Accessibility';
import request from 'superagent';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRequestPending: false,
            user: '',
            repos: null,
            errorMessage: null,
            accMode: 'normal'
        };

        this.onGithubSearch = this.onGithubSearch.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.processResponse = this.processResponse.bind(this);
        this.updateAccessibilityMode = this.updateAccessibilityMode.bind(this);
    }

    onInputChange(e) {
        this.setState({user: e.target.value.trim().replace(/\s/g, '')});
    }

    updateAccessibilityMode(accMode) {
        this.setState({
            accMode
        })
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

        const repos = res.body.map(item => ({
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
        const appClassName = 'b-App ' + (this.state.accMode === 'large' ? 'b-App--large' : '');
        return (
            <div className={appClassName}>
                <Accessibility mode={this.state.accMode}
                               onUpdate={this.updateAccessibilityMode}/>
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
                                      status={this.state.errorMessage.status} /> :
                            <RepoList items={this.state.repos} />)}
                </div>
            </div>
        );
    }
}

export default App;
