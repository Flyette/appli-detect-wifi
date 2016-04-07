  // Centrage de la carte
  map.setView(new L.LatLng(44.5, 3.5),9);

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

  // Marqueur
  var marker = L.marker([44.5, 3.5]).addTo(map);
  marker.bindPopup("<b>Mende</b>").openPopup();

  // Cercle
  var circle = L.circle([44.4, 3.5], 5000, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(map);
  circle.bindPopup("I am a circle.");

  // Polygone
  var polygon = L.polygon([
    [44.3, 3.5],
    [44.25, 3.6],
    [44.2, 3.5]
  ]).addTo(map);
  polygon.bindPopup("I am a polygon.");

  // Popup
  var popup = L.popup()
    .setLatLng([44.0, 3.5])
    .setContent("I am a standalone popup.")
    .openOn(map);

  // Popup au clic
  var popupClick = L.popup();
  function onMapClick(e) {
    popupClick
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  }
  map.on('click', onMapClick);

  // Itinéraire
  L.Routing.control({
    waypoints: [
      L.latLng(43.2, 2.8),
      L.latLng(43.1, 2.7)
    ]
  }).addTo(map);

  // Adresses
  L.Routing.control({
    waypoints: [
      L.latLng(43.2, 2.8),
      L.latLng(43.1, 2.7)
    ],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim()
  }).addTo(map);

  // Choix d'itinéraire
  function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
  }

  map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
      startBtn = createButton('Start from this location', container),
      destBtn = createButton('Go to this location', container);

    L.popup()
      .setContent(container)
      .setLatLng(e.latlng)
      .openOn(map);
  });

  // Point de départ
  L.DomEvent.on(startBtn, 'click', function() {
    control.spliceWaypoints(0, 1, e.latlng);
    map.closePopup();
  });

  // Point d'arrivée
  L.DomEvent.on(destBtn, 'click', function() {
    control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
    map.closePopup();
  });
