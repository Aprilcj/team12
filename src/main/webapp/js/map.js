var directionsService = new google.maps.DirectionsService();

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
      console.log("route:");
      console.log(response);
      callback(response);
    }
  });
}


function getRoutes(origin, destination, callback) {
  var request = {
    origin: origin,
    destination: destination,
    provideRouteAlternatives: true,
    travelMode: google.maps.TravelMode.TRANSIT,
    transitOptions: {
      modes: [google.maps.TransitMode.BUS]
    }
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      var result =[];
      var resultSet = {};
      for(var i = 0; i < response.routes.length; i++){
        var lines = "";
        for(var j = 0; j < response.routes[i].legs[0].steps.length; j++){
          if(response.routes[i].legs[0].steps[j].travel_mode == "TRANSIT"){
            if(lines.length == 0){
              lines = response.routes[i].legs[0].steps[j].transit.line.short_name;
            } else {
              lines = lines + "->" + response.routes[i].legs[0].steps[j].transit.line.short_name;;
            }
          }
        }
        if(!resultSet[lines]){
          result[i] = lines;
          resultSet[lines] = true;
        }
        console.log(lines);
      }
      if (callback){
        callback(result);
      }
    }
  });
}

function getFirstTransitStep(routes, routeIndex){
  for (var i = 0; i < routes.routes[0].legs[0].steps.length; i++) {
    if (routes.routes[0].legs[0].steps[i].travel_mode == google.maps.TravelMode.TRANSIT) {
      console.log("getFirstTransitStep:" + i);
      return getStep(routes, i);
    };
  };
}

function getStep(route, stepIndex) {
  var step = route.routes[0].legs[0].steps[stepIndex];
  if (step.travel_mode == google.maps.TravelMode.TRANSIT) {
    step.rt = step.transit.line.short_name;
    step.direction = getDirection(step);
    console.log("rt:" + step.rt);
    console.log("direction:" + step.direction);
    console.log("step:");
    console.log(step);
    return step;
  };
}

function getDirection (step) {
  var INBOUND = "INBOUND";
  var OUTBOUND = "OUTBOUND";
  var direction;
  console.log("headsign = " + step.transit.headsign);
  console.log("instructions = " + step.instructions);
  if (step.transit.headsign.toUpperCase().search(INBOUND) != -1 
    || step.instructions.toUpperCase().search(INBOUND) != -1) {
    direction = INBOUND;
  }else{
    direction = OUTBOUND;
  }
  return direction;
};

function getStops (step, callback) {
  var xmlhttp = new XMLHttpRequest();
  var url = "/mobile/bus/stops?rt="+step.rt+"&dir="+step.direction;

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var stops = JSON.parse(xmlhttp.responseText)["bustime-response"].stop;
      for (var i = 0; i < stops.length; i++) {
        stops[i].latLng = new google.maps.LatLng(stops[i].lat, stops[i].lon);
      };
      console.log("stops:");
      console.log(stops);
      // stops = stopsBetween(stops, step.transit.departure_stop.location, 
      //   step.transit.arrival_stop.location);
      // console.log("after filter, stops:");
      // console.log(stops);
      if (callback) {
        callback(stops);
      };
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function getVehicles (step, callback) {
  httpGet("/mobile/bus/patterns?rt="+step.rt, function (response) {
    var patterns = JSON.parse(response)["bustime-response"].ptr;
    console.log("patterns:")
    console.log(patterns);
    patterns = filterPattern(patterns, step);
    
    httpGet("/mobile/bus/vehicles?rt="+step.rt, function (response) {
      var vehicles = JSON.parse(response)["bustime-response"].vehicle;
      console.log("vehicles");
      console.log(vehicles);

      vehicles = vehiclesMatched(vehicles, patterns);
      if (callback) {
        callback(vehicles);
      };
    });
  });
}

function getVehicle (step, callback) {
  httpGet("/mobile/bus/patterns?rt="+step.rt, function (response) {
    var patterns = JSON.parse(response)["bustime-response"].ptr;
    console.log("patterns:")
    console.log(patterns);
    patterns = filterPattern(patterns, step);
    
    httpGet("/mobile/bus/vehicles?rt="+step.rt, function (response) {
      var vehicles = JSON.parse(response)["bustime-response"].vehicle;
      console.log("vehicles");
      console.log(vehicles);

      var vehicle = nearestVehicle(vehicles, patterns);
      if (callback) {
        callback(vehicle);
      };
    });
  });
}

function vehiclesMatched (vehicles, patterns) {
  var pids = {};
  for (var i = 0; i < patterns.length; i++) {
    pids[patterns[i].pid] = true;
  };

  var vehiclesMatched = [];
  for (var i = 0; i < vehicles.length; i++) {
    if (vehicles[i].pid in pids) {
      vehicles[i].latLng = new google.maps.LatLng(vehicles[i].lat, vehicles[i].lon);
      vehiclesMatched[vehiclesMatched.length] = vehicles[i];
    };
  };
  console.log("vehiclesMatched:");
  console.log(vehiclesMatched);
  return vehiclesMatched;
}

function nearestVehicle (vehicles, patterns) {
  var pids = {};
  for (var i = 0; i < patterns.length; i++) {
    pids[patterns[i].pid] = true;
  };

  var nearestVehicle;
  var minDistance;
  for (var i = 0; i < vehicles.length; i++) {
    for (var j = 0; j < patterns.length; j++) {
      if (patterns[j].pid == vehicles[i].pid) {
        if (!patterns[j].departIndex) {
          break;
        };
        var distance =  patterns[j].pt[patterns[j].departIndex].pdist - vehicles[i].pdist;
        if (distance < 0) {
          continue;
        }
        console.log("distance = " + distance + ", minDistance = " + minDistance);
        if (!minDistance || distance < minDistance) {
          minDistance = distance;
          nearestVehicle = vehicles[i];
          nearestVehicle.latLng = new google.maps.LatLng(nearestVehicle.lat, nearestVehicle.lon);
        };
      };
    };
  };
  console.log("nearestVehicle:");
  console.log(nearestVehicle);
  return nearestVehicle;
}

function filterPattern (patterns, step) {
  var validPatterns = [];
  for (var i = 0; i < patterns.length; i++) {
    if (patterns[i].rtdir != step.direction) {
      continue;
    };
    patterns[i].pt = getPatternStops(patterns[i].pt);
    var begin = findStop(patterns[i].pt, step.transit.departure_stop.location);
    var end = findStop(patterns[i].pt, step.transit.arrival_stop.location);
    if (begin < end) {
      patterns[i].departIndex = begin;
      patterns[i].arrivalIndex = end;
      validPatterns[validPatterns.length] = patterns[i];
    };
  };
  console.log("validPatterns:");
  console.log(validPatterns);
  return validPatterns;
}

function getPatternStops (patternPoints) {
  var patternStops = [];
  for (var i = 0; i < patternPoints.length; i++) {
    if (patternPoints[i].typ == "S") {
      patternStops[patternStops.length] = patternPoints[i];
    };
  };
  console.log("patternStops:");
  console.log(patternStops);
  return patternStops;
}

function httpGet (url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        if (callback) {
          callback(xmlhttp.responseText);
        }else{
          console.log(xmlhttp.status);
        }
      }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function distanceSquare (latLng1, latLng2) {
  var deltaLat = latLng1.lat()-latLng2.lat();
  var deltaLng = latLng1.lng()-latLng2.lng();
  return deltaLat*deltaLat + deltaLng*deltaLng;
}

function findStop (stops, latLng) {
  var minDistance;
  var stopIndex;
  for (var i = 0; i < stops.length; i++) {
    if (stops[i].typ != "S") {
      continue;
    };
    var distance = distanceSquare(new google.maps.LatLng(stops[i].lat, stops[i].lon), latLng);
    if (!minDistance || minDistance > distance) {
      minDistance = distance;
      stopIndex = i;
    };
  };
  console.log("stopIndex:");
  console.log(stopIndex);
  return stopIndex;
}

function stopsBetween (stops, startLatLng, endLatLng) {
  var begin = findStop(stops, startLatLng);
  var end = findStop(stops, endLatLng);
  var validStops;
  if (begin > end) {
    validStops = stops.slice(end, begin+1);
    validStops.reverse();
  }else{
    validStops = stops.slice(begin, end+1);
  }
  return validStops;
}

function getVehicleLocation (patterns, vid, callback) {
  httpGet("/mobile/bus/predictions?vid="+vid, function (response) {
    var predictions = JSON.parse(response)["bustime-response"].prd;
    console.log("predictions");
    console.log(predictions);

    for (var i = 0; i < predictions.length; i++) {
      for (var j = 0; j < patterns.length; j++) {
        if (patterns[j].pt[patterns[j].departIndex].stpid == predictions[i].stpid) {
          if (callback) {
            callback(predictions[i]);
          };
          return;
        };
      };
    };
  });
}

function getNearByStop(origin, map, callback) {
  var request = {
    location: origin,
    radius: 2500,
    types: ['bus_station']
  };
  var service = new google.maps.places.PlacesService(map);
  service.search(request, function(response, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log("nearby station");
      console.log(response);
      callback(response);
    }
  });
}

function showRouteDetail (routes, routeIndex, map) {
  var directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);


}