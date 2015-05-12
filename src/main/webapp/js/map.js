function getRoute(origin, destination, callback) {
  var request = {
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.TRANSIT,
    transitOptions: {
      modes: [google.maps.TransitMode.BUS]
    }
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      callback(response);
    }
  });
}

function getBuses(routes) {
  var buses = [];
  var steps = routes.routes[0].legs[0].steps;
  for (var i = 0; i < steps.length; i++) {
    if (steps[i].travel_mode == google.maps.TravelMode.TRANSIT) {
      var bus = new Object();
      bus.rt = steps[i].transit.line.short_name;
      bus.direction= getDir(steps[i]);
      console.log(bus.direction);
      buses[buses.length] = bus;
    };
  };
  return buses;
}

function getDir (step) {
  var INBOUND = "INBOUND";
  var OUTBOUND = "OUTBOUND";
  if (step.transit.headsign.toUpperCase().search(INBOUND) != -1) {
    return INBOUND;
  };
  if (step.instructions.toUpperCase().search(INBOUND) != -1) {
    return INBOUND;
  };
  return OUTBOUND;
}

function function_name (argument) {
  // body...
}