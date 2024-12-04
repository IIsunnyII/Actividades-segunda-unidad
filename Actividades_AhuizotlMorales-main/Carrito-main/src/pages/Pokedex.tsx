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
                        className="pokemon-card m-2 text-center"
                        onClick={() => handlePokemonClick(pokemon)}
                        style={{ cursor: "pointer" }}
                    >
                        <img src={pokemon.image} alt={pokemon.name} style={{ width: "100px", height: "100px" }} />
                        <p>{pokemon.name}</p>
                    </div>
                ))}
            </div>
            {selectedPokemon && (
                <div className="pokemon-details mt-4 text-center">
                    <h3>{selectedPokemon.name}</h3>
                    <img src={selectedPokemon.image} alt={selectedPokemon.name} style={{ width: "150px", height: "150px" }} />
                    <p>{selectedPokemon.description}</p>
                    <button className="btn btn-secondary mt-2" onClick={() => setSelectedPokemon(null)}>
                        Cerrar
                    </button>
                </div>
            )}
        </div>
    );
}

export default Pokedex;
