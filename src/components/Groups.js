import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import axios from "axios";
import SingleGroup from "./SingleGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";

function App() {
  const [signs, setRecognitions] = useState([]);
  const [user, setUser] = useState("");
  const [uniqueLabels, setuniqueLabels] = useState([]);
  const [algorithm, setAlgorithm] = useState("all");
  const history = useHistory();

  useEffect(() => {
    console.log("algorythm", algorithm);
    const data = new FormData();
    data.append("jwt", Cookies.get("jwt"));
    axios.post("http://localhost:8000/api/auth", data, {}).then((res) => {
      if (res.status !== 200) {
        history.push("/");
      } else {
        setUser(res.data.id);
      }
    });

    const fetchRecognitions = async () => {
      const result = await axios(
        "http://127.0.0.1:8000/api/groups?search=" + user
      );
      setRecognitions(result.data);
	 
    };

    fetchRecognitions();
  }, []);

  useEffect(() => {
    var uniqueNames = [];
    var i = 0;
    for (i = 0; i < signs.length; i++) {
      if (uniqueNames.indexOf(signs[i].algorithm) === -1) {
        uniqueNames.push(signs[i].algorithm);
      }
    }
    setuniqueLabels(uniqueNames);
  }, [signs]);

  const handleChange = (e) => {
    setAlgorithm(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <div className="vh-100 position-fixed" style={{width: "23.8%"}}>
            <Navbar />
          </div>
        </div>
        <div className="col-9 position-relative mb-5 ">
          <div className="row text-center position-fixed bg-white mb-3 border-bottom border-5" style={{width: "75%", height: "10%"}}>
            <div className="col-1 h-100">
                <Link to="/">
                  <img src="back.png" className="img-fluid p-4" />
                </Link>
            </div>
            <div className="col">
            <h3>Wybierz algorytm:</h3>
            <div>
              <select
                className="btn btn-secondary dropdown-toggle"
                defaultValue=""
                onChange={(e) => handleChange(e)}
              >
                <option value="none" selected disabled hidden>
                  Filtruj
                </option>
                <option value="all">Wszystkie</option>
                {uniqueLabels.map((item) => (
                  <option key={item.id} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              </div>
            </div>
          </div>
          <br></br>
          <div className="row mt-5">
          <p className="mt-3"></p>
            {algorithm === "all" &&
              signs.map((rec, index) => (
                <SingleGroup
                    key={rec.id}
                    id={rec.id}
                    datetime={rec.datetime}
                    label={rec.label}
                    probability={rec.probability}
                    algorithm={rec.algorithm}
                    amount={rec.images_amount}
                    positive_recognitions={rec.positive_recognized}
                    bgcolor={index}
                  />
              ))}
          </div>
          <div className="row mt-5">
            {algorithm &&
              signs
                .filter((sign) => sign.algorithm === algorithm)
                .map((rec) => (
                  <SingleGroup
                    key={rec.id}
                    id={rec.id}
                    datetime={rec.datetime}
                    label={rec.label}
                    probability={rec.probability}
                    algorithm={rec.algorithm}
                    amount={rec.images_amount}
                    positive_recognitions={rec.positive_recognized}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
