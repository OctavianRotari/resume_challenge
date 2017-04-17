var map;    // declares a global map variable

function initializeMap(locations, container, mapDiv) {

  $(container).append(mapDiv);

  var mapOptions = {
    disableDefaultUI: true
  };

  map = new google.maps.Map(document.querySelector('#map'), mapOptions);
  $('#map').prepend(HTMLplaces);

  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function () {
      //debugger;
    });

    bounds.extend(new google.maps.LatLng(lat, lon));
    map.fitBounds(bounds);
    map.setCenter(bounds.getCenter());
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  function pinPoster(locations) {
    var service = new google.maps.places.PlacesService(map);
    locations.forEach(function (place) {
      var request = {
        query: place
      };
      service.textSearch(request, callback);
    });
  }

  window.mapBounds = new google.maps.LatLngBounds();
  pinPoster(locations);
}

function getLocationsInitializeMap() {
  $.when($.get( `js/json_data/bio.json`)).done(function (data) {
    var locations = [];

    locations.push(data.contacts.location);

    data.jobs.forEach( function (job) {
      locations.push(job.location);
    });

    data.courses.forEach( function (course) {
      if (course.location) {
        locations.push(course.location);
      }
    });

    initializeWhenReady(locations, '.main', googleMap );
  });
}

function initializeWhenReady(locations, container, mapDiv) {
  $(document).ready(function () {
    initializeMap(locations, container, mapDiv);

    $('#map').on('resize', function (e) {
      map.fitBounds(mapBounds);
    });
  });
}

$('#main').one('transitionend', getLocationsInitializeMap);

$(document).ready(function () {
  $('#icon-map').click(function (evt) {
    evt.stopImmediatePropagation();
    if ($('#menu').css('display') !== 'none') {
      $('#menu').slideUp('slow', function () {
        slideUpContentInfo().promise().done(function () {
          closeIfOpen();
          $('#map').fadeIn();
          getLocationsInitializeMap();
        });
      });
    }
    else {
      $('#map').fadeIn('slow');
      getLocationsInitializeMap();
    }
  });
});
