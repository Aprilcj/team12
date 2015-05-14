Ext.define('MyMapApp.view.Plan', {
    extend: 'Ext.form.Panel',
    fullscreen: true,
    alias: 'widget.plan',

    config: {
        items: [
            {
                        name: 'start',
                        html: "start: <input id='start_input' type='text'> </input>"
            },
            {
                        name: 'end',
                        html: "end: <input id='end_input' type='text'> </input>"
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
