import React from 'react';
import PokeMap from './PokeMap';
import PokeDex from './PokeDex';

export default class PokeGame extends React.Component{
	constructor(props){
		super(props);
		this.state = { pokemons: [] };
		this.catchThem = this.catchThem.bind(this);
	}

	componentWillMount(){
		this.props.wilds = [
			{ name: "Bulbasaur", position: {lat: 19.541980, lng: -96.927581} },
		  { name: "Yvisaur", position: {lat: 20.223488, lng: -97.956551} },
		  { name: "Venusaur", position: {lat: 21.088393, lng: -98.713452} },
		  { name: "Charmander", position: {lat: 22.288521, lng: -100.669963} },
		  { name: "Charmeleon", position: {lat: 24.072572, lng: -100.636729} },
		  { name: "Charizard", position: {lat: 25.657715,  lng: -100.366785} },
		  { name: "Squirtle", position: {lat: 19.444299, lng: -96.189209} },
		  { name: "Warturtle", position: {lat: 19.703085, lng: -96.255126} },
		  { name: "Blastoise", position: {lat: 19.081306, lng: -95.826660} }
		];
	}

	catchThem(pokemon){
		this.state.pokemons.push(pokemon);
    let pokemons = this.state.pokemons;
    this.setState({ pokemons: pokemons });
	}

	render(){
		return <div className="pokegame">
			<PokeMap pokemons={this.state.pokemons} wilds={this.props.wilds} catchThem={ this.catchThem }></PokeMap>
			<PokeDex pokemons={this.state.pokemons}></PokeDex>
		</div>
	}
}