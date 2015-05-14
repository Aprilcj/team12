Ext.define('MyMapApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'MyMapApp.view.Favorite',
        'MyMapApp.view.Plan'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                xtype: 'container',
                title: 'Favorites',
                iconCls: 'favorites',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'My Favorite routes'
                    },
                    {
                        xtype: 'myfav',
                        height: '100%',
                        width: '100%'
                    }
                ]
            },   
            {
                xtype: 'container',
                title: 'Plan Route',
                iconCls: 'locate',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Plan Your Route'
                    },
                    {
                        xtype: 'plan',
                        height: '100%',
                        width: '100%'
                    }
                ]
            },           
            {
                xtype: 'container',
                title: 'Map',
                iconCls: 'home',

                items: [
                    {
                        xtype: 'mymap',
                        height: '100%',
                        width: '100%'
                    }
                ]
            }
        ]
    }
});
