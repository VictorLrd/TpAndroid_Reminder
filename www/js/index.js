var app = {

    cpt: 0,
    alarmOn: false,
    interval: 1000,
    alarmOff: true,
    jsonAlarm: { "nameALarm":"1", "timeAlarm": "12:30" },
    
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
    
//    updateDom: function () {
//        $("#cpt").html(this.cpt);
//    },

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

    checkAlarm: function () {
        var heureAlarm = $("#alarmTime").html();
        var d = new Date();
        var heureActuelle = app.formatDigit(d.getHours()) + ':' + app.formatDigit(d.getMinutes());
        console.log(heureAlarm + '     ' + heureActuelle);
      
        for ()
        return (heureAlarm == heureActuelle)
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
                });//endOption
            }//endif AlarmCheck
        }//endif AlarmOff
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

        $("#btn_stop").click(function () {
            app.alarmOn = false;
            console.log(new Date() + "Next TRUE = " + (60000 - (new Date().getSeconds() * 1000) + 1000));
            setTimeout(function () {
                app.alarmOff = true;
            }, (60000 - (new Date().getSeconds() * 1000) + 1000))
        });
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
        var time = $("#data_input").value;
        var text = $("#data_text").value;
        data = JSON.stringify(this.jsonAlarm);
        
        var alarms =
        {
            id:"12345678": 
            {
                "title":title,
                "date", ""
            },
            id:"987897": 
            {
                "title":title,
                "date", ""
            }
        };
        
        var alarm =  {
                "title":text,
                "time":time
            };
        
        alarms["345678"] = alarm;
        
        for(alarm in alarms){
            var x= alarms[alarm];
        };
        
        obj = JSON.parse(data);
 
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
