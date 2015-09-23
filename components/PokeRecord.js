import React from 'react';

export default class PokeRecord extends React.Component{
	render(){
    return <li>{this.props.name}</li>
  }
}