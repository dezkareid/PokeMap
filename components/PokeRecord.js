import React from 'react';

export default class PokeRecord extends React.Component{
	render(){
		let url = "public/img/"+this.props.pokemon.id+".png"
    return <li>
    	<img src={ url }></img>
    	<label>{this.props.pokemon.name}</label>
    </li>
  }
}