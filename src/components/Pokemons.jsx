import { useEffect, useState } from "react";
import PokemonDetails from "./PokemonDetail";

const typeIcons = import.meta.glob("../types/*.svg", { eager: true });

export const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

//search
function getTypeIcon(typeName) {
  for (const path in typeIcons) {
    if (path.toLowerCase().includes(typeName.toLowerCase())) {
      return typeIcons[path].default;
    }
  }
  return null;
}

export default function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPokemonID, setSelectedPokemonID] = useState(null);


  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then(async (data) => {
        const results = await Promise.all(
          data.results.map((pokemon) =>
            fetch(pokemon.url).then((res) => res.json())
          )
        );
        setPokemons(results);
      });
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row">
      <div className={`p-4 transition-all duration-1000 ${selectedPokemonID ? "md:w-4/5" : "w-full"}`}>

        <input
          type="text"
          placeholder="Rechercher un Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredPokemons.map((pokemon) => {

            const bgColor = typeColors[pokemon.types[0]?.type.name] || "#ddd";
            console.log(bgColor)


            return (
              <div
                onClick={() => {
                  if (selectedPokemonID === pokemon.id) {
                    setSelectedPokemonID(null); // Désélectionne si c'est le même
                  } else {
                    setSelectedPokemonID(pokemon.id); // Sinon sélectionne le nouveau
                  }
                }}
                key={pokemon.id}
                className={`rounded-xl shadow-lg px-4 py-6 cursor-pointer border-b-amber-950 ${bgColor} transform transition duration-300 hover:scale-105 hover:shadow-2xl`}
                style={{ backgroundColor: bgColor }}

              >

                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt={pokemon.name}
                  className="w-full h-32 object-contain mb-2"
                />

                <h2 className="text-xl font-bold capitalize text-center text-gray-800 dark:text-white">
                  {pokemon.name}
                </h2>

                <div className="flex justify-center items-center mt-2 gap-2">
                  {pokemon.types.map((typeSlot) => {
                    const typeName = typeSlot.type.name;
                    const typeIcon = getTypeIcon(typeName);
                    const bgColor = typeColors[typeName] || "#ddd";

                    return typeIcon ? (
                      <div
                        key={typeName}
                        className="w-8 h-8 flex items-center justify-center rounded-full"
                        style={{ backgroundColor: bgColor }}
                      >
                        <img
                          src={typeIcon}
                          alt={typeName}
                          title={typeName}
                          className="w-5 h-5"
                        />
                      </div>
                    ) : (
                      <span
                        key={typeName}
                        className="text-xs capitalize bg-gray-200 px-2 rounded"
                      >
                        {typeName}
                      </span>
                    );
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {selectedPokemonID && (
        <div>
          <button
            onClick={() => setSelectedPokemonID(null)}
            className="text-white z-10 w-8 fixed top-20 right-8 bg-gray-500 rounded-full p-1 shadow-md hover:bg-gray-400"
          >
            ×
          </button>

          <PokemonDetails key={selectedPokemonID} id={selectedPokemonID} />
        </div>
      )}
    </div>
  );
}
