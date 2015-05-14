Ext.define('MyMapApp.view.Favorite', {
    extend: 'Ext.Container',
    fullscreen: true,
    alias: 'widget.myfav',

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
                        html: 'Current Stop: CMU'
                    },

                    {
                        xtype: 'button',
                        cls: 'change_stop_button',
                        html: 'Change the Stop'
                    }
                ]
            },
            {
                xtype: 'button',
                cls: 'bus_list_element',
                html: '<span class="bus_info"> <div class="bus_number">61A</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 5 minutes</span>',
            },
            {
                xtype: 'button',
                cls: 'bus_list_element',
                html: '<span class="bus_info"> <div class="bus_number">61B</div> <div class="bus_type">outbound</div></span> <span class="minutes"> in 8 minutes</span>',
            },
            {
                xtype: 'button',
                cls: 'bus_list_element',
                html: '<span class="bus_info"> <div class="bus_number">71B</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 10 minutes</span>',
            },
            {
                xtype: 'button',
                cls: 'bus_list_element',
                html: '<span class="bus_info"> <div class="bus_number">71D</div> <div class="bus_type">inbound</div></span> <span class="minutes"> in 13 minutes</span>',
            }
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
    
});
