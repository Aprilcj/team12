Ext.define('MyMapApp.view.Map', {
    extend: 'Ext.Map',
    alias: 'widget.mymap',

    id: 'x1',

    config: {
          mapOptions: {
             mapTypeId: google.maps.MapTypeId.ROADMAP,
             zoom: 15
         },
        useCurrentLocation: true,
    },


    listeners: {
         maprender : function(comp, map) {
            var pos = new google.maps.LatLng (40.442382, -79.942494);
            MyMapApp.view.gMap = map;
            marker = new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                position: pos,
                map: map
            });
            
            console.log('add marker');
             directionsDisplay = new google.maps.DirectionsRenderer();
             directionsService = new google.maps.DirectionsService();
             directionsDisplay.setMap(map);

             request = {
              origin: new google.maps.LatLng(40.442382, -79.942494),
              destination: new google.maps.LatLng(40.455136, -79.921186),
              travelMode: google.maps.TravelMode.TRANSIT
            };
            directionsService.route(request, function(result, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
              }
            });
            console.log('add route');
        }
    },

});

