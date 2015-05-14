Ext.define('MyMapApp.view.Favorite', {
    extend: 'Ext.Container',
    fullscreen: true,
    alias: 'widget.myfav',

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'button',
                html: '<div id="test">61C</div>',
                flex: 1
            },
            {
                xtype: 'button',
                html: '<div id="test">61A</div>',
                flex: 1
            },
            {
                xtype: 'button',
                html: '<div class="bus_number">71D</div>',
                flex: 1
            },
            {
                xtype: 'button',
                html: '<div id="test">71B</div>',
                flex: 1
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
