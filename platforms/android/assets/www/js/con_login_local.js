
function validate_con_id(){

	     for (i=0; i< localStorage.length; i++)
	     {

		    keyName = window.localStorage.key(i);

		    value = window.localStorage.getItem(keyName);
		    var con_id_split=keyName.split("_");
			if(con_id_split[0]=="conIdBillPayLastLogin")
			{
				alert("conIdBillPayLastLogin_"+value);
				window.localStorage.setItem("conIdBillPayLastLogin_"+value,value);		
				
			}
			alert(value+"key_"+keyName);


	     }	
		alert("No Saved Item!!");
		window.location="http://cesc.co.in/fss/quickpayapp/y.php";
}

validate_con_id();
