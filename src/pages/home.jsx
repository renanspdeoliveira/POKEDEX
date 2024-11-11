import React, { useEffect, useState } from 'react'
import Navbar from '../components/PokemonCard/Navbar'
import PokemonCard from '../components/PokemonCard';
import { Container, Grid } from '@mui/material';
import axios from 'axios';
import './pages.css'

const Home = () => {
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        getPokemons();
    }, []);

    const getPokemons = () => {
        var endpoint = []
        for (var i = 1; i < 100; i++) {
            endpoint.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }
        axios.all(endpoint.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
    };


    const pokemonFilter = (name) => {
        var filteredPokemon = [];
        if (name === "") {
            getPokemons();
        }
        for (var i in pokemons) {
            if (pokemons[i].data.name.includes(name)) {
                filteredPokemon.push(pokemons[i]);
            }
        }


        setPokemons(filteredPokemon);
    };

    return (
        <div  >
            <Navbar  pokemonFilter={pokemonFilter} />
            <Container  maxWidth="xg"  >
                <Grid  container spacing={3} >
                    {pokemons.map((pokemon, key) => (
                        <Grid item xs={2} key={key} >
                            <PokemonCard   name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types} />
                        </Grid >
                    ))}


                </Grid>


            </Container>

        </div>
    );
};

export default Home
