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
            fav_bus: 'myfav button[attr=bus_info]',
            plan_bus: 'plan button[attr=bus_info]',
            change_stop: 'myfav button[attr=change_stop]'
        },
        control: {
        	fav_bus: {
                tap: 'showBusRoute'
            },
            
            plan_bus:{
            	tap: 'showBusRoute'
            },
        	
            change_stop: {
            	tap: 'showStops'
        	}

        }
    },
    
    // called when the Application is launched, remove if not needed
    launch: function(app) {
        console.log("controller up");
        console.log("button: " + this.getChange_stop());
        
        stopMarkers = [];
    },

    showStops: function() {
    	for (var i = 0; i < stopMarkers.length; i++) {
    		stopMarkers[i].setMap(null);
    	}
    	
    	var bus_stop1 = new google.maps.Marker({
    		position: new google.maps.LatLng (40.443765, -79.938616),
    		icon:"/mobile/images/icon_borderedbus.png",
    		title:"Forbes Ave at Beeler St"
    	});
    	
    	var bus_stop2 = new google.maps.Marker({
    		position: new google.maps.LatLng (40.444598, -79.945922),
    		icon:"/mobile/images/icon_borderedbus.png",
    		title:"Forbes Ave Opp Hamburg Hall"
    	});
    	
    	bus_stop1.setMap(gMap);
    	bus_stop2.setMap(gMap);
    	stopMarkers[0] = bus_stop1;
    	stopMarkers[1] = bus_stop2;
    	
    	google.maps.event.addListener(bus_stop1, 'click', function() {    		
    		controller.renewBuses(1);
		});
    	
    	google.maps.event.addListener(bus_stop2, 'click', function() {    		
    		controller.renewBuses(2);
		});
    	    	
    	this.getMain().setActiveItem(2);
    },
    
    renewBuses: function(number) {
    	var favPanel = Ext.getCmp('favor');
		favPanel.removeAll(); 
    	if (number == 1) {
  
    		var panel1 = new Ext.Panel({
    			layout: 'hbox',
    			cls: 'info_panel',
            
	            items:[
	                {
	                    xtype: 'label',
	                    cls: 'stop_info',
	                    html: 'Current Stop: Forbes Ave at Beeler St'
	                },
	
	                {
	                    xtype: 'button',
	                    cls: 'change_stop_button',
	                    html: 'Change the Stop',
	                    attr: 'change_stop'	
	                }
	            ]
    		});
    		
    		var button1 = new Ext.Button({
    			 cls: 'bus_list_element',
	            attr: 'bus_info',
	            html: '<span class="bus_info"> <div class="bus_number">61A</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 5 minutes</span>',
    		});
    		
    		var button2 = new Ext.Button({
    			 cls: 'bus_list_element',
	            attr: 'bus_info',
	            html: '<span class="bus_info"> <div class="bus_number">61B</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 15 minutes</span>',
    		});
    		    		
    		var button3 = new Ext.Button({
    			 cls: 'bus_list_element',
	            attr: 'bus_info',
	            html: '<span class="bus_info"> <div class="bus_number">61C</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 13 minutes</span>',
    		});
    		    		    		
    		var button4 = new Ext.Button({
    			 cls: 'bus_list_element',
	            attr: 'bus_info',
	            html: '<span class="bus_info"> <div class="bus_number">61D</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 7 minutes</span>',
    		});
    		favPanel.add(panel1);
    		favPanel.add(button1);
    		favPanel.add(button2);
    		favPanel.add(button3);
    		favPanel.add(button4);
    	} else if (number == 2) {
    		var panel1 = new Ext.Panel({
    			layout: 'hbox',
    			cls: 'info_panel',
            
	            items:[
	                {
	                    xtype: 'label',
	                    cls: 'stop_info',
	                    html: 'Current Stop: Forbes Ave Opp Hamburg Hall'
	                },
	
	                {
	                    xtype: 'button',
	                    cls: 'change_stop_button',
	                    html: 'Change the Stop',
	                    attr: 'change_stop'	
	                }
	            ]
    		});
    		
    		var button1 = new Ext.Button({
    			 cls: 'bus_list_element',
	            attr: 'bus_info',
	            html: '<span class="bus_info"> <div class="bus_number">28X</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 5 minutes</span>',
    		});
    		
    		var button2 = new Ext.Button({
    			 cls: 'bus_list_element',
	            attr: 'bus_info',
	            html: '<span class="bus_info"> <div class="bus_number">58</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 15 minutes</span>',
    		});
    		    		
    		var button3 = new Ext.Button({
    			 cls: 'bus_list_element',
	            attr: 'bus_info',
	            html: '<span class="bus_info"> <div class="bus_number">61A</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 13 minutes</span>',
    		});
    		    		    		
    		var button4 = new Ext.Button({
    			 cls: 'bus_list_element',
	            attr: 'bus_info',
	            html: '<span class="bus_info"> <div class="bus_number">61B</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 7 minutes</span>',
    		});
    		
    		var button5 = new Ext.Button({
    			 cls: 'bus_list_element',
	            attr: 'bus_info',
	            html: '<span class="bus_info"> <div class="bus_number">61C</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 7 minutes</span>',
    		});
    		    		
    		var button6 = new Ext.Button({
    			 cls: 'bus_list_element',
	            attr: 'bus_info',
	            html: '<span class="bus_info"> <div class="bus_number">61D</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 7 minutes</span>',
    		});
    		    		    		
    		var button7 = new Ext.Button({
    			 cls: 'bus_list_element',
	            attr: 'bus_info',
	            html: '<span class="bus_info"> <div class="bus_number">67</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 7 minutes</span>',
    		});

    		var button8 = new Ext.Button({
    			 cls: 'bus_list_element',
	            attr: 'bus_info',
	            html: '<span class="bus_info"> <div class="bus_number">69</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 7 minutes</span>',
    		});
    		
    		favPanel.add(panel1);
    		favPanel.add(button1);
    		favPanel.add(button2);
    		favPanel.add(button3);
    		favPanel.add(button4);
    		favPanel.add(button5);
    		favPanel.add(button6);
    		favPanel.add(button7);
    		favPanel.add(button8 );
    		
    	}
    	
    	this.getMain().setActiveItem(0);
    },


    showBusRoute: function(e, t) {
    	var bus_number = t.getTarget().innerText.split(/\s/)[0];
    	var bus_bound = t.getTarget().innerText.split(/\s/)[1].toUpperCase();
        console.log(bus_number + ", " + bus_bound);

        // show stops
        var step = {
            rt: bus_number,
            direction: bus_bound
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
