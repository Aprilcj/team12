Ext.define('MyMapApp.view.Plan', {
    extend: 'Ext.form.Panel',
    fullscreen: true,
    alias: 'widget.plan',
    id: 'plan',

    config: {
		layout: 'vbox',
        items: [
            {
                name: 'start',
                html: "<div class='input_box'> <div class='input_title'>start </div> <input class='input_field' id='start_input' type='text'> </input> </div>"
            },
            {
                name: 'end',
                html: "<div class='input_box'> <div class='input_title'>end   </div> <input class='input_field' id='end_input' type='text'> </input>  </div>"
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
            	var planPanel = Ext.getCmp('plan');
            	groutes = routes;
                for (var i = 0; i < routes.routes.length; i++) {
                    if (!routes.routes[i].info) {
                        continue;
                    };
                	console.log("No." + i +": " + routes.routes[i].info);
                    var step = getFirstTransitStep(routes, i);
            		var button = new Ext.Button({
	           			cls: 'bus_list_element',
	           			index: i,
	       	            attr: 'bus_info',
	       	            html: '<span class="bus_info"> <div class="bus_number">' + routes.routes[i].info 
                        + '</div> <div class="bus_type">inbound</div></span> <span class="minutes"> '
                        + step.transit.departure_time.text + '</span>',
            		});
            		
            		button.addListener('tap', function(){
            			button.parent.fireEvent('plan_chosen_event', this.index);
            			console.log('fire event');
            		});
                    planPanel.add(button);
                    
                };
            });
        };
    });
}

