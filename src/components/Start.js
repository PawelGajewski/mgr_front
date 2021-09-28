import React from "react";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }

  componentDidMount() {
    const jwt = Cookies.get("jwt");
    if (jwt) this.props.history.push("/");
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 min-vh-100">
            <Navbar />
          </div>
          <div className="col-2"></div>
          <div className="col-2 align-self-center">
          <Login />
          </div>
        <div className="col-1"></div>
        <div className="col-2 align-self-center">
          <Register />
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
