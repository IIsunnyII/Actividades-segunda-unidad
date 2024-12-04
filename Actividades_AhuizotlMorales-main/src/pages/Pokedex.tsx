import { useState } from "react";
import pokedexData from "./pokedexData.json";

interface Pokemon {
    id: number;
    name: string;
    image: string;
    description: string;
}

const pokemonList: Pokemon[] = pokedexData as Pokemon[];

function Pokedex() {
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

    const handlePokemonClick = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon);
    };

    return (
        <div className="pokedex-container">
            <h2 className="text-center">Pokedex de la Primera Generación</h2>
            <div className="pokemon-list d-flex flex-wrap justify-content-center">
                {pokemonList.map((pokemon) => (
                    <div
                        key={pokemon.id}
                        className="pokemon-card m-3 text-center"
                        onClick={() => handlePokemonClick(pokemon)}
                        style={cardStyle}
                    >
                        <div className="pokemon-image-container" style={imageContainerStyle}>
                            <img src={pokemon.image} alt={pokemon.name} style={imageStyle} />
                        </div>
                        <p style={nameStyle}>{pokemon.name}</p>
                    </div>
                ))}
            </div>
            {selectedPokemon && (
                <div className="pokemon-details mt-4 text-center" style={detailsStyle}>
                    <h3>{selectedPokemon.name}</h3>
                    <img src={selectedPokemon.image} alt={selectedPokemon.name} style={selectedImageStyle} />
                    <p>{selectedPokemon.description}</p>
                    <button className="btn btn-secondary mt-2" onClick={() => setSelectedPokemon(null)}>
                        Cerrar
                    </button>
                </div>
            )}
        </div>
    );
}

const cardStyle = {
    cursor: "pointer",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "15px",
    width: "150px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    textAlign: "center",
};

const imageContainerStyle = {
    borderRadius: "50%",
    overflow: "hidden",
    border: "5px solid #ccc",
    marginBottom: "10px",
};

const imageStyle = {
    width: "100px",
    height: "100px",
    objectFit: "cover",
};

const nameStyle = {
    fontSize: "1.2em",
    fontWeight: "bold",
    marginTop: "10px",
    color: "#333",
};

const detailsStyle = {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
};

const selectedImageStyle = {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
};

export default Pokedex;
