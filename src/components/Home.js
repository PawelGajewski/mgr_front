import React from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./global.css";
import "react-responsive-modal/styles.css";
import Navbar from "./Navbar";
import { Modal } from "react-responsive-modal";
import Cookies from "js-cookie";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      modalInfo1: '',
      modalInfo2: '',
      url: null,
      sign: null,
      loading: false,
      loaded: false,
      reload: false,
      err: null,
      selectedFile: null,
      id: null,
      label: "",
      algorithm: null,
      showCloseIcon: false,
      ok: null,
    };
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeModal = this.onChangeModal.bind(this);
    this.handleAlgorithm = this.handleAlgorithm.bind(this);
  }

  componentDidMount() {
    const data = new FormData();
    if (Cookies.get("jwt") === undefined) this.props.history.push("/start");
    data.append("jwt", Cookies.get("jwt"));
    axios.post("http://localhost:8000/api/auth", data, {}).then((res) => {
      if (res.status !== 200) {
        this.props.history.push("/start");
      } else {
        this.setState({ id: res.data.id });
      }
    });
  }

  onChange(e) {
    this.setState({ disabled: false });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  onClickHandler = () => {
    if(this.state.algorithm === null || this.state.selectedFile === null || this.state.label === null) {
      alert("Uzupełnij dane!")
    }
    else {
    this.setState({ loading: true });
    const data = new FormData();
    data.append("id", this.state.id);
    data.append("file", this.state.selectedFile);
    data.append("label", this.state.label);
    data.append("algorithm", this.state.algorithm);
    axios.post("http://localhost:8000/api/recognize", data, {}).then((res) => {
      if (res.status === 200) {
        this.setState({ loading: false });
        this.setState({ loaded: true });
        this.setState({ok: "/groups"})
        this.setState({ openModal: true });
        this.setState({modalInfo1: "Przetwarzanie zakończone skucesem!"})
        this.setState({modalInfo2: 'Wynik znajdziesz w zakładce "Moje Rozpoznania"'})
      }
      if (res.status === 204) {
        this.setState({ loading: false });
        this.setState({ loaded: true });
        this.setState({ok: "/start"})
        this.setState({ openModal: true });
        this.setState({modalInfo1: "Błąd"})
        this.setState({modalInfo2: "Sprawdź formt przesłanego pliku"})

      }
      if (res.status === 500 ) {
        this.setState({ loading: false });
        this.setState({ loaded: true });
        this.setState({ok: "/start"})
        this.setState({ openModal: true });
        this.setState({modalInfo1: "Błąd"})
        this.setState({modalInfo2: "Wystąpił błąd serwera, przepraszamy"})

      }
    });
  }
  };

  onChangeModal = (e) => {
    e.preventDefault();
    this.setState({ openModal: !this.state.openModal });
  };

  handleAlgorithm = (e) => {
    e.preventDefault();
    this.setState({algorithm: e.target.value})
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 min-vh-100">
            <Navbar />
          </div>
          <div className="col-9">
          <div className="col mt-5 text-center">
              <h2>Prześlij archiwum .zip ze zdjęciami znaków drogowych</h2>
              <h5>Plik musi być w formacie .zip</h5>
              <br></br>
              <form className="add-form">
                  <label for="formFile" className="form-label" required>
                    Wybierz plik:
                  </label>
                  <input
                    class="form-control w-25"
                    style={{margin: "0 auto"}}
                    type="file"
                    id="formFile"
                    accept=".zip"
                    onChange={this.onChangeHandler}
                  />
                <h2></h2>
                <br></br>
                <p>Wybierz algorytm:</p>
                <select
                  className="btn btn-secondary dropdown-toggle text-center"
                  defaultValue=""
                  onChange={this.handleAlgorithm}
                  required
                >
                  <option disabled value="">Wybierz algorytm</option>
                  <option value="Tensorflow">Tensorflow</option>
                  <option value="XGBoost">XGBoost</option>
                  <option value="SVM">SVM</option>
                </select>
                <br></br>
                <br></br>
                <p>Etykieta</p>
                <input
                  className="input-group-text"
                  style={{margin: "0 auto"}}
                  type="text"
                  name="label"
                  value={this.state.label}
                  onChange={this.handleChange}
                  required
                />
                <br></br>
                <p></p>
                <button
                  type="button"
                  className="btn btn-success btn-block"
                  onClick={this.onClickHandler}
                >
                  Prześlij
                </button>
              </form>
              <div>
                <Modal
                  open={this.state.loading}
                  showCloseIcon={this.showCloseIcon}
                >
                  <p className="mt-5"></p>
                  <h2 className="text-center mt-5">
                    Trwa przetwarzanie, proszę czekać...
                  </h2>
                  <h4 className="text-center">
                    <ClipLoader color="black" loading="true" size={150} />
                  </h4>
                </Modal>
                <Modal open={this.state.openModal} onClose={this.onChangeModal}>
                  <p className="mt-5"></p>
                  <h2 className="text-center mt-5">
                    {this.state.modalInfo1}
                  </h2>
                  <h4 className="text-center">
                    {this.state.modalInfo2}
                  </h4>
                  <div className="text-center">
                    <Link to={this.state.ok} className="btn btn-primary">
                      OK
                    </Link>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
