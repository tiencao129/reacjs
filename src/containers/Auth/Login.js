import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

//import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import "./Login.scss";
//import { userService } from "../../services";
import { handleLoginApi } from "../../services/userService";



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
    };
  }

  handleOnchangeInput = (event) => {
    if (event.target.id === "username") {
      this.setState({
        username: event.target.value,
      });
    }

    if (event.target.id === "password") {
      this.setState({
        password: event.target.value,
      });
    }
  };
  handleLogin = async () => {
    console.log("user:", this.state.username, "pass:", this.state.password);
    console.log("all", this.state);
   
      try {
        await handleLoginApi(this.state.username,this.state.password);
      } catch (e) {
        console.log(e);
      }
    
};
      
    

   
  
  handleShowHidePassword = () => {
    //alert("click");
    this.setState({
        isShowPassword: !this.state.isShowPassword
    });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container ">
          <div className="login-content row">
            <div className="col-12 text-login"> login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="your usename"
                value={this.state.username}
                onChange={(event) => this.handleOnchangeInput(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  id="password"
                  type={this.state.isShowPassword? 'text' : 'password'}
                  className="form-control"
                  placeholder="your password"
                  onChange={(event) => this.handleOnchangeInput(event)}
                />
                <span onClick={() => this.handleShowHidePassword()}>
                  <i class={this.state.isShowPassword ? 'far fa-eye': 'fas fa-eye-slash'}/>
                </span>
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>

            <div className="col-12">
              <span className="forgot-pass"> Forgot your password?</span>
            </div>
            <div className="col-12 text-center mt-5">
              <span className="text-order-login">Or Login With:</span>
            </div>
            <div className="col-12 social-login">
              <i class="fab fa-google-plus-g google"></i>
              <i class="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
