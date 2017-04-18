var map;

function initSmallMap(location) {
  function createSingleMarker(placeData) {
    var iFrameMap = googleMapSmall.replace('%data%', placeData.place_id);
    $('.multimedia').append(iFrameMap);
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createSingleMarker(results[0]);
    }
  }

  function pinPoster(location) {
    var service = new google.maps.places.PlacesService(map);
    var request = {
      query: location
    };
    service.textSearch(request, callback);
  }

  pinPoster(location);
}
