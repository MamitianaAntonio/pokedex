import { useEffect, useState } from "react";
import axios from "axios";
import { typeColors } from "./Pokemons";
// import { getTypeColor, typeColors } from "./Pokemons";

function PokemonDetails({ id }) {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
        axios.get(URL).then((response) => {
            setPokemon(response.data);
        });
    }, []);


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    console.log(pokemon)

    if (pokemon) {

        return (
            <div className={`w-100 p-8 sticky top-14 h-screen shadow-2xl`}>
                <div className="flex flex-col gap-8 ">
                    <div>

                        <div className="flex gap-3 items-center mb-4">
                            <img
                                className="w-30 p-3 rounded-2xl bg-[url('components/pokemon.jpg')] bg-cover bg-center"
                                src={pokemon.sprites.other["official-artwork"].front_default}
                                alt={pokemon.name} />
                            <div className="text-3xl">
                                <p>#{pokemon.id}</p>
                                <p>{capitalizeFirstLetter(pokemon.name)}</p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-4">
                            {pokemon.types.map((type) => {
                                console.log(type.type.name)
                                
                                const bgColor = typeColors[type.type.name];
                                console.log(bgColor)

                                return (
                                    <ul>
                                        < li
                                            className={`px-5 py-1 rounded-lg text-white ${bgColor}`}
                                            key={type.type.name} >
                                            {type.type.name}
                                        </li>

                                    </ul>
                                )
                            }
                            )}
                        </div>
                    </div>
                    <ul>
                    <h2 className="text-2xl font-bold">Stats</h2>
                        {pokemon.stats.map((stat) => (
                            <div className="w-full">
                                <div className="flex justify-between">
                                    <li key={stat.stat.name}>
                                        {stat.stat.name}
                                    </li>
                                    <li>
                                        {stat.base_stat}
                                    </li>
                                </div>
                                <div className="rounded-2xl h-5 w-full bg-gray-400">
                                    <div
                                        className={`h-5 max-w-full rounded-2xl
                                            ${stat.base_stat <= 30 ? 'bg-red-600' :
                                                stat.base_stat <= 50 ? 'bg-amber-500' :
                                                    stat.base_stat <= 70 ? 'bg-yellow-500' :
                                                        'bg-green-500'
                                            }`}
                                        style={{ width: `${stat.base_stat}%` }}
                                    ></div>
                                </div>
                            </div>

                        ))}
                    </ul>
                </div>
                {console.log(pokemon)}

            </div >
        );
    }
}


export default PokemonDetails;