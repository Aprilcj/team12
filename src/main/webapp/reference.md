# Reference
## PAAC account
account:team12ebiz@gmail.com  
password:team12  
KEY:7RD4Ht3DJLWYDDyEUQNRXD7cX

## PAAC Home Page
http://truetime.portauthority.org/bustime/apidoc/v1/main.jsp?section=documentation.jsp

## Direction
**URL**:  
http://truetime.portauthority.org/bustime/api/v1/getdirections?key=7RD4Ht3DJLWYDDyEUQNRXD7cX&rt=61D  
**API**:  
bus/directions?rt=61D

## Stops
**URL**: 
http://truetime.portauthority.org/bustime/api/v1/getstops?key=7RD4Ht3DJLWYDDyEUQNRXD7cX&rt=61D&dir=OUTBOUND  
**API**: 
bus/stops?rt=61D&dir=OUTBOUND

## Routes
**URL**:  
http://truetime.portauthority.org/bustime/api/v1/getroutes?key=7RD4Ht3DJLWYDDyEUQNRXD7cX  
**API**:  
bus/routes

## Vehicles
**URL**:  
http://truetime.portauthority.org/bustime/api/v1/getvehicles?key=7RD4Ht3DJLWYDDyEUQNRXD7cX&rt=61D  
**API**:  
bus/vehicles?rt=61D

## Patterns
**URL**:  
http://truetime.portauthority.org/bustime/api/v1/getpatterns?key=7RD4Ht3DJLWYDDyEUQNRXD7cX&rt=61D  
**API**:  
bus/pattern?rt=61D

## Pridictions
**URL**:  
http://truetime.portauthority.org/bustime/api/v1/getprdictions?key=7RD4Ht3DJLWYDDyEUQNRXD7cX&vid=6030  
**API**:  
bus/prdictions?vid=6030

## How to Use
1. import map.js
```javascript
<script src="js/map.js"></script>
```

2. Get a best route, render it on map 
```javascript
</script>
getRoute(start, end, function(route) {
  //directionsDisplay.setDirections(route);
});
</script>
```

3. A route contains many steps(like walk->61D->28X), after user choosing which step(61D for example) to look into. call getStep function to get the detail
```javascript
var step = getStep(route, 1);
```
4. 