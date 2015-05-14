Ext.define('MyMapApp.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {

        views: [
            'MyMapApp.view.Main',
            'MyMapApp.view.Favorite',
            'MyMapApp.view.Map',
            'MyMapApp.view.Plan'
        ],
        refs: {
            main: 'main',
            fav: 'myfav',
            test: 'myfav button'
        },
        control: {
            test: {
                tap: 'showBusRoute'
            }

        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        console.log("console up");
        stopMarkers = [];
    },

    showBusRoute: function(e, t) {
        console.log("hit bus " + t.getTarget().innerText);

        // show stops
        var step = {
            rt: t.getTarget().innerText,
            direction: "INBOUND"
        };
        getStops(step, function (stops) {
          for (var i = 0; i < stopMarkers.length; i++) {
            stopMarkers[i].setMap(null);
          };
          stopMarkers = [];
          for (var i = 0; i < stops.length; i++) {
            stopMarkers[stopMarkers.length] = new google.maps.Marker({
                position: stops[i].latLng,
                icon:"/mobile/images/black-dot.png",
                title:stops[i].stpnm
            });
            stopMarkers[stopMarkers.length-1].setMap(gMap);
          };
        });

        this.getMain().setActiveItem(2);
    },

});
