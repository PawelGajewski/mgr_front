import React from "react";
import Navbar from "./Navbar";
// import "./style.css";

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id: null,
        image: null,
        rodzaj: null,
        symbol: null,
        opis: null,
    };
    this.handleChange_opis = this.handleChange_opis.bind(this);
    this.handleChange_rodzaj = this.handleChange_rodzaj.bind(this);
    this.handleChange_symbol = this.handleChange_symbol.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange_rodzaj(event) {
    this.setState({ rodzaj: event.target.value });
  }

  handleChange_symbol(event) {
    this.setState({ symbol: event.target.value });
  }

  handleChange_opis(event) {
    this.setState({ opis: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const res = await fetch('http://127.0.0.1:8000/api/signs',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "rodzaj": this.state.rodzaj,
        "symbol": this.state.symbol,
        "opis": this.state.opis,
        "grafika": this.state.symbol
      }
      )
    })
    if (res.status === 200 || res.status === 201) {
      alert("Pomyślnie dodano znak!")
      this.props.history.push(`/signs`)
    }
    else alert("Wystąpił błąd podczas dodawania znaku!")
}

  render() {
    return (
      <div className="edit">
        <Navbar />
        <form className="edit_form" onSubmit={this.handleSubmit}>
          <p>Rodzaj</p>
          <input type="text" name="rodzaj" value={this.state.rodzaj} onChange={this.handleChange_rodzaj}/>
          <p>Symbol</p>
          <input type="text" name="symbol" value={this.state.symbol} onChange={this.handleChange_symbol}/>
          <p>Opis</p>
          <textarea name="opis" rows="5" cols="50" value={this.state.opis} onChange={this.handleChange_opis}/>
          <p></p>
          <input type="submit" value="Dodaj" />
        </form>
      </div>
    );
  }
}

export default Add;
