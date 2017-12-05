var app = {

    cpt: 0,
    alarmOn: false,
    interval: 1000,
    alarmOff: true,
    alarmLocal: [],
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

    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    formatDigit: function (int) {
        if (int < 10) return ('0' + int);
        return int;
    },

    updateClock: function () {
        var d = new Date();
        $("#hourClock").html(app.formatDigit(d.getHours()));
        $("#minClock").html(app.formatDigit(d.getMinutes()));
        $("#secClock").html(app.formatDigit(d.getSeconds()));
    },

    updateLocalAlarm: function () {
        console.log("Maj alarm save");
        alarm1 = $("#data_input0").html();
        alarm2 = $("#data_input1").html();
        alarm3 = $("#data_input2").html();
        app.alarmLocal = [alarm1, alarm2, alarm3];
        app.saveData();
    },

    updateAlarmDom: function () {
        console.log("Maj alarm DOM");
        $("#data_input1").html(app.alarmLocal[0]);
        $("#data_input2").html(app.alarmLocal[1]);
        $("#data_input3").html(app.alarmLocal[2]);
    },

    checkAlarm: function () {
        var heureAlarm = $("#alarmTime").html();
        var d = new Date();
        var heureActuelle = app.formatDigit(d.getHours()) + ':' + app.formatDigit(d.getMinutes());
        console.log(heureAlarm + '     ' + heureActuelle);
        for (i = 0; i < app.alarmLocal.size; i++) {
            if (app.alarmLocal[i] == heureAlarm) {
                return app.checkIfAlarmIsActivated(i);
            }
        };
        return false;
    },

    checkIfAlarmIsActivated: function (int) {
        if ($("#checkAlarm" + int).attr('checked')) {
            return true;
        } else {
            return false
        }
    },

    checkBackGroundMode: function () {
        if (cordova.plugins.backgroundMode.isActive()) {
            console.log("BackG = ON");
            if (app.checkAlarm() && app.alarmOn) app.interval = 1000;
            else app.interval = 15000;
        } else {
            console.log("BackG = OFF");
            app.updateClock();
            app.interval = 1000;
        }
        console.log("Update since : " + app.interval + " ms   ON = " + app.alarmOn + " / OFF = " + app.alarmOff);
        if (app.alarmOff) {
            if (app.checkAlarm()) {
                app.alarmOn = true;
                app.alarmOff = false;
                $("#ModalAlarm").modal();

                cordova.plugins.notification.local.schedule({
                    title: 'My first notification',
                    text: 'Thats pretty easy...',
                    actions: [
                        {
                            id: 'btn_stop',
                            title: 'Yes'
                        },
                        {
                            id: 'No',
                            title: 'No'
                        }
                    ]
                    // foreground: true
                });
                //                cordova.plugins.notification.local.schedule({
                //                    text: "Single Notification",
                //                    sound:'file://happy',
                //                });
            }
        }
        app.TimeOut();
    },

    TimeOut: function () {
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
        window.cordova.plugins.backgroundMode.enable();
        cordova.plugins.backgroundMode.overrideBackButton();
        cordova.plugins.backgroundMode.excludeFromTaskList();
        app.checkBackGroundMode();
        app.loadData(); //recuperation des alarm Stocké
        app.updateAlarmDom(); //Maj des alarm dans le DOM

        $("#btn_stop").click(function () {
            app.alarmOn = false;
            console.log(new Date() + "Next TRUE = " + (60000 - (new Date().getSeconds() * 1000) + 1000));
            setTimeout(function () {
                app.alarmOff = true;
            }, (60000 - (new Date().getSeconds() * 1000) + 1000))
        });
        
        $("#test").click(function () {
        if (typeof Media == 'undefined')
            return;
        console.log("playStartupSound");
        var media = new Media(cordova.file.applicationDirectory + 'www/sounds/pleur.mp3',
            // success callback
            function () {
                console.log("Audio Success");
            },
            // error callback
            function (err) {
                alert("Audio Error: " +JSON.stringify(err) );
            });
        media.play();
    });
        
        var media = new Media()

        $(".alarm").change(app.updateLocalAlarm()); //Maj de la var sur modification des champ de cette classe 
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        //  document.getElementById("btn_load").onclick = app.loadData;
        //  document.getElementById("btn_save").onclick = app.saveData;

        //    var alarmeTime;
        app.loadData;
        
    },

    saveData: function (ref) {

        app.updateLocalAlarm(); // Maj de la var alarmLocal

        NativeStorage.set("alarm", //save de var alarmLocal
            app.alarmLocal,
            function (result) {
                alert("Saved Data : " + app.alarmLocal);
                //                $("#alarmTime").html(app.loadData);
            },
            function (e) {
                fail("Write Object Failed");
            });
    },

    loadData: function () {
        NativeStorage.getString("alarm",
            function (result) {
                app.alarmLocal = result; // Maj de la var alarmLocal
                app.updateAlarmDom(); // Maj du DOM
            },
            function (e) {
                fail("Read Object Failed");
            });
    }
};



app.initialize();
