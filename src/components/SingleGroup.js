import React from "react";
import { Link } from "react-router-dom";
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SingleGroup = ({
  id,
  label,
  ownerID,
  probability,
  predict,
  algorithm,
  datetime,
  amount,
  positive_recognitions,
  bgcolor,
}) => {
  return (
    <div>
      <div className="container">
        <Link
          to={{
            pathname: "/my_account",
            search: `?id=${id}`,
            state: { fromDashboard: true },
          }}
          className="link-dark text-decoration-none"
        >
          <div
            className="row mt-1 rounded group-hover"
            style={{
              backgroundColor: bgcolor % 2 === 0 ? "#e6e6e6" : "#d2d2d2",
            }}
          >
            <div className="col text-center">
              <h3>Etykieta: {label}</h3>
              <h5 className="">Data: {datetime.slice(0, 10)}</h5>
              <h4 className="mt-0">Godzina: {datetime.slice(11, 16)}</h4>
            </div>
            <div className="col text-center">
              <h3>Użyty algorytm: {algorithm}</h3>
              <h4>
                Pozytywne rozpoznania: {positive_recognitions} / {amount}
              </h4>
              <h5 className="mt-0">
                Procentowo: {Math.round(parseFloat(positive_recognitions / amount) * 100)} %
              </h5>
              <h4 className="mt-0">Prawdopodobieństwo: {probability} %</h4>
            </div>
            <div className="col text-center">
              <h4 className="float-end bottom-0">Ilość zdjęć: {amount}</h4>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SingleGroup;
