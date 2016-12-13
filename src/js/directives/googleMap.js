angular.module('finalProject')
  .directive('googleMap', googleMap)
  .directive('googleplace', googleplace);


googleMap.$inject = ['$window'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      jobs: '='
    },
    link: function($scope, element) {
      let directionsDisplay = null;
      const directionsService = new google.maps.DirectionsService();

      directionsDisplay = new google.maps.DirectionsRenderer();
      const map = new $window.google.maps.Map(element[0], {
        center: $scope.center,
        zoom: 14
      });

      directionsDisplay.setMap(map);

      let markers = [];
      function clearMarkers() {
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];
      }

      function calcRoute(origin, destination) {
        var start = origin;
        var end = destination;
        var request = {
          origin: start,
          destination: end,
          travelMode: 'DRIVING'
        };
        directionsService.route(request, function(result, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(result);
          }
        });
      }

      $scope.$watch('jobs', () => {
        clearMarkers();
        if($scope.jobs) {
          $scope.jobs.forEach((job) => {
            // Create a marker for each job
            const marker = new $window.google.maps.Marker({
              position: { lat: parseFloat(job.location_lat), lng: parseFloat(job.location_lng) },
              map: map,
              animation: $window.google.maps.Animation.DROP
            });
            marker.addListener('click', () => {
              infoWindow.open(map, marker);
              markers.push(marker);
              // Creating googlemap latLng objects with the selected job lat and lngs
              const origin = { lat: parseFloat(job.location_lat), lng: parseFloat(job.location_lng) };
              const destination = { lat: parseFloat(job.destination_lat), lng: parseFloat(job.destination_lng) };
              // On click, we calculate the route based on the job origin and destination objects
              calcRoute(origin, destination);
            });
            const contentString = `
              <p>Value: ${job.value}</p>
              <p>Earliest Pickup: ${job.earliest_pickup}</p>
            `;
            const infoWindow = new $window.google.maps.InfoWindow({
              content: contentString
            });
          });
        }
      }, true);
    }
  };
}

googleplace.$inject = ['$window'];
function googleplace($window) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      request: '='
    },
    link: function(scope, element, attrs, model) {
      const options = {
        types: [],
        componentRestrictions: {}
      };

      const autocomplete = new $window.google.maps.places.Autocomplete(element[0], options);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const latLng = place.geometry.location.toJSON();
        console.log('element', element.attr('id'));
        const id = element.attr('id');
        if(id === 'origin-input') {
          scope.request.location_lat = latLng.lat;
          scope.request.location_lng = latLng.lng;
        } else if (id === 'destination-input') {
          scope.request.destination_lat = latLng.lat;
          scope.request.destination_lng = latLng.lng;
        }
        // scope.request.lat = latLng.lat;
        // scope.request.lng = latLng.lng;
        model.$setViewValue(element.val());
      });
    }
  };
}
