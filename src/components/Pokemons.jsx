import { useEffect, useState } from "react";

const getTypeColor = (type) => {
  switch (type) {
    case "fire":
      return "bg-orange-500";
    case "water":
      return "bg-blue-500";
    case "grass":
      return "bg-green-500";
    case "electric":
      return "bg-yellow-400";
    case "psychic":
      return "bg-pink-500";
    case "ice":
      return "bg-cyan-300";
    case "dragon":
      return "bg-purple-600";
    case "dark":
      return "bg-gray-700";
    case "fairy":
      return "bg-pink-300";
    case "normal":
      return "bg-gray-300";
    case "fighting":
      return "bg-red-700";
    case "ground":
      return "bg-yellow-700";
    case "rock":
      return "bg-yellow-800";
    case "ghost":
      return "bg-purple-800";
    case "bug":
      return "bg-lime-600";
    case "poison":
      return "bg-purple-500";
    case "steel":
      return "bg-gray-500";
    case "flying":
      return "bg-sky-300";
    default:
      return "bg-gray-200";
  }
};

export default function Pokemons(){
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=200")
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {pokemons.map((pokemon) => {
        const type = pokemon.types[0].type.name;
        const bgColor = getTypeColor(type);
        return (
          <div
            key={pokemon.id}
            className={`rounded-xl shadow-lg p-6 text-white ${bgColor}`}
          >
            <img
              src={
                pokemon.sprites.other["official-artwork"].front_default
              }
              alt={pokemon.name}
              className="w-full h-32 object-contain mb-2"
            />
            <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
            <p className="capitalize text-sm">{type}</p>
          </div>
        );
      })}
    </div>
  );
};
