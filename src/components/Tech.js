import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ClipLoader from "react-spinners/ClipLoader";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Tech = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <div className="vh-100 position-fixed" style={{ width: "23.8%" }}>
            <Navbar />
          </div>
        </div>
        <div className="col-9 text-center mt-5">
          <h2>Tensorflow</h2>
          <p>
            Opracowana przez Google biblioteka typu Open Source przeznaczona do uczenia maszynowego. Biblioteka ta jest
             dostosowana do szeregu różnych zastosowań jednak jej główny cel skupia się na uczeniu oraz wnioskowaniu o
              głębokich sieciach neuronowych. Początkowo TensorFlow został opracowany na wyłączny użytek Google jednak z 
              czasem został udostępniony do użytku w roku 2015. Opiera się on głównie na przepływanie danych i programowaniu
               zróżnicowanym. 
            Biblioteka jest w stanie pracować na różnorodnych platformach poczynając od urządzeń mobilnych z systemami Android
             czy IOS po komputery stacjonarne oraz serwery dzięki swojej uniwersalnej architekturze.  
</p>
          <h2 className="mt-5">SVM</h2>
          <p>SVM w pełnej nazwie oznacza Support Vector Machine, znany również pod nazwą Maszyna wektorów 
            nośnych jest to algorytm z zakresu sztucznej inteligencji, który opiera się w pełnej mierze na 
            klasyfikacji czyli systematycznym podziale danych na klasy bądź działy według określonych z góry zasad.
             Maszyna funkcjonuje jako klasyfikator, którego uczenie ma za zadanie wyznaczenie tak zwanej hiperpłaszczyzny,
              która z kolei z jak największym możliwym marginesem podzieli nam dane należące do dwóch różnych klas. </p>
          <h2 className="mt-5">XGBoost</h2>
          <p>XGBoost podobnie jak TensorFlow jest bardzo wydajną biblioteką typu Open Source przeznaczoną do uczenia maszynowego. 
            Bardziej ściśle mówiąc jest to algorytm uczenia maszynowego, który wykorzystuje strukturę Gradient Boosting czyli 
            wzmocnienie gradientowe  i opiera się w dużej mierze na drzewach decyzyjnych .  Dzięki swojej uniwersalności obsługuje 
            on większość różnych języków programowania takie jak na przykład Python, C++, Java oraz poprawnie funkcjonuje na różnych 
            systemach operacyjnych – Windows, Linux czy OSX. 
            Dzięki wyżej wspomnianemu wzmocnieniu gradientowemu XGBoost jest w stanie równolegle wspomagać drzewa co wiąże się z bardzo szybkim i 
            dokładnym nauczaniem danych co przekłada się również na to, że jest w stanie dokonać rozwiązania problemu, który wykracza nawet 
            poza miliardy przykładów.
</p>
        </div>
      </div>
    </div>
  );
};

export default Tech;
