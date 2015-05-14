Ext.define('MyMapApp.view.Plan', {
    extend: 'Ext.form.Panel',
    fullscreen: true,
    alias: 'widget.plan',

    config: {
        items: [
            {
                items: [
                    {
                        name: 'start',
                        xtype: 'textfield',
                        label: 'Start',
                    },
                    {
                        name: 'destination',
                        xtype: 'textfield',
                        label: 'Destination',
                    },{
                        xtype: 'panel',
                        html: '<input id="searchTextField" type="text" placeholder="Enter a location">',
                    }

                ]
            },
            
        ]
    },

    listeners: [
        {
            element: 'element',
            delegate: 'div.bus_number',
            event: 'tap',
            fn: function(e, el) {
                console.log(el.innerHTML);
                var cmp = Ext.getCmp(el.id);
               // console.log(cmp.getEl().dom.innerHTML);
            }

        }
    ]
    
    function initText (map) {
        var input = document.getElementById('searchTextField');
        console.log(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        var autocomplete = new google.maps.places.Autocomplete(input);
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          var place = autocomplete.getPlace();
          console.log(place.geometry.location);
          input.place = place;
        });
    }
});
