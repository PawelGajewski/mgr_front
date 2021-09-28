import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
// import "./style.css";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      image: null,
      rodzaj: null,
      symbol: null,
      opis: null,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const search = this.props.location.search;
    const id = new URLSearchParams(search).get("id");

    const response = await fetch("http://127.0.0.1:8000/api/sign/" + id);
    const data = await response.json();
    this.setState({ id: data.id });
    this.setState({ image: data.symbol });
    this.setState({ rodzaj: data.rodzaj });
    this.setState({ symbol: data.symbol });
    this.setState({ opis: data.opis });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/sign/" + this.state.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rodzaj: this.state.rodzaj,
        symbol: this.state.symbol,
        opis: this.state.opis,
      }),
    });
    if (res.status === 200) alert("Pomyślnie zaktualizowano!");
    else alert("Wystąpił błąd podczas aktualizowania danych!");
  }

  async handleDelete(event) {
    console.log("deleted");
    event.preventDefault();
    const res2 = await fetch(
      "http://127.0.0.1:8000/api/sign/" + this.state.id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res2.status === 201 || res2.status === 204) {
      alert("Usunięto znak!");
      this.props.history.push(`/signs`);
    } else alert("Wystąpił błąd podczas usuwania znaku!");
  }

  render() {
    return (
      <div className="edit">
        <Navbar />
        <form className="edit_form" onSubmit={this.handleSubmit}>
          <img
            src={`/img/png/` + this.state.image + ".png"}
            style={{ width: "8%", height: "8%" }}
            alt = ""
          />
          <p></p>
          <button className="delete_btn" onClick={this.handleDelete}>
            Usuń
          </button>
          <p>Rodzaj</p>
          <input
            type="text"
            name="rodzaj"
            value={this.state.rodzaj}
            onChange={this.handleChange}
          />
          <p>Symbol</p>
          <input
            type="text"
            name="symbol"
            value={this.state.symbol}
            onChange={this.handleChange}
          />
          <p>Opis</p>
          <textarea
            name="opis"
            rows="5"
            cols="50"
            value={this.state.opis}
            onChange={this.handleChange}
          />
          <p></p>
          <input type="submit" value="Zaktualizuj" />
        </form>
        <p></p>
        <Link to="/signs">Powrót</Link>
      </div>
    );
  }
}

export default Edit;
