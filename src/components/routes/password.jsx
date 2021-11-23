import React from "react";
import MainForm from "../common/mainField";
import Joi from "joi-browser";
import { getCurrentUser, logout } from "../service/auth";
import PasswordField from "./../common/passwordField";
import { passwordSever } from "../service/userService";
class Password extends MainForm {
  state = {
    data: {},
    password: { oPassword: "", nPassword: "", cnfPassword: "" },
  };
  async componentDidMount() {
    const data = { ...this.state.data };
    const loginUser = await getCurrentUser();
    if (!loginUser) return null;
    if (loginUser) {
      data.userData = loginUser;
      this.setState({ data });
    }
  }

  handleOldPassword = ({ currentTarget: inPassword }) => {
    const password = { ...this.state.password };
    password.oPassword = inPassword.value;
    this.setState({ password });
  };

  handleNewPassword = ({ currentTarget: inPassword }) => {
    const password = { ...this.state.password };
    password.nPassword = inPassword.value;
    this.setState({ password });
  };
  handleCnfPassword = ({ currentTarget: inPassword }) => {
    const password = { ...this.state.password };
    password.cnfPassword = inPassword.value;
    this.setState({ password });
  };

  schema = {
    oPassword: Joi.string().min(5).label(" current Password").required(),
    nPassword: Joi.string().min(5).label("new Password").required(),
    cnfPassword: Joi.string().min(5).label("confirm Password").required(),
  };

  validate() {
    const option = { abortEarly: true };
    const result = Joi.validate(this.state.password, this.schema, option);
    const errors = {};
    if (!result.error) return null;
    for (const item of result.error.details)
      errors[item.path[0]] = item.message;

    return errors;
  }

  submitPassword = async (e) => {
    e.preventDefault();
    //send to server
    const { data, password } = this.state;
    const errors = this.validate();
    this.setState({ errors });
    try {
      await passwordSever(data, password);
      logout();
      window.location = "/login";
      console.log("password changed.");
    } catch (err) {
      const valid = {};
      valid.message = err.response.data;
      this.setState({ valid });
    }
  };
  render() {
    const { data, errors, valid } = this.state;

    return (
      <React.Fragment>
        <form onSubmit={this.submitPassword} className="container">
          <div className="form-group mt-3">
            <PasswordField
              user={data.userData}
              cnfPass={this.state.password}
              handleOldPassword={this.handleOldPassword}
              handleNewPassword={this.handleNewPassword}
              handleCnfPassword={this.handleCnfPassword}
              errors={errors}
            />
          </div>
          {valid && <div className="alert alert-danger">{valid.message}</div>}
          {this.submitBtn("change password")}
        </form>
      </React.Fragment>
    );
  }
}

export default Password;
