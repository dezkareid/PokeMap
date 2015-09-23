import React from 'react';

export default class PokeMap extends React.Component{
  constructor(props) {
    super(props);
    this.props.myMap = {};
    this.props.map = {};
    this.props.redControl = {};
    this.props.pokeMarkers = [];
    this.props.showMarkers = {}; 
  }

  render(){
    return <div className="unit-70" id="pokemap"></div>
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
    redControl.src = 'public/img/trainer.png';
    redControl.index = 1;
    this.props.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(redControl);
  }

  createPokemons () {
    let pokeMarker;
    let limit = this.props.wilds.length;
    let _this = this;
    let wilds = this.props.wilds;
    for (var i = 0; i < limit; i++) {
      pokeMarker = this.props.myMap.addMarker(wilds[i].position.lat,wilds[i].position.lng, wilds[i].name);
      pokeMarker.setIcon("public/img/"+wilds[i].id+".png");
      pokeMarker.indexPokemon = i;
      pokeMarker.setVisible(false);
      pokeMarker.active = true;
      pokeMarker.addListener('click',function () {
        this.active = false;
        this.setVisible(false);
        _this.props.catchThem(_this.props.wilds[this.indexPokemon]);
        alert("Capturaste a "+this.getTitle());
      });

      this.props.pokeMarkers.push(pokeMarker);
    }
  }

  showMarkers () {
    let limit = this.props.wilds.length;
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
    this.props.myMap = new DMaps(18.157838, -95.187389,'pokemap');
    this.initMap();
  }
}



