import React from "react";
//import { Link } from 'react-router-dom'
import DetailsModal from "./components/DetailsModal";
import Loading from './components/Loading'
import "./components/styles/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      selectecImage: null,
      images: [],
      modalIsOpen: false,
      info: {}
    };
  }

  handleOpenModal = (selectecImage) => {
    this.setState({ modalIsOpen: true, selectecImage });
  };

  handleCloseModal = (e) => {
    this.setState({ modalIsOpen: false, selectecImage: null });
  };

  componentDidMount() {
    fetch("https://dog.ceo/api/breed/hound/images/random/30")
      .then((res) => res.json())
      .then((json) => this.setState({ images: json.message }))
      .finally(() => this.setState({ loading: false }));
  }

  urlApi = (url) => {
    const url_api = url.split('/')
    console.log(url_api)
    return url_api
  }


  render() {
    const { loading, images } = this.state;
    this.urlApi("https://dog.ceo/api/breed/hound/images/random/30")

    return (
      <div className="container">
        <header className="container-header">
          <p className="container-header__text">Ven y conoce al nuevo</p>
          <p className="container-header__text">
            <strong>integrante de tu familia</strong>
          </p>
          <button className="container-header__btn">
            CONOCE A NUESTROS CACHORROS
          </button>
        </header>
        <section className="breeds">
          <p className="breeds-text">Razas Disponibles</p>
          <div className="breeds-container">
            {loading === true && <Loading/>}
            {<Loading/> && images.map((image, index) => (
                <div className="breeds-container__dog" key={image}>
                  <p className="breeds-container__text">Raza no disponible {index + 1}</p>
                  <img
                    onClick= {() => this.handleOpenModal(image)}
                    className="breeds-container__img"
                    src={image}
                    loading="lazy"
                    alt=""
                  />
                  <button onClick= {() => this.handleOpenModal(image)} className="breeds-container__btn">Conócelo más</button>
                </div>
              ))
            }
          </div>
        </section>
        <DetailsModal 
          closeModal = {this.handleCloseModal}
          modalIsOpen = {this.state.modalIsOpen}
          url = {this.state.selectecImage}
        />
      </div>
    );
  }
}

export default App;
