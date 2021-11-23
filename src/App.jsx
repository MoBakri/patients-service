import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { getCurrentUser } from "./components/service/auth";
import MainHomePage from "./components/routes/mainHome";
import RegisterUser from "./components/routes/register";
import LoginUser from "./components/routes/login";
import NavBar from "./navBar";
import Logout from "./components/routes/logout";
import UserInfo from "./components/routes/userInfo";
import DataHistory from "./components/routes/dataHistory";
import Dates from "./components/routes/dates";
import Password from "./components/routes/password";
import NewAppointment from "./components/routes/newAppointment";
import Footer from "./components/routes/footer";

class App extends Component {
  state = {};
  componentDidMount() {
    const data = getCurrentUser();
    this.setState({ data });
  }
  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.data} />
        <Switch>
          <Route
            path="/reset-password/"
            render={(props) => <Password data={this.state.data} {...props} />}
          />
          <Route path="/dates/new-appointment" component={NewAppointment} />
          <Route path="/home/dates/" component={Dates} />
          <Route path="/home/dataHistory/" component={DataHistory} />
          <Route path="/home/profile/:id" component={UserInfo} />
          <Route path="/home/profile/" component={UserInfo} />
          <Route path="/home" component={MainHomePage} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={LoginUser} />
          <Route path="/register" component={RegisterUser} />
          <Redirect path="/" exact to="/home" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
