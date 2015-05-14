Ext.define('MyMapApp.view.Map', {
    extend: 'Ext.Map',
    alias: 'widget.mymap',

    config: {
          mapOptions: {
             mapTypeId: google.maps.MapTypeId.ROADMAP,
             zoom: 15
         },
        //useCurrentLocation: true,
    },
    

    listeners: {
         maprender : function(comp, map) {
            //var pos = new google.maps.LatLng (40.445703, -79.961782);
            gMap = map;
            console.log('render map');
            marker = new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                title: 'test',
                position: map.center,
                map: map
            });
            map.panTo(map.center);
        }
    }

});

