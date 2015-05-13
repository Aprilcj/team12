# How to Use
**All examples could be found in map.html**

1. Import map.js
```
<script src="js/map.js"></script>
```

2. Get a best route, render it on map 
```
</script>
getRoute(start, end, function(route) {
  //do sth. with route
});
</script>
```

3. A route contains many steps(like walk->61D->28X), after user choosing which step(61D for example) to look into. call getStep function to get the detail
```
var step = getStep(route, 1);
```
4. After get a step, call getStops to get stop infomation.
```
getStops(step, function (stops) {
	// do sth. with stops
}
```
5. Call getVehicles to get the coming bus.
```
getVehicles(step, myLatLng, function (vehicles) {
	// do sth. with vehicles
}
```  

## PortAuthority API

### Home page:  
http://truetime.portauthority.org/bustime/apidoc/v1/main.jsp?section=documentation.jsp  

### Direction
Raw Query: http://truetime.portauthority.org/bustime/api/v1/getdirections?key=7RD4Ht3DJLWYDDyEUQNRXD7cX&rt=61D  
Shorten url: bus/directions?rt=61D

### Stops
Raw Query: 
http://truetime.portauthority.org/bustime/api/v1/getstops?key=7RD4Ht3DJLWYDDyEUQNRXD7cX&rt=61D&dir=OUTBOUND  
Shorten url: 
bus/stops?rt=61D&dir=OUTBOUND

### Routes
Raw Query: http://truetime.portauthority.org/bustime/api/v1/getroutes?key=7RD4Ht3DJLWYDDyEUQNRXD7cX  
Shorten url: bus/routes

### Vehicles
Raw Query: http://truetime.portauthority.org/bustime/api/v1/getvehicles?key=7RD4Ht3DJLWYDDyEUQNRXD7cX&rt=61D  
Shorten url: bus/vehicles?rt=61D

### Patterns
Raw Query:  
http://truetime.portauthority.org/bustime/api/v1/getpatterns?key=7RD4Ht3DJLWYDDyEUQNRXD7cX&rt=61D  
Shorten url: bus/pattern?rt=61D

### Pridictions
Raw Query: http://truetime.portauthority.org/bustime/api/v1/getprdictions?key=7RD4Ht3DJLWYDDyEUQNRXD7cX&vid=6030  
Shorten url: bus/prdictions?vid=6030