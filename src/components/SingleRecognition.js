import React from "react";
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";

const thumb = null;
const SingleRecognition = ({
  id,
  label,
  ownerID,
  image,
  probability,
  predict,
  algorithm,
  datetime,
  original_sign,
  bgcolor,
}) => {
  console.log(thumb);
  return (
    <div>
      <div className="container">
        <div
          className="row mt-1 rounded pt-3 pb-3"
          style={{ backgroundColor: bgcolor % 2 === 0 ? "#e6e6e6" : "#c6c6c6" }}
        >
          <div className="col-1 text-center d-flex flex-wrap align-items-center">
            {predict === original_sign && (
              <img src="good.png" style={{ width: "3vw", marginLeft: "3vw" }} />
            )}
            {predict !== original_sign && (
              <img src="bad.png" style={{ width: "3vw" }} />
            )}
          </div>
          <div className="col-4">
            <img
              src={image}
              className="rounded mx-auto d-block"
              style={{ width: "10vw", height: "20vh" }}
              alt=""
            />
            <p className="text-center">Oryginalny plik</p>
          </div>
          <div className="col-4 mt-3">
            <h4>Predykcja: {predict}</h4>
            <h6>Oryginalny znak: {original_sign}</h6>
            <h4>Prawdopodobieństwo: {probability} %</h4>
          </div>
          <div className="col-2 text-center">
          <img src={`img/png/${predict}.png`} className="img-fluid" style={{ width: "8vw"}} />
          <h4 className="">Rozpoznany znak</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecognition;
