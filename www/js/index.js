var app = {

    cpt: 0,
    alarmOn: false,
    interval: 1000,
    alarmOff: true,
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
    
    formatDigit: function (int){
            if(int < 10){
                return ('0'+int);
            }
            return int;         
    },

    updateClock: function () {
        var d = new Date();
        $("#hourClock").html(app.formatDigit(d.getHours()));
        $("#minClock").html(app.formatDigit(d.getMinutes()));
        $("#secClock").html(app.formatDigit(d.getSeconds()));

    },

    checkAlarm: function () {
        var heureAlarm = $("#alarmTime").html();
        var heureActuelle = $("#hourClock").html() + ':' + $("#minClock").html();
        console.log(heureAlarm + '     ' + heureActuelle);
        if (heureAlarm == heureActuelle && !app.alarmOn) {
            
            return true;
        }
        return false;
    },
        
    checkBackGroundMode: function(){
        if (cordova.plugins.backgroundMode.isActive()) {
                console.log("Le mode background est actif !");            
                app.interval = 15000;
            } else {
                console.log("Le mode background est inactif !");
                app.updateClock();
                app.interval = 1000;
            }
            console.log("Update since : " + app.interval + " ms   "+ app.alarmOn);
            if(app.alarmOff == true){
                if (app.checkAlarm()) {
                    app.alarmOn = true;
                    $("#ModalAlarm").modal();
                }
                app.TimeOut();
            }
        
    },
        
    TimeOut : function(){
         setTimeout(function () {
            app.checkBackGroundMode();
            if (app.alarmOn) {
                navigator.vibrate(200);
            }

        }, app.interval);
    },


    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        
        console.log(window.cordova);

        //Mise en tache de fond de l'application.
        /* cordova.plugins.notification.local.schedule({
         title: 'Sync in progress',
         text: 'Copied 2 of 10 files',
         progressBar: { value: 20 }
             });*/

        window.cordova.plugins.backgroundMode.enable();

       

        cordova.plugins.backgroundMode.overrideBackButton();
        //cordova.plugins.backgroundMode.excludeFromTaskList();
        
        app.checkBackGroundMode();
        
        $("#btn_stop").click(function(){
            app.alarmOn = false;
        });


        //console.log(device.cordova);
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

        var alarmeTime;
        app.loadData;
        console.log(alarmeTime);



    },
    saveData: function (ref) {
        var data = document.getElementById("data_input").value;
        NativeStorage.set("dummy_ref_obj",
            data,
            function (result) {
                alert("Saved Data : " + result);
                $("#alarmTime").html(app.loadData);
            },
            function (e) {
                fail("Write Object Failed");
            });
    },
    loadData: function () {
        NativeStorage.getString("dummy_ref_obj",
            function (result) {
                $("#alarmTime").html(result);
            },
            function (e) {
                fail("Read Object Failed");
            });
    }
};



app.initialize();
