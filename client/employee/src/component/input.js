import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowError : true
        }
    }

    changeInput = (e) => {
        const text = e.target.value;
        this.setState({isShowError:text.length === 0})
        const {onChange} = this.props
        onChange(text)
    }

    render() {
        const {field, type, value, disabled} = this.props
        const {isShowError} = this.state
        return (
            <div>
                <input className="input-text" type={type} value={value} placeholder={field} onChange={this.changeInput} disabled={disabled}/><br></br>
                {isShowError && <label className='error'>`(*) {field} is required`</label>}
            </div>
        )
    }
}

export default (Input);