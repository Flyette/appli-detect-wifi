$(document).ready(function() {
  $('.ui.dropdown').dropdown();
  $('.color_pays').on('click', function(e){
    e.preventDefault();
    $('body').css('background-color', $(this).attr('data-color'));
  });

  map = new L.Map('map');

  var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
  var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 18, attribution: osmAttrib});
  map.addLayer(osm);

  // Géolocalisation
  map.locate({setView: true, maxZoom: 16});

  function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
  }
  map.on('locationfound', onLocationFound);

  // Message d'erreur si la géolocalisation ne fonctionne pas
  function onLocationError(e) {
    alert(e.message);
  }
  map.on('locationerror', onLocationError);

  // Itinéraire
  L.Routing.control({
    waypoints: [
      L.latLng(43.2, 2.8),
      L.latLng(43.1, 2.7)
    ]
  }).addTo(map);

  // initmap();
});
