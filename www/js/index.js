var app = {

    cpt: 0,
    // Application Constructor
    initialize: function () {
        this.bindEvents();
        if (window.cordova) {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        } else {
            this.onDeviceReady();
            console.log("navigateur")
        }
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },

    start: function () {
        $("#cpt").html("OK!");
        setInterval(function () {
            this.cpt++;
            this.updateDom();
        }.bind(this), 1000);
    },

    updateDom: function () {
        $("#cpt").html(this.cpt);
    },

    updateClock: function () {
        var d = new Date();
        $("#hourClock").html(d.getHours());
        $("#minClock").html(d.getMinutes());
    },

    onDeviceReady: function () {
        var interval = 5000;
        console.log(window.cordova);
       
        //Mise en tache de fond de l'application.
        window.cordova.plugins.backgroundMode.enable();
        
        setInterval(function () {
            if (cordova.plugins.backgroundMode.isActive()) {
                console.log("Le mode background est actif !");
                interval = 15000;
            } else {
                console.log("Le mode background est inactif !");
                app.updateClock();
                interval = 5000;
            }
            console.log("Update since : "+ interval +" ms")
        }, interval);

        cordova.plugins.backgroundMode.overrideBackButton();
        cordova.plugins.backgroundMode.excludeFromTaskList();



        //console.log(device.cordova);
        this.setDeviceReady();
        this.start();

    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);


        document.getElementById("btn_load").onclick = app.loadData;
        document.getElementById("btn_save").onclick = app.saveData;


    },
    saveData: function () {
        var data = document.getElementById("data_input").value;
        NativeStorage.set("dummy_ref_obj",
            data,
            function (result) {
                alert("Saved Data : " + result);
            },
            function (e) {
                fail("Write Object Failed");
            });
    },
    loadData: function () {
        NativeStorage.getString("dummy_ref_obj",
            function (result) {
                alert("Current Stored Value was: " + result);
            },
            function (e) {
                fail("Read Object Failed");
            });
    }
};

app.initialize();