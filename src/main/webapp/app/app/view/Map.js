Ext.define('MyMapApp.view.Map', {
    extend: 'Ext.Map',
    alias: 'widget.mymap',

    id: 'x1',

    config: {
		useCurrentLocation: true,
          mapOptions: {
             mapTypeId: google.maps.MapTypeId.ROADMAP,
             zoom: 15
         },

    },
    


    listeners: {
         maprender : function(comp, map) {
    		console.log('add route');
            var pos = new google.maps.LatLng (40.442761, -79.941931);
            map.setCenter(pos);
            gMap = map;
            
            
// marker = new google.maps.Marker({
// animation: google.maps.Animation.DROP,
// position: pos,
// map: map
// });
//            
// console.log('add marker');
// directionsDisplay = new google.maps.DirectionsRenderer();
// directionsService = new google.maps.DirectionsService();
// directionsDisplay.setMap(map);
//
// request = {
// origin: new google.maps.LatLng(40.442382, -79.942494),
// destination: new google.maps.LatLng(40.455136, -79.921186),
// travelMode: google.maps.TravelMode.TRANSIT
// };
// directionsService.route(request, function(result, status) {
// if (status == google.maps.DirectionsStatus.OK) {
// directionsDisplay.setDirections(result);
// }
// });
        }
    },

});

