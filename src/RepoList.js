import React, {Component} from 'react';
import './RepoList.css';

class RepoList extends Component {
    render() {
        let content;
        let howManyFound;

        if (!this.props.items) {
            howManyFound = null;
        } else {
            howManyFound = this.props.items.length + (this.props.items.length === 1 ? ' item found' : ' items found');
        }

        if (!this.props.items || this.props.items.length === 0) {
            content = null;
        } else {
            content = this.props.items
                .map(item => <div className="b-RepoList__item" key={item.url}>
                    <a className="b-RepoList__link"
                       href={item.url}
                       target="_blank">{item.name}</a>
                </div>);
        }

        return (<div className="b-RepoList">
            <div className="b-RepoList__header">{howManyFound}</div>
            {content}
        </div>);
    }
}

export default RepoList;