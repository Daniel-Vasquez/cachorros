import React from "react";
import DetailsModal from "./components/DetailsModal";
import Loading from "./components/Loading";
import Error from "./components/Error";
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

const uppercaseFirstLetter = (word) => {
  return word[0].toUpperCase() + word.slice(1)
}


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null,
      selectecImage: null,
      images: [],
      modalIsOpen: false,
      allBreeds: [],
    };
  }

  getRandomArbitrary = (min, max) => {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  handleOpenModal = (selectecImage) => {
    this.setState({ modalIsOpen: true, selectecImage });
  };

  handleCloseModal = (e) => {
    this.setState({ modalIsOpen: false, selectecImage: null });
  };

  getbreeds = (breed) => {
    this.setState({ loading: true, error: null });
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/${this.getRandomArbitrary(10, 25)}`)
    .then((res) => res.json())
    .then((json) => this.setState({ images: json.message.map(parseDogURL) }))
    .finally((error) => this.setState({ loading: false, error: error }));
  };
  
  componentDidMount() {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then((res) => res.json())
    .then((json) => this.setState({ allBreeds: Object.keys(json.message)}));
    this.getbreeds("affenpinscher");
  }

  render() {
    const { loading, images, allBreeds, error } = this.state;
    
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
          <select
            className="selectBreed-select"
            name="select"
            id=""
            onChange={(e) => this.getbreeds(e.target.value)}
          >
            {allBreeds.map((breed, index) => (
              <option
                className="selectBreed-select__option"
                value={breed}
                key={index}
              >
                {uppercaseFirstLetter(breed)}
              </option>
            ))}
          </select>
        </section>
        <section className="breeds">
          <p className="breeds-count"> Número de resultados: {images.length}</p>
          <div className="breeds-container">
            {!loading && images.map(({ id, breed, image }) => (
              <div className="breeds-container__dog" key={id}>
                <p className="breeds-container__text">{uppercaseFirstLetter(breed)}</p>
                <img
                  onClick={() => this.handleOpenModal(image)}
                  className="breeds-container__img"
                  src={image}
                  loading="lazy"
                  alt={image}
                />
                <button
                  onClick={() => this.handleOpenModal(image)}
                  className="breeds-container__btn"
                >
                  Conócelo más
                </button>
              </div>
            ))}
            {loading && <Loading />}
            {error && <Error error={error}/>}
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
