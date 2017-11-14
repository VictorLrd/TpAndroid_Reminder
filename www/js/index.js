/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    cpt : 0,
    // Application Constructor
    initialize: function() {
      if(window.cordova){
          document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        }
        else {
          this.onDeviceReady();
          console.log("navigateur")
        }
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.

    setDeviceReady : function(){
        $("#Online").show();
        $("#Offline").hide();
    },

    start : function(){
        $("#cpt").html("OK!");
        setInterval(function(){
          this.cpt++;
          this.updateDom();
        }.bind(this),1000);
    },

    updateDom: function(){
      $("#cpt").html(this.cpt);
    },


    onDeviceReady: function() {
        //console.log(device.cordova);
        this.setDeviceReady();
        this.start();

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


var names = ["gilbert","robert","gilles"];
var contact = {
  name: "borris",
  location: "toulouse",
  pseudo: "borrisKiller",
  getLocation : function(){
    console.log("my location :"+this.location);
  },
  setLocation : function(location){
    this.location=location;
  }
};

console.log(names);
console.log(contact);
console.log(contact.location);
contact.setLocation("Marseille");
console.log(contact.location);
