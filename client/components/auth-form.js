import React from "react";
import { connect } from "react-redux";
import { login, auth } from "../store";

const AuthForm = props => {
  console.log(props);
  const { name, displayName, handleSubmit, error } = props;
  return (
    <div className="center">
      <form onSubmit={handleSubmit} name={name}>
        {name === "signup" ? (
          <React.Fragment>
            <div>
              <label htmlFor="First Name">
                <small>First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <br />
            <div>
              <label htmlFor="Last Name">
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
            <br />
          </React.Fragment>
        ) : (
          ""
        )}
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <br />
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <br />
        <div>
          <button type="submit">{displayName}</button>
        </div>
        <br />
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      if (evt.target.name === "login") {
        dispatch(login(email, password, formName));
      } else {
        const firstName = evt.target.firstName.value;
        const lastName = evt.target.lastName.value;
        dispatch(auth(email, password, formName, firstName, lastName));
      }
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
