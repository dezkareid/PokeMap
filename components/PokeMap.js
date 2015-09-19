import React from 'react';

export default class PokeMap extends React.Component{
  constructor(props) {
    super(props);
    this.props.myMap = {};
    this.props.map = {};
    this.props.redControl = {};
    this.props.pokeMarkers = [];
    this.props.showMarkers = {};
    this.props.pokemons = props.pokemons;
  }

  render(){
    return (
      <div id="map">
      </div>
    );
  }

  initMap() {
    this.props.map = this.props.myMap.getMap();
    
  this.props.map.setZoom(4);
  this.props.myMap.removeControls()

  this.createPokemons();

  this.props.myMap.addEvent('bounds_changed', this.showMarkers());

  this.addRedControl();

  this.props.myMap.setMapStyle("APPLE");
}

  addRedControl () {
    let redControl = document.createElement('img');
    redControl.src = 'img/trainer.png';
    redControl.index = 1;
    this.props.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(redControl);
  }

  createPokemons () {
    let pokeMarker;
    let limit = this.props.pokemons.length;
    let clickPokemon = function () {
      alert('Atrapaste a un '+this.getTitle());
      this.active = false;
      this.setVisible(false);
    }
    for (var i = 0; i < limit; i++) {
      pokeMarker = this.props.myMap.addMarker(this.props.pokemons[i].position.lat,this.props.pokemons[i].position.lng, this.props.pokemons[i].name);
      pokeMarker.setIcon("img/"+(i+1)+".png");
      pokeMarker.active = true;
      pokeMarker.addEvent('click',clickPokemon);
      this.props.pokeMarkers.push(pokeMarker);
    }
  }

  showMarkers () {
    let limit = this.props.pokemons.length;
    let pokeMarkers = this.props.pokeMarkers;
    return function () {
      let mostrar = map.getZoom() > 7;
      for (let i = 0; i < limit; i++) {
        if (map.getBounds().contains(pokeMarkers[i].getPosition())) {
          if (pokeMarkers[i].active){
            pokeMarkers[i].setVisible(mostrar);
          } 
        }
      }
    }

  }

  componentDidMount(){
    this.props.myMap = new DMaps(18.157838, -95.187389,'map');
    this.initMap();
  }
}



