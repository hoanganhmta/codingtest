import React, { Component } from 'react';
import Input from './component/input';
import axios from 'axios';
import './index.css';

class App extends Component {
  state = {
    mobile: '',
    firstName: '',
    lastName: '',
    date: 0,
    month: 0,
    year: 0,
    gender: '',
    mail: '',
    serverError: '',
    disabled: false,
  }

  resetState() {
    this.setState({
      mobile: '',
      firstName: '',
      lastName: '',
      date: 0,
      month: 0,
      year: 0,
      gender: '',
      mail: '',
      serverError: '',
      disabled: false,
    })
  }

  changeSelect = (e, field) => {
    this.setState({ [field]: e.target.value })
  }

  renderMonthDropdown() {
    const { disabled } = this.state
    const months = [];
    for (let i = 0; i < 13; i++) {
      months.push(i);
    }
    let makeOption = function (item) {
      if (item === 0) {
        return <option key={item} value={item} disabled={true}>Month</option>
      }
      return <option key={item} value={item} >{item}</option>;
    };
    return <select defaultValue="0" disabled={disabled} onChange={(e) => this.changeSelect(e, 'month')}>{months.map(makeOption)}</select>
  }

  renderDate() {
    const { disabled } = this.state
    const days = [];
    for (let i = 0; i < 32; i++) {
      days.push(i);
    }
    let makeOption = function (item) {
      if (item === 0) {
        return <option key={item} value={item} disabled={true}>Date</option>
      }
      return <option key={item} value={item} >{item}</option>;
    };
    return <select defaultValue="0" disabled={disabled} onChange={(e) => this.changeSelect(e, 'date')}>{days.map(makeOption)}</select>
  }

  renderYear() {
    const { disabled } = this.state
    const years = [];
    years.push(0);
    for (let i = 2019; i > 1965; i--) {
      years.push(i);
    }
    let makeOption = function (item) {
      if (item === 0) {
        return <option key={item} value={item} disabled={true}>Year</option>
      }
      return <option key={item} value={item} >{item}</option>;
    };
    return <select defaultValue="0" disabled={disabled} onChange={(e) => this.changeSelect(e, 'year')}>{years.map(makeOption)}</select>
  }

  changeMobile = (mobile) => {
    this.setState({ mobile });
  }

  changeFirstName = (firstName) => {
    this.setState({ firstName });
  }

  changeLastName = (lastName) => {
    this.setState({ lastName });
  }

  changeMail = (mail) => {
    this.setState({ mail });
  }

  setGender(event) {
    this.setState({ gender: event.target.value })
  }

  handleRegister() {
    const { firstName, lastName, mail, mobile } = this.state
    if (firstName.length === 0 || lastName.length === 0 || mail.length === 0 || mobile.length === 0) {
      return;
    } else {
      const emp = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        mobile: this.state.mobile,
        gender: this.state.gender,
        mail: this.state.mail,
        birthDay: `${this.state.date}/${this.state.month}/${this.state.year}`,
      }

      const config = {

        responseType: 'json'
      };
      axios.post('/create', emp, config)
        .then((response) => {
          if (response.status === 200) {
            this.resetState();
            this.setState({ disabled: true })
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error, 'error');
            this.setState({ serverError: error.response.data.errorMessage })
          }
        });
    }
  }


  render() {
    console.log(this.state)
    const { firstName, lastName, mobile, gender, mail, date, month, year, disabled } = this.state
    return (
      <div className="content">
        <div className="title">Registration</div>
        <div className="error-server">{this.state.serverError}</div>
        <Input field="Mobile Number" type="number" onChange={this.changeMobile} value={mobile} disabled={disabled} />
        <Input field="First Name" type="text" onChange={this.changeFirstName} value={firstName} disabled={disabled} />
        <Input field="Last Name" type="text" onChange={this.changeLastName} value={lastName} disabled={disabled} />
        <div>
          <div className="date">Date of Birth</div>
          <div className="drop-down">
            {this.renderMonthDropdown()}
            {this.renderDate()}
            {this.renderYear()}
          </div>
          <div className="gender" onChange={this.setGender.bind(this)}>
            <input type="radio" value="0" name="gender" defaultChecked disabled={disabled} /> Male
            <input type="radio" value="1" name="gender" disabled={disabled} /> Female
          </div>
          <Input field="Email" type="text" onChange={this.changeMail} value={mail} disabled={disabled} />
          <button
            onClick={this.handleRegister.bind(this)}
            disabled={disabled}
            className="register-btn"
          >
            Register
          </button>
          <button
            // onClick={this.handleRegister.bind(this)}
            className="register-btn"
          > 
            Login
          </button>
        </div>
      </div>
    )
  }
}

export default App;
