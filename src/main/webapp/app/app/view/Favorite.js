Ext.define('MyMapApp.view.Favorite', {
    extend: 'Ext.Container',
    fullscreen: true,
    alias: 'widget.myfav',
    id: 'favor',

    requires: [
        'Ext.form.FieldSet',
        'Ext.Label'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'panel',
                layout: 'hbox',
                cls: 'info_panel',
                
                items:[
                    {
                        xtype: 'label',
                        cls: 'stop_info',
                        html: 'Favorite Stop: CMU'
                    },

                    {
                        xtype: 'button',
                        cls: 'change_stop_button',
                        html: 'Change the Stop',
                        attr: 'change_stop'
                    }
                ]
            },
            {
                xtype: 'button',
                cls: 'bus_list_element',
                attr: 'bus_info',
                html: '<span class="bus_info"> <div class="bus_number">61A</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 5 minutes</span>',
            },
            {
                xtype: 'button',
                cls: 'bus_list_element',
                attr: 'bus_info',
                html: '<span class="bus_info"> <div class="bus_number">61B</div> <div class="bus_type">outbound</div></span> <span class="minutes"> in 8 minutes</span>',
            },
            {
                xtype: 'button',
                cls: 'bus_list_element',
                attr: 'bus_info',
                html: '<span class="bus_info"> <div class="bus_number">71B</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 10 minutes</span>',
            },
            {
                xtype: 'button',
                cls: 'bus_list_element',
                attr: 'bus_info',
                html: '<span class="bus_info"> <div class="bus_number">71D</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 13 minutes</span>',
            }
        ]
    },

    initialize: function() {
		setInterval(function() {
		    
		}, 1000);
    }

    
});
