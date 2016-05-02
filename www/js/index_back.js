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
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        var parentElement = document.getElementById('deviceready');

	//parentElement.innerHTML="few";
	$("#con_id_paybill").click( function(){
window.localStorage.setItem("1","me");
	     for (i=0; i< localStorage.length; i++)

	     {

		    keyName = window.localStorage.key(i);

		    value = window.localStorage.getItem(keyName);

	      
			alert(value);
		    //var sjson=value.split('|');

	     }
alert("end");

	});
	//$("#con_id_submit").click( function(){

	//});

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
	document.getElementById("con_id_submit").addEventListener("click", function(){
	    validateLogin();
	});
	document.getElementById("con_id_logout").addEventListener("click", function(){
	    initiateLogout();
	});

	var deviceInfo = cordova.require("cordova/plugin/DeviceInformation");
	deviceInfo.get(
	   function(result) {
	      	alert(result);
	   },function() {
	      alert("error");
	});
var deviceOS  = device.platform;
alert(deviceOS);
var phoneUuid = device.uuid;
alert(phoneUuid);
    	//alert(navigator.network.connection.type);




    },



    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
 window.open("http://cesc.co.in/fss/quickpayapp/y.php");
//window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,onFileSystemSuccess, fail);
    }

};

function initiateLogout(){
	document.getElementById('my_text').value="";

	saveFileContent();

}

function validateLogin(){
	var my_con_id = document.getElementById('my_text').value;
	if(my_con_id.length==11)
	{
		document.getElementById("loading-wrapper").setAttribute('style', 'display:block;');
		var my_con_id = my_con_id;
		$.ajax({
		  jsonpCallback:'jsonpcallback',
		  contentType: "application/json",
		  dataType:'jsonp',
		  data: { 
			"con_id": my_con_id
		  },
		  type: "POST",
		  url:'http://cesc.co.in/fss/quickpayapp/con_login.php',
		  success:function(data) {

		    if(data.error=="0"){
		    	$("#addr1").html(data.addr1);
		    	$("#addr2").html(data.addr2);
		    	$("#addr3").html(data.addr3);
		    	$("#addr4").html(data.addr4);
		    	$("#addr5").html(data.addr5);
		    	$("#addr6").html(data.addr6);
			document.getElementById("loading-wrapper").setAttribute('style', 'display:none;');
			saveFileContent();
		    }else{
			alert(data.error);
			document.getElementById("loading-wrapper").setAttribute('style', 'display:none;');
		    }
		  }
		});


	}else{
		alert("Invalid Consumer Id");
	}
}
            function onFileSystemSuccess(fileSystem) {
		fileSystem.root.getDirectory("cescdata", {create: true}, gotDir);

              }
            function gotDir(dirEntry) {
		//dirEntry.getFile("lockfile.txt", {create: true}, gotFileEntry);

		dirEntry.getFile("logged_in_file.txt", {create: true}, gotFileEntryLoggedIn);
              }
         	function gotFileEntry(fileEntry) {
                fileObject = fileEntry;


		fileEntry.file(function (dbFile) {
		    var reader = new FileReader();
		    reader.onloadend = function (evt) {

			var text=evt.target.result;

			text=text.substring(0,11);

			if(text.length==11)
			{
				goToShowConsumerId(text);
			}else{
				goToEnterConsumerId();
			}
		    }
		    reader.readAsText(dbFile);
		});
		}

         	function gotFileEntryLoggedIn(fileEntry) {
                fileObjectLoggedIn = fileEntry;


		fileEntry.file(function (dbFile) {
			var my_con_id = document.getElementById('my_text').value;
		    var reader = new FileReader();
		    reader.onloadend = function (evt) {

			var text=evt.target.result;

			if(text.indexOf(my_con_id) > -1)
			{	
				alert(my_con_id+"x");
			}else{
				saveFileContentLoggedIn();
				alert(my_con_id);
			}
		    }
		    reader.readAsText(dbFile);
		});
                    //saveFileContent();

            	}

function goToEnterConsumerId(){
	document.getElementById("no_con_id").setAttribute('style', 'display:block;');
}
function goToShowConsumerId(con_id){

		document.getElementById("loading-wrapper").setAttribute('style', 'display:block;');
		$.ajax({
		  jsonpCallback:'jsonpcallback',
		  contentType: "application/json",
		  dataType:'jsonp',
		  data: { 
			"con_id": con_id
		  },
		  type: "POST",
		  url:'http://cesc.co.in/fss/quickpayapp/con_login.php',
		  success:function(data) {

		    if(data.error=="0"){
		    	$("#addr1").html(data.addr1);
		    	$("#addr2").html(data.addr2);
		    	$("#addr3").html(data.addr3);
		    	$("#addr4").html(data.addr4);
		    	$("#addr5").html(data.addr5);
		    	$("#addr6").html(data.addr6);
			document.getElementById("loading-wrapper").setAttribute('style', 'display:none;');
		    }else{
			document.getElementById("loading-wrapper").setAttribute('style', 'display:none;');
			alert(data.error);
		    }
		  }
		});

	document.getElementById("valid_con_id").setAttribute('style', 'display:block;');
	document.getElementById("show_valid_con_id").innerHTML=con_id;

}
function saveFileContent() {
                fileObject.createWriter(gotFileWriter, fail);
            }
function saveFileContentLoggedIn() {
                fileObjectLoggedIn.createWriter(gotFileWriterLoggedIn, fail);
            }            
            function gotFileWriter(writer) {
                var myText = document.getElementById('my_text').value;
                writer.write(myText);
                writer.onwriteend = function(evt) {
			document.getElementById("loading-wrapper").setAttribute('style', 'display:none;');
			if(myText.length==11){
				document.getElementById("no_con_id").setAttribute('style', 'display:none;');
				gotFileEntry(fileObject);
			}else{
				document.getElementById("no_con_id").setAttribute('style', 'display:block;');
				document.getElementById("valid_con_id").setAttribute('style', 'display:none;');
			}
                };
            }
             function gotFileWriterLoggedIn(writer) {
                var myText = document.getElementById('my_text').value;
		writer.seek(writer.length);
                writer.write(myText);
                writer.onwriteend = function(evt) {
			//document.getElementById("loading-wrapper").setAttribute('style', 'display:none;');
			if(myText.length==11){
				//document.getElementById("no_con_id").setAttribute('style', 'display:none;');
				//gotFileEntry(fileObject);
			}else{
				//document.getElementById("no_con_id").setAttribute('style', 'display:block;');
				//document.getElementById("valid_con_id").setAttribute('style', 'display:none;');
			}
                };
            }
 
function fail(error)
 {
              	  alert(error.code);
            }
function x()
{
alert("i");
}
app.initialize();
