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
            console.log('render map');
            gMap = map;

            this.fireEvent('initText');

            var input = document.getElementById('searchTextField');
            input.value = text;
            this.getMain().setActiveItem(2);

            var cmu = new google.maps.LatLng(40.4427798, -79.9423143);
            marker = new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                title: 'test',
                position: cmu,
                map: map
            });
            map.panTo(cmu);
        }
    }

});

