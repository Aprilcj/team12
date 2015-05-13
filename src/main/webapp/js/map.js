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

function getFirstTransitStep(route){
  for (var i = 0; i < route.routes[0].legs[0].steps.length; i++) {
    if (route.routes[0].legs[0].steps[i].travel_mode == google.maps.TravelMode.TRANSIT) {
      console.log("getFirstTransitStep:" + i);
      return getStep(route, i);
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
  var url = "bus/stops?rt="+step.rt+"&dir="+step.direction;

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

function getApproachingVehicle (step, callback) {
  httpGet("bus/patterns?rt="+step.rt, function (response) {
    var patterns = JSON.parse(response)["bustime-response"].ptr;
    console.log("patterns:")
    console.log(patterns);
    var pids = getPatterns(patterns, step.direction);
    
    httpGet("bus/vehicles?rt="+step.rt, function (response) {
      var vehicles = JSON.parse(response)["bustime-response"].vehicle;
      vehicles = approachingVehicles(vehicles, pids);
      var vehicle = getNearestVechile(vehicles, step.transit.departure_stop.location);
      console.log("vehicle:");
      console.log(vehicle);
      if (callback) {
        callback(vehicle);
      };
    });
  });
}

function approachingVehicles (vehicles, pids) {
  var approachingVehicles = [];
  for (var i = 0; i < vehicles.length; i++) {
    if (vehicles[i].pid in pids) {
      approachingVehicles[approachingVehicles.length] = vehicles[i];
    };
  };
  console.log("approachingVehicles:");
  console.log(approachingVehicles);
  return approachingVehicles;
}

function getNearestVechile (vehicles, myLatLng) {
  var nearestVehicle;
  var minDistance;
  for (var i = 0; i < vehicles.length; i++) {
    var vehicleLatLng = new google.maps.LatLng(vehicles[i].lat, vehicles[i].lon);
    var distance = distanceSquare(myLatLng, vehicleLatLng);
    if (!minDistance || distance < minDistance) {
      minDistance = distance;
      nearestVehicle = vehicles[i];
      nearestVehicle.latLng = vehicleLatLng;
    };
  };
  console.log("nearestVehicle:")
  console.log(nearestVehicle);
  return nearestVehicle;
}

function getPatterns (patterns, dir) {
  var pids = new Object();
  for (var i = 0; i < patterns.length; i++) {
    if (patterns[i].rtdir == dir) {
      pids[patterns[i].pid] = true;
    };
  };
  console.log("pids:");
  console.log(pids);
  return pids;
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
  var stop;
  for (var i = 0; i < stops.length; i++) {
    var distance = distanceSquare(new google.maps.LatLng(stops[i].lat, stops[i].lon), latLng);
    if (!minDistance || minDistance > distance) {
      minDistance = distance;
      stop = i;
    };
  };
  console.log("stopIndex:");
  console.log(stop);
  return stop;
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