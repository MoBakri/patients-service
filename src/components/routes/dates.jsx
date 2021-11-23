import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
// import { NavLink } from "react-router-dom";

class Dates extends Component {
  state = { date: { dateFrom: "", dateTo: "" } };
  handleDateFrom = ({ currentTarget: inputDate }) => {
    let dateFrom = { ...this.state.date.dateFrom };
    dateFrom = inputDate.value;
    this.setState({ dateFrom });
    console.log(this.state.date.dateFrom);
  };
  theMoment = () => {
    return moment.format("YYYY-MM-DD");
  };
  render() {
    const { dateFrom, dateTo } = this.state.date;
    const mom = moment.format("YYYY-MM-DD");
    console.log(mom);
    return (
      <React.Fragment>
        <div className="header-date container">
          <h3 className="text-center" style={{ color: "red" }}>
            Dates
          </h3>
        </div>
        <div className="text-center">
          <button className="btn btn-info btn-sm">3 month</button>
          <button className="btn btn-info btn-sm mx-3">6 month</button>
          <button className="btn btn-info btn-sm">1 year</button>
        </div>
        <div className="calender-date mt-4 text-center">
          <label htmlFor="">
            from{" "}
            <input
              type="date"
              name="dateFrom"
              value={dateFrom}
              defaultValue={this.theMoment}
              // onChange={(e) => this.handleDateFrom(e)}
              id="fromDate"
            />
          </label>
          <label className="ml-2" htmlFor="">
            : to <input type="date" name="toDate" id="toDate" />
          </label>{" "}
          <i className="fa fa-search ml-2" aria-hidden="true"></i>
        </div>
        <div
          className="new-appointment"
          style={{
            backgroundColor: "grey",
            padding: "10px",
            color: "whitesmoke",
            margin: "26px 0",
            textAlign: "center",
          }}
        >
          <Link to="/dates/new-appointment">
            {" "}
            <div className="btn btn-primary">new appointment</div>
          </Link>
        </div>
        <div className="main-dates-table">list tables of reservations</div>
      </React.Fragment>
    );
  }
}

export default Dates;
