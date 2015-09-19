var pokeMarkers = [];
var map;
var pokemons = [
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
var redControl,clickPokemon;

function initMap() {
  map = myMap.getMap();
  map.setZoom(4);
  myMap.removeControls()
  clickPokemon = function () {
    alert('Atrapaste a un '+this.getTitle());
    this.active = false;
    this.setVisible(false);
  }

  createPokemons();

  myMap.addEvent('bounds_changed', function() {
    showMarkers();
  });
  addRedControl();

  myMap.setMapStyle("APPLE");
}

function addRedControl () {
  redControl = document.createElement('img');
  redControl.src = 'img/trainer.png';
  redControl.index = 1;
  myMap.getMap().controls[google.maps.ControlPosition.BOTTOM_LEFT].push(redControl);
}

function createPokemons () {
  var pokeMarker;
  for (var i = 0; i < pokemons.length; i++) {
    pokeMarker = myMap.addMarker(pokemons[i].position.lat,pokemons[i].position.lng, pokemons[i].name);
    pokeMarker.setIcon("img/"+(i+1)+".png");
    pokeMarker.active = true;
    pokeMarker.addEvent('click',clickPokemon);
    pokeMarkers.push(pokeMarker);
  }
}

function showMarkers () {
  var mostrar = map.getZoom() > 7;
  for (var i = 0; i < pokemons.length; i++) {
    if (myMap.getMap().getBounds().contains(pokeMarkers[i].getPosition())) {
      if (pokeMarkers[i].active){
        pokeMarkers[i].setVisible(mostrar);
      }
      
    }
  }
}

var myMap = new DMaps(18.157838, -95.187389,'map',initMap);




