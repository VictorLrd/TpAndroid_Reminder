var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
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