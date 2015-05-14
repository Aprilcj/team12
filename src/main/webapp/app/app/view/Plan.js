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
                        label: 'Start'
                    },
                    {
                        name: 'destination',
                        xtype: 'textfield',
                        label: 'Destination'
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
    
});
