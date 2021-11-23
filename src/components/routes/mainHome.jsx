import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../service/auth";
import { PatientInfo } from "../service/userService";
import history from "../../img/history.png";
import me from "../../img/me.gif";
class MainHomePage extends Component {
  state = {
    data: {
      userData: { _id: "", username: "" },
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
    // console.log("find patient", findUser);
    // console.log("login user", loginUser);
    if (findUser) {
      this.setState({
        data: findUser,
      });
    }
  }
  render() {
    const { data } = this.state;
    return (
      <div className="container main-profile">
        <div className="d-flex justify-content-start patient-info mt-4">
          {/* profile photo*/}
          <img
            src={me}
            width="100"
            height="100"
            alt="userPhoto"
            style={{ backgroundColor: "lightgray", border: "1px solid purple" }}
            className="rounded-circle mt-2"
          />
          <div className="col-7 patient-bio mt-4">
            <div>Patient Name: {data.userData.username}</div>
            <div>File Number:[ {data.fileNumber} ]</div>
            <Link to="/home/profile">
              <button className="btn btn-primary btn-sm mt-2">
                Profile info
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-5">
          <hr />
        </div>
        <div className="profile-body">
          <div className="row">
            <div className="col">
              {" "}
              <Link to="/home/dataHistory">
                <img
                  src={history}
                  style={{
                    border: "1px solid gray",
                    boxShadow: "1px 2px 1px 1px lightgray",
                    cursor: "pointer",
                  }}
                  width="150"
                  height="150"
                  alt="data history"
                  className="my-3"
                />
              </Link>
            </div>
            <div className="col">
              {" "}
              <Link to="/home/dates">
                <img
                  src={history}
                  style={{
                    border: "1px solid gray",
                    boxShadow: "1px 2px 1px 1px lightgray",
                    cursor: "pointer",
                  }}
                  width="150"
                  height="150"
                  alt="dates"
                  className="my-3 "
                />
              </Link>
            </div>
            <div className="w-100"></div>
            {/* <div className="col">
              {" "}
              <img
                src="https://via.placeholder.com/200"
                alt="userPhoto"
                className="my-3"
              />
            </div>
            <div className="col">
              {" "}
              <img
                src="https://via.placeholder.com/200"
                alt="userPhoto"
                className="my-3"
              />
            </div>
            <div className="w-100"></div>
            <div className="col">
              {" "}
              <img
                src="https://via.placeholder.com/200"
                alt="userPhoto"
                className="my-3"
              />
            </div>
            <div className="col">
              {" "}
              <img
                src="https://via.placeholder.com/200"
                alt="userPhoto"
                className="my-3"
              /> 
            </div>
            */}
          </div>
        </div>
      </div>
    );
  }
}

export default MainHomePage;
