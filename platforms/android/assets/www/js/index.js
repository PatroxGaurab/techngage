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
$.support.cors = true;
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
	 document.addEventListener("deviceready", this.checkLogin(), false);


        //document.addEventListener('login_div', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'

    // Update DOM on a Received Event
    checkLogin: function() {
	$.material.init();
	if( window.localStorage ) {
		var user_email=localStorage.getItem("user_email"); 
		if(user_email){
			window.location="x.html";
		}else{
			//document.getElementById("login_btn").addEventListener("click", login_func, false);
	 		document.getElementById("login_btn").addEventListener("click", this.login_func, false);
			document.getElementById("login_div").setAttribute('style', 'display:block;');

		}
	}
    },
	login_func: function()
		{
			var email=$("#email").val();
			    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			    
			if(!re.test(email))
			{
				alert("Invalid Email!");
				return false;
			}

			var imei="testimei";
//alert(email);
	$.support.cors = true;
			$.ajax({
				type: "GET",
				url: 'https://urbanclueserver-stranger.rhcloud.com/registration_server.php',
				data:{
					email: email,
					imei: imei
				},
				jsonp:"callback",
				async:true,
				dataType : 'jsonp',   
				crossDomain:true,
				success: function(data) {
//alert("success");
					if(data=="201")
					{
						alert("Email Already Registered with different device.");
						return false;
					}
					if(data=="202")
					{
						alert("Registration Failed!");
						return false;
					}
					else if(data=="200"){
						localStorage.setItem("user_email", email);
						window.location="x.html";
					}
				}

  			});
			

		}
};

app.initialize();				
