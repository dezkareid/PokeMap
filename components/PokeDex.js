import React from 'react';
import PokeRecord from './PokeRecord';

export default class PokeDex extends React.Component{

	render(){
		return <div className="unit-30">
			<ul  id="pokedex">
      {
        this.props.pokemons.map((pokemon) => {
          return <PokeRecord name={pokemon.name}/>
        })
      }
    	</ul>
    </div>
	}
}