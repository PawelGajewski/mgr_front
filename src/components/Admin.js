import { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import axios from "axios";
import SingleUser from "./SingleUser";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";


function Admin() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const history = useHistory();


  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    let group_id = params.get('id') // 123 
    const data = new FormData();
    data.append("jwt", Cookies.get("jwt"));
    axios.post("http://localhost:8000/api/auth", data, {}).then((res) => {
      if (res.status !== 200) {
        history.push("/");
      } else {
        setUser(res.data.id);
      }
    });

    const fetchUsers = async () => {
      const result = await axios(
        "http://127.0.0.1:8000/api/users"
      );
      setUsers(result.data);
    };

    fetchUsers();
  }, []);



  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <div className="vh-100 position-fixed" style={{width: "23.8%"}}>
            <Navbar isAdmin='true'/>
          </div>
        </div>
        <div className="col-9 position-relative mb-5 ">
          <div className="row text-center position-fixed bg-white mb-5 border-bottom border-5" style={{width: "75%", height: "15%"}}>
          </div>
          <br></br>
          <div className="row mt-5">
            {users.map((user) => (
                <SingleUser 
                key={user.id}
                id={user.id}
                username={user.username}
                isAdmin={user.isAdmin}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
