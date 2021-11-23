import React from "react";
import Joi from "joi-browser";
import MainForm from "./../common/mainField";
import { getCurrentUser } from "../service/auth";
import me from "../../img/me.gif";
import { Link } from "react-router-dom";
import {
  PatientInfo,
  PatientPost,
  PatientUpdate,
} from "../service/userService";

class UserInfo extends MainForm {
  state = {
    data: {
      _id: "",
      username: "",
      state: "",
      gender: "",
      age: "",
      phoneNumber: "",
      fileNumber: "",
    },
    errors: {},
  };

  async componentDidMount() {
    const { data: patients } = await PatientInfo();
    const loginUser = await getCurrentUser();
    if (!loginUser) return null;
    const findUser = patients.find(
      (user) => user.userData._id === loginUser._id
    );

    if (!findUser && loginUser) {
      const { data: newPatient } = await PatientPost({
        userDataId: loginUser._id,
      });
      this.setState({ data: newPatient });
    }
    if (findUser) {
      this.setState({
        data: this.viewData(findUser),
      });
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevState.data);
  //   console.log(this.state.data);
  // }

  viewData = (user) => ({
    _id: user._id,
    username: user.userData.username,
    state: user.state,
    gender: user.gender,
    age: user.age,
    phoneNumber: user.phoneNumber,
    fileNumber: user.fileNumber,
  });

  schema = {
    _id: Joi.string(),
    username: Joi.string().label("Username"),
    gender: Joi.string().label("gender"),
    state: Joi.string().label("State"),
    age: Joi.number().label("Age"),
    phoneNumber: Joi.string().label("Phone Number"),
  };

  async onSubmitted() {
    // send to server
    const { data } = this.state;
    data.done = false;
    try {
      await PatientUpdate(data._id, {
        userData: data.userData,
        state: data.state,
        gender: data.gender,
        age: data.age,
        phoneNumber: data.phoneNumber,
      });
      data.done = true;
      this.setState(data);
    } catch (err) {
      console.error("userInfo submit", err.response.data);
    }
  }

  render() {
    const { data, done } = this.state;
    console.log(this.state);
    return (
      <React.Fragment>
        <div className="userinfoHeader">
          <img className="rounded-circle mt-2" src={me} alt="profile Img" />
          <h2>Profile No: {data.fileNumber}</h2>
          <div className="userInfoBreakLine">
            <br />
          </div>
        </div>
        <form onSubmit={this.submitted} className="container">
          {this.input("username", "Username")}
          {data.username && (
            <span className="mb-4">
              <Link to="/reset-password">Change password</Link>
            </span>
          )}
          {this.input("state", "State")}
          {this.input("gender", "Gender")}
          {this.input("age", "Age")}
          {this.input("phoneNumber", "Phone Number")}
          {done && this.submitted && (
            <div className="alert alert-primary">Saved</div>
          )}
          {this.submitBtn("Submit")}
        </form>
      </React.Fragment>
    );
  }
}

export default UserInfo;
