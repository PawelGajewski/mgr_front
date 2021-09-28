import SignCRUD from "./SignCRUD";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  const [signs, setSigns] = useState([]);
  const [type, setType] = useState("");

  useEffect(() => {
    const getSigns = async () => {
      const postsFromServer = await fetchSigns();
      setSigns(postsFromServer);
    };

    getSigns();
  }, []);

  const fetchSigns = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/signs");
    const data = await res.json();
    console.log(data)
    return data;
  };

  return (
    <div className="signs">
      <Navbar />
      <div className="filtr">
        <p>Filtacja po typie:</p>
        <select onChange={(e) => setType(e.target.value)}>
          <option value="nakazu">Nakazu</option>
          <option value="zakazu">Zakazu</option>
          <option value="ostrzegawcze">Ostrzegawcze</option>
        </select>

        <p></p>
        <Link className="button" to="/add">
          <button>Dodaj nowy znak</button>
        </Link>
      </div>
      {signs &&
        signs
          .filter((sign) => sign.rodzaj === type)
          .map((sign) => {
            return (
              <SignCRUD
                cl
                id={sign.id}
                key={sign.id}
                symbol={sign.symbol}
                opis={sign.opis}
              />
            );
          })}
      {signs.map((sign) => {
        return (
          <SignCRUD
            cl
            id={sign.id}
            key={sign.id}
            symbol={sign.symbol}
            opis={sign.opis}
          />
        );
      })}
    </div>
  );
}

export default App;
