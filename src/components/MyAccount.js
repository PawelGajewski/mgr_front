import { useState, useEffect } from "react";
import { useHistory, useParams, useLocation, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import axios from "axios";
import SiggleRecognition from "./SingleRecognition";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";

function App() {
  const [signs, setRecognitions] = useState([]);
  const [user, setUser] = useState("");
  const [uniqueLabels, setuniqueLabels] = useState([]);
  const [algorithm, setAlgorithm] = useState("all");
  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let group_id = params.get("id"); // 123
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
        "http://127.0.0.1:8000/api/recognitions?groupID__id=" + group_id
      );
      setRecognitions(result.data);
    };

    fetchRecognitions();
  }, []);

  useEffect(() => {
    var uniqueNames = [];
    var i = 0;
    for (i = 0; i < signs.length; i++) {
      if (uniqueNames.indexOf(signs[i].label) === -1) {
        uniqueNames.push(signs[i].label);
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
          <div className="vh-100 position-fixed" style={{ width: "23.8%" }}>
            <Navbar />
          </div>
        </div>
        <div className="col-9 position-relative mb-5 ">
          {signs.slice(0, 1).map((group) => (
            <div
              className="row text-center position-fixed bg-white mb-5 border-bottom border-5 mt-2"
              style={{ width: "75%", height: "10%" }}
            >
              <div className="col-1 h-100">
                <Link to="/groups">
                  <img src="back.png" className="img-fluid p-4" />
                </Link>
              </div>
              <div className="col-4 h-100">
                <h3>Etykieta:</h3>
                {group.label}
              </div>
              <div className="col-4 h-100">
                <h3>Algorytm:</h3>
                {group.algorithm}
              </div>
              <div className="col-3 h-100">
                <h3 className="text-wrap">Liczba zdjęć:</h3>
                {signs.length}
              </div>
            </div>
          ))}
          <br></br>
          <div className="row mt-5">
            <p className="mt-3"></p>
            {algorithm === "all" &&
              signs.map((rec, index) => (
                <SiggleRecognition
                  key={rec.id}
                  datetime={rec.datetime}
                  label={rec.label}
                  image={rec.image}
                  probability={rec.probability}
                  predict={rec.predict}
                  algorithm={rec.algorithm}
                  original_sign={rec.original_sign}
                  bgcolor={index}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
