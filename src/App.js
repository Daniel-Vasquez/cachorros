import React from "react";
//import { Link } from 'react-router-dom'
import DetailsModal from "./components/DetailsModal";
import Loading from './components/Loading'
import "./components/styles/App.css";

const parseDogURL = (url) => {
  const [image, breed] = url.split('/').reverse()
  const [id] = image.split('.') //Ahora

  return { //Ahora
    image: url,
    id,
    breed
  }
  // return {raza: url_api[3], id: url_api[5].split('.')[0], url} Antes
}

console.log(parseDogURL("https://images.dog.ceo/breeds/hound-afghan/n02088094_1128.jpg"))


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
    fetch("https://dog.ceo/api/breed/hound/images/random/20")
      .then((res) => res.json())
      .then((json) => this.setState({ images: json.message.map(parseDogURL) }))
      .finally(() => this.setState({ loading: false }));
  }


  render() {
    const { loading, images } = this.state;

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
            {<Loading/> && images.map(({ id, breed, image }) => (
                <div className="breeds-container__dog" key={id}>
                  <p className="breeds-container__text">{breed.toUpperCase()}</p>
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
