import React from "react";
//import { Link } from 'react-router-dom'
import DetailsModal from "./components/DetailsModal";
import Loading from "./components/Loading";
import "./components/styles/App.css";

const parseDogURL = (url) => {
  const [image, breed] = url.split("/").reverse();
  const [id] = image.split("."); //Ahora

  return {
    //Ahora
    image: url,
    id,
    breed,
  };
  // return {raza: url_api[3], id: url_api[5].split('.')[0], url} Antes
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      selectecImage: null,
      images: [],
      modalIsOpen: false,
      allBreeds: [],
    };
  }

  handleOpenModal = (selectecImage) => {
    this.setState({ modalIsOpen: true, selectecImage });
  };

  handleCloseModal = (e) => {
    this.setState({ modalIsOpen: false, selectecImage: null });
  };

  getbreeds = (breed) => {
    this.setState({ loading: true });
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/10`)
      .then((res) => res.json())
      .then((json) => this.setState({ images: json.message.map(parseDogURL) }))
      .finally(() => this.setState({ loading: false }));
  };

  componentDidMount() {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((json) => this.setState({ allBreeds: Object.keys(json.message) }));
    this.getbreeds("affenpinscher");
  }

  render() {
    const { loading, images, allBreeds } = this.state;

    return (
      <div className="container">
        <main className="container-header">
          <p className="container-header__text">Ven y conoce al nuevo</p>
          <p className="container-header__text">
            <strong>integrante de tu familia</strong>
          </p>
          <button className="container-header__btn">
            CONOCE A NUESTROS CACHORROS
          </button>
        </main>
        <section className="selectBreed">
        <p className="breeds-text">Razas Disponibles</p>
          <select className='selectBreed-select' name="select" id="" onChange={(e) => this.getbreeds(e.target.value)}>
            {allBreeds.map((breed, index) => (
              <option className='selectBreed-select__option' value={breed} key={index}>
                {breed}
              </option>
            ))}
          </select>
        </section>
        <section className="breeds">
          <div className="breeds-container">
            {loading === true && <Loading />}
            {<Loading /> &&
              images.map(({ id, breed, image }) => (
                <div className="breeds-container__dog" key={id}>
                  <p className="breeds-container__text">
                    {breed.toUpperCase()}
                  </p>
                  <img
                    onClick={() => this.handleOpenModal(image)}
                    className="breeds-container__img"
                    src={image}
                    loading="lazy"
                    alt=""
                  />
                  <button
                    onClick={() => this.handleOpenModal(image)}
                    className="breeds-container__btn"
                  >
                    Conócelo más
                  </button>
                </div>
              ))}
          </div>
        </section>
        <DetailsModal
          closeModal={this.handleCloseModal}
          modalIsOpen={this.state.modalIsOpen}
          url={this.state.selectecImage}
        />
      </div>
    );
  }
}

export default App;
