const pokeContainer = document.getElementById('pokemon-container');
const pokeCount = 150;


const colors = {
    fire : '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting:'#E6E0D4',
    normal: '#F5F5F5'
}


const main_type = Object.keys(colors); //give the iterable object arr of keys 

const fetchPokemons = async ()=>{
    for(let i=1 ; i <= pokeCount ; i++){
        await getPokemon(i);
        
    }
    
}

const getPokemon = async (id)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    createPokemonCard(data);
    

}

const createPokemonCard = (data)=>{
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon');
    pokemonDiv.setAttribute('id',`${data.id}`);
    
    const pokemonName = data.name[0].toUpperCase() + data.name.slice(1);
    const pokemonNumber = data.id.toString().padStart('3','0');
    const pokemonType = data.types.map((ele)=>ele.type.name);
    const type = main_type.find((key)=>pokemonType.indexOf(key) > -1);  // return the first object which matches the find.
    const type2 = type[0].toUpperCase() + type.slice(1);
    const weight = data.weight;
    const colour = colors[type];
    pokemonDiv.style.backgroundColor = colour;
    const pokemonInnerHtml = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt="">
        </div>
        <div class="info">
            <span class="number">#${pokemonNumber}</span> 
            <h3 class="name">${pokemonName}</h3>
            <small class="type"><span>Type : ${type2}</span></small>
            <small class="weight">Weight :${weight} </small>
        </div>

        ` 

    pokemonDiv.innerHTML = pokemonInnerHtml;
    pokeContainer.appendChild(pokemonDiv);
    
    
    

}



fetchPokemons();


