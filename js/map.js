var map,line, marker,index = 0,route = [],move, pokeMarkers = [];
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
var clickPokemon;

function initMap() {
  route.push(new google.maps.LatLng(18.157838, -95.187389));
  route.push(new google.maps.LatLng(25.657526,-100.36677400000002));
  

  map = new google.maps.Map(document.getElementById('map'), {
    center: route[0],
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  marker = new google.maps.Marker({
    position: route[0],
    icon: 'img/trainer.png',
    map: map
  });


  line = new google.maps.Polyline({
    path: route,
    map: map
  });

  move = movingAction();

  clickPokemon = function () {
    alert('Atrapaste a un '+this.getTitle());
    this.active = false;
    this.setVisible(false);
  }

  createPokemons();

  map.addListener('bounds_changed', function() {
    showMarkers();
  });

  $(document).keydown(key);
}

function key (e) {
  console.log(e);
  switch(e.which) {
    case 37: // left
      break;

    case 38: // up
      move();
      e.preventDefault();
      break;

    case 39: // right
      break;

    case 40: // down
      break;

    default: return; // exit this handler for other keys
  }
   
}

function createPokemons () {
  for (var i = 0; i < pokemons.length; i++) {
    pokeMarkers[i] = new google.maps.Marker({map: map, position: pokemons[i].position, visible:false});
    pokeMarkers[i].setTitle(pokemons[i].name);
    pokeMarkers[i].setIcon("img/"+(i+1)+".png");
    pokeMarkers[i].active = true;
    pokeMarkers[i].addListener('click',clickPokemon);
  }
}

function showMarkers () {
  console.log('show');
  var mostrar = map.getZoom() > 7;
  for (var i = 0; i < pokemons.length; i++) {
    if (map.getBounds().contains(pokeMarkers[i].getPosition())) {
      if (pokeMarkers[i].active){
        pokeMarkers[i].setVisible(mostrar);
      }
      
    }
  }
}

function movingAction () {
  var step = 0;
  var numSteps = 100;
  return function(value) {
    step = value || step+1;
    if (step>numSteps){
      return;
    }
    marker.setPosition(google.maps.geometry.spherical.interpolate(route[index],route[index+1],step/numSteps));
    map.setCenter(marker.getPosition());
    console.log(map.getCenter());
  };
  
}


