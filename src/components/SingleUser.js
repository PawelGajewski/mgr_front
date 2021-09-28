import React from "react";
import { Link } from "react-router-dom";
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SingleUser = ({
  id,
  username,
  isAdmin
}) => {
  return (
    <div>
      <div className="container">
      <Link
          to={{
            pathname: "/userrecognition",
            search: `?id=${id}`,
            state: { fromDashboard: true },
          }}
          className="link-dark text-decoration-none"
        >
        <div className="row mt-5 rounded" style={{boxShadow: "10px 10px"}}>
          <div className="col mt-3">
            <h4>Username: {username}</h4>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default SingleUser;
