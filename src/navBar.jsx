import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
class NavBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/home" className="navbar-brand">
          Patients Services
        </Link>
        <div>
          {user && (
            <span>
              {" "}
              <i className="fa fa-user-o"></i>
              {/*eslint-disable */} <a href="#">{` ${user.username}`}</a>
            </span>
          )}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mr-auto">
            <NavLink to="/home" className="nav-item nav-link">
              Home
            </NavLink>
            {!user && (
              <React.Fragment>
                <Link to="/login" className="nav-item nav-link">
                  Login
                </Link>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <Link to="/logout" className="nav-item nav-link">
                  logout
                </Link>
              </React.Fragment>
            )}
            <NavLink to="/user-guide" className="nav-item nav-link">
              User Guide
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
