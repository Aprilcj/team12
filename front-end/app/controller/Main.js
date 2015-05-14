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
            test: 'myfav button'
        },
        control: {
            test: {
                tap: 'showBusRoute'
            }

        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        console.log("console up");

    },

    showBusRoute: function(e, t) {
        console.log("hit bus " + t.getTarget().innerText);
        this.getMain().setActiveItem(2);
    }
});
