import React from "react";
// import "./style.css";
import { Link } from "react-router-dom";

const SignCRUD = ({ id, symbol, opis }) => {
  return (
    <div>
      <Link to={{pathname: "/edit", search: `?id=${id}`}} >
      <div className="sign_crud">
        <div>
          <img src={`/img/png/` + symbol + ".png"} className="mini_sign" alt="" />
        </div>
        <div  className="sign_info">
          <p>{symbol}</p>
          <p>{opis}</p>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default SignCRUD;
