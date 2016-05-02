function initialize() {
  var pyrmont = new google.maps.LatLng(19.107567, 72.8335); // sample location to start with

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: pyrmont,
    zoom: 15
  });

  var request = {
    location: pyrmont,
    radius: 200,
    types: ['hospital', 'health'] // this is where you set the map to get the hospitals and health related places
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}
