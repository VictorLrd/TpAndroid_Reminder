var app = {

    //valeur du compteur
    compteur: 0,

    // Application Constructor
    initialize: function () {
        if (window.cordova) {
            //        Cas ou on est sur un peripherique cordova
            console.log("Device detected ! ");
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        } else {
            //        Cas ou on est sur un navigateur
            this.onDeviceReady();
            console.log("Browser detected ! ");
        }
    },

    onDeviceReady: function () {
        this.setDeviceReady();
        this.start();
    },

    setDeviceReady: function () {
        $("#offline").hide();
        $("#online").show();
    },

    start: function () {
        $("#compteur").html("OK!");
        setInterval(function () {
            $("#compteur").html(app.compteur++);
        }, 1000);
    }
};

app.initialize();
