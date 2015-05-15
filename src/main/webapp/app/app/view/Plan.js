Ext.define('MyMapApp.view.Plan', {
    extend: 'Ext.form.Panel',
    fullscreen: true,
    alias: 'widget.plan',

    config: {
        items: [
            {
                name: 'start',
                html: "start: <input id='start_input' type='text'> </input>",
            },
            {
                name: 'end',
                html: "end: <input id='end_input' type='text'> </input>"
            },
            {
                name: ''
            },
            {
                xtype: 'button',
                cls: 'bus_list_element',
                attr: 'route_info',
                html: '<span class="route_info"> <div class="bus_number">71D</div></span>',
            }
        ]
    },

    initialize : function() {
        console.log("initialize");
        Ext.Function.defer(function () {
            initText('start_input');
            initText('end_input');
        },100,this);
    }

});

function initText (textId) {
    var input = document.getElementById(textId);
    var autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'] });
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        input.place = place;

        var start =  document.getElementById('start_input');
        var end = document.getElementById('end_input');
        if (start.place && end.place) {
            console.log(start.place);
            console.log(end.place);
            getRoutes(start.place.geometry.location, end.place.geometry.location, function (routes) {
                for (var i = 0; i < routes.length; i++) {
                    console.log(routes[i]);
                };
            });
        };
    });
}