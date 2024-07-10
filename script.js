function getRandomPokemonId() {
    return Math.floor(Math.random() * 1010) + 1;
}

async function fetchPokemonData() {
    const pokemonId = getRandomPokemonId();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (!response.ok) {
        console.error('Failed to fetch Pokémon data:', response.statusText);
        return;
    }
    const pokemon = await response.json();
    displayPokemon(pokemon);
}

function displayPokemon(pokemon) {
    const pokemonContainer = document.getElementById('pokemon-container');
    const pokemonName = document.createElement('h1');
    const pokemonImage = document.createElement('img');

    const capitalize = str => str.name.charAt(0).toUpperCase() + str.name.slice(1);

    const capitalizedName = pokemon.name.includes('-')
        ? pokemon.name
            .split('-')
            .map(word = capitalize(word))
            .join(' ')
        : (pokemon.name.split(' ').length > 1
            ? pokemon.name
                .split(' ')
                .map(word = capitalize(word))
                .join(' ')
            : capitalize(pokemon.name)
        
    pokemonName.textContent = capitalizedName;
    pokemonName.classList.add('pokemon-name');

    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.alt = pokemon.name;
    pokemonImage.classList.add('pokemon-image');

    if (pokemonContainer.innerHTML.length > 0) {
        pokemonContainer.innerHTML = '';
    }
    
    pokemonContainer.appendChild(pokemonName);
    pokemonContainer.appendChild(pokemonImage);
}

document.addEventListener('DOMContentLoaded', fetchPokemonData);
