import React, {Component} from 'react';
import './InputForm.css';

class InputForm extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.searchInput.focus();
    }

    onChange(e) {
        this.props.onChange(e);
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.onSubmit();
    }

    render() {
        return (
            <form className="b-InputForm" onSubmit={this.onSubmit}>
                <input className="b-InputForm__user" placeholder="Search Github users"
                       ref={el => this.searchInput = el}
                       type="text"
                       disabled={this.props.isDisabled}
                       value={this.props.value}
                       onChange={this.onChange} />
                <button className="b-InputForm__submit">FIND</button>
            </form>
        );
    }
}

export default InputForm;