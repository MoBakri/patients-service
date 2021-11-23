import React, { Component } from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { login, setJwt } from "../service/auth";
class LoginUser extends Component {
  state = { data: { email: "", password: "" }, errors: {} };

  schema = {
    email: Joi.string().email().min(5).label("Email").required(),
    password: Joi.string().min(5).label("Password").required(),
  };
  schemaProp = {
    email: Joi.string().label("Email").required(),
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

  onSubmitLogin = async (event) => {
    event.preventDefault();
    const { data } = this.state;
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    try {
      const { data: jwt } = await login(data.email, data.password);
      setJwt(jwt);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
      console.log("logging");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = {};
        errors.invalid = err.response.data;
        console.log(err.response);
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

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmitLogin} className="container">
        <div className="form-group">
          <label htmlFor="InputEmail1">Email</label>
          <input
            type="email"
            name="email"
            value={this.state.data.email}
            className="form-control"
            id="InputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Your Patients Number"
            onChange={(e) => this.handleChange(e)}
          />
          {errors.email && (
            <div className="alert alert-danger">{errors.email}</div>
          )}
          {/* <small id="emailHelp" className="form-text text-muted"></small> */}
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="InputPassword1"
            placeholder="Enter you password"
            onChange={(e) => this.handleChange(e)}
          />
          {errors.password && (
            <div className="alert alert-danger">{errors.password}</div>
          )}
        </div>

        {errors.invalid && (
          <div className="alert alert-danger">{errors.invalid}</div>
        )}

        <button type="submit" className="btn btn-primary btn-sm">
          Login
        </button>
        <div className="mt-3">
          <span>or</span> <Link to="/register">open a new patient profile</Link>
        </div>
      </form>
    );
  }
}

export default LoginUser;
