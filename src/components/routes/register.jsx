import React, { Component } from "react";
import { setJwt } from "../service/auth";
import { users } from "../service/userService";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
class RegisterUser extends Component {
  state = {
    data: { username: "", email: "", password: "" },
    checkBox: false,
    errors: {},
  };

  schema = {
    username: Joi.string().min(5).max(50).label("Username").required(),
    email: Joi.string().email().min(5).max(255).label("Email").required(),
    password: Joi.string().min(5).label("Password").required(),
  };
  schemaProp = {
    username: Joi.string().label("Username").required(),
    email: Joi.string().email().label("Email").required(),
    password: Joi.string().label("Password").required(),
  };

  validate() {
    const option = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, option);
    const errors = {};
    if (!result.error) return null;
    for (const item of result.error.details)
      errors[item.path[0]] = item.message;

    return errors;
  }
  validateProperty({ name, value }) {
    const obj = { [name]: value };
    const schema = { [name]: this.schemaProp[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  onSubmitRegister = async (event) => {
    event.preventDefault();
    const { data } = this.state;
    const errors = this.validate();
    if (this.state.checkBox === false) return;
    this.setState({ errors: errors || {} });
    //send to servers
    try {
      const response = await users(data);
      setJwt(response.headers["x-auth-token"]);
      window.location = "/";
      console.log("registered");
    } catch (err) {
      const errors = { ...this.state.errors };
      if (err.response && err.response.status === 400) {
        errors.email = err.response.data;
        this.setState({ errors });
      }
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  handleCheckBox = (e) => {
    const errors = { ...this.state.errors };
    this.setState({ checkBox: !this.state.checkBox });
    if (this.state.checkBox === true) {
      if (errors.checkBox) delete errors["checkBox"];
    }
    this.setState({ errors });
  };
  render() {
    const { errors, data } = this.state;

    return (
      <form onSubmit={this.onSubmitRegister} className="container">
        <div className="form-group">
          <label htmlFor="InputUsername1">Username</label>
          <input
            type="text"
            name="username"
            value={data.username}
            className="form-control"
            id="InputUsername1"
            aria-describedby="usernameHelp"
            placeholder="Patients Name"
            onChange={(e) => this.handleChange(e)}
          />
          {errors.username && (
            <div className="alert alert-danger">{errors.username}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="InputEmail1">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            className="form-control"
            id="InputEmail1"
            aria-describedby="emailHelp"
            placeholder="Patients Email"
            onChange={(e) => this.handleChange(e)}
          />
          {errors.email && (
            <div className="alert alert-danger">{errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="InputPassword1"
            placeholder="Password"
            value={data.password}
            onChange={(e) => this.handleChange(e)}
          />
          {errors.password && (
            <div className="alert alert-danger">{errors.password}</div>
          )}
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="Check1"
            onClick={() => this.handleCheckBox(this.state.checkBox)}
          />{" "}
          <label
            style={{ color: this.state.checkBox ? null : "red" }}
            className="form-check-label"
            htmlFor="Check1"
          >
            {/*eslint-disable*/}I agree on these <a href="#">terms</a>
          </label>
        </div>
        <button
          disabled={
            this.validate() === null && this.state.checkBox === true
              ? false
              : true
          }
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
        <div className="mt-4">
          <span>{`<<`}</span> <Link to="/login">go Back</Link>
        </div>
      </form>
    );
  }
}

export default RegisterUser;
