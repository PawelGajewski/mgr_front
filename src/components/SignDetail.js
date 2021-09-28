import React from "react";
// import './style.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


class signDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rodzaj: "",
      symbol: "",
      grafika: "",
      opis: "",
    };
  }

  async componentDidMount(event) {
    //console.log(this.props.sign);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbol: this.props.sign }),
    };
    //console.log(this.state.path)
    const response = await fetch(
      "http://127.0.0.1:8000/api/signsymbol",
      requestOptions
    );
    const data = await response.json();
    //console.log(data);
    this.setState({ rodzaj: data.rodzaj });
    this.setState({ symbol: data.symbol });
    this.setState({ grafika: data.grafika });
    this.setState({ opis: data.opis });
  }
  render() {
    return (
      <div className="main_right">
        <h1 className="opis_up">System uznał, że przesłany znak to: </h1>
        <img className="sign" src={window.location.origin + '/img/png/' + this.state.symbol + '.png'} alt=""/>
        <h3 className="opis">Symbol: {this.state.symbol}</h3>
        <h2 className="opis">{this.state.opis}</h2>
      </div>
    );
  }
}

export default signDetail;
