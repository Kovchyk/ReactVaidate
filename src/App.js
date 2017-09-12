import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      touched: {
        email: false,
        password: false
      }
    }
  }

  handleBlur = (field) => (e) => {
    this.setState({
      touched: {...this.state.touched, [field]: true}
    });
  }

  validate = (email, password) => {
    return {
      email: email.length === 0,
      password: password.length === 0
    }
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  canBeSubmited = () => {
    let {email, password} = this.state;

    return (email.length > 0 && password.length > 0);
  }

  onButtonClickEnter = (e) => {
    e.preventDefault();
    //let validatedObj = this.validate(this.state.email, this.state.password);
    //let isValid = Object.keys(validatedObj).some(val => validatedObj[val]);

    if (!this.canBeSubmited()) {
      this.setState({
        touched: {...this.state.touched, email: true, password: true}
      });
    } else {
      let resObj = {};
      for (let key in this.state) {
        if (typeof(this.state[key]) !== "object") {
          resObj[key] = this.state[key];
        }
      }
      console.log(resObj);
    }
  
  }

  render() {
    
    let errors = this.validate(this.state.email, this.state.password);

    let shouldMarkError = (field) => {
      let hasError = errors[field];
      let shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };
    
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <form id="loginForm" className="col-md-3 col-sm-4" onSubmit={this.onButtonClickEnter}>
              <div className={"form-group " + (shouldMarkError("email") ? "has-error" : "")}>
                <label htmlFor="email" className="sr-only">Email address:</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  value={this.state.email} 
                  onBlur={this.handleBlur("email")} 
                  onChange={this.handleEmailChange} 
                  placeholder="Email"
                />
              </div>
              <div className={"form-group " + (shouldMarkError("password") ? "has-error" : "")}>
                <label htmlFor="pwd" className="sr-only">Password:</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="pwd" 
                  value={this.state.password} 
                  onBlur={this.handleBlur("password")} 
                  onChange={this.handlePasswordChange} 
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-default">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;