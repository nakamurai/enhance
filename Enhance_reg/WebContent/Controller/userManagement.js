$(document).ready(function(){
	
	var addClassAsOfTabs = function(childNo){
		
		
		$("div#tabs ul").each(function(){
			$("li",this).removeClass("TabsActive");
			$("li",this).eq(childNo).addClass("TabsActive");
		});
	};
	
	// -------------createhtmlTable-------------//
	var createhtmlTable = function(data){
    	//alert("test panel table");
		var htmlTable = "";
		var htmlTable="<table class='table table-striped table-bordered' id='htmlTable'>";
				htmlTable+="<thead>";
					htmlTable+="<tr>";
						htmlTable+="<th>";
 						htmlTable+="ID";
 						htmlTable+="</th>";

 						htmlTable+="<th data-field=\"first_name\">";
 						htmlTable+="First Name";
 						htmlTable+="</th>";
 		
 						htmlTable+="<th data-field=\"last_name\">";
 						htmlTable+="Last Name";
 						htmlTable+="</th>";

 						htmlTable+="<th data-field=\"status\">";
 						htmlTable+="Status";
 						htmlTable+="</th>";

 						htmlTable+="<th data-field=\"role_id\">";
 						htmlTable+="Role";
 						htmlTable+="</th>";

 						htmlTable+="<th data-field=\"province\">";
 						htmlTable+="Province";
 						htmlTable+="</th>";

 						htmlTable+="<th>";
 						htmlTable+="Action";
 						htmlTable+="</th>";
					htmlTable+="</tr>";
				htmlTable+="</thead>";
				htmlTable+="<tbody>";

			$.each(data,function(index,indexEntry){
					htmlTable+="<tr>";
						htmlTable+="<th scope='row'>";
			 				htmlTable+="1";
			 			htmlTable+="</th>";
				 		htmlTable+="<td>";
			 				htmlTable+=indexEntry[2];
			 			htmlTable+="</td>";
			 			htmlTable+="<td>";
			 				htmlTable+=indexEntry[3];
			 			htmlTable+="</td>";
			 			htmlTable+="<td>";
			 				htmlTable+=indexEntry[6];
			 			htmlTable+="</td>";
			 			htmlTable+="<td>";
			 				htmlTable+=indexEntry[7];
			 			htmlTable+="</td>";
			 			htmlTable+="<td>";
			 				htmlTable+=indexEntry[5];
			 			htmlTable+="</td>";
			 			htmlTable+="<td>";
			 				htmlTable+="<input class='btn btn-info id-"+indexEntry[0]+"' type='button' data-toggle='modal' data-target='#myModal' onclick='editsubject()' value='Edit'>";
			 				htmlTable+="<input class='btn btn-danger id-"+indexEntry[0]+"' type='button' value='Delete'>";
			 			htmlTable+="</td>";
			 		htmlTable+="</tr>";
			});

 				htmlTable+="</tbody>";
 			htmlTable+="</table>";

 	$("#Panel_Table").html(htmlTable);
	};
	
	// -------------select Province-------------//
	var procince_err = new Array("Bangkok", "Amnat Charoen", "Ang Thong", "Buriram", "Chachoengsao", "Chai Nat", "Chaiyaphum", "Chanthaburi", "Chiang Mai", "Chiang Rai", "Chon Buri", "Chumphon", "Kalasin", "Kamphaeng Phet", "Kanchanaburi", "Khon Kaen", "Krabi", "Lampang", "Lamphun", "Loei", "Lop Buri", "Mae Hong Son", "Maha Sarakham", "Mukdahan", "Nakhon Nayok", "Nakhon Pathom", "Nakhon Phanom", "Nakhon Ratchasima", "Nakhon Sawan", "Nakhon Si Thammarat", "Nan", "Narathiwat", "Nong Bua Lamphu", "Nong Khai", "Nonthaburi", "Pathum Thani", "Pattani", "Phangnga", "Phatthalung", "Phayao", "Phetchabun", "Phetchaburi", "Phichit", "Phitsanulok", "Phra Nakhon Si Ayutthaya", "Phrae", "Phuket", "Prachin Buri", "Prachuap Khiri Khan", "Ranong", "Ratchaburi", "Rayong", "Roi Et", "Sa Kaeo", "Sakon Nakhon", "Samut Prakan", "Samut Sakhon", "Samut Songkhram", "Sara Buri", "Satun");

	function getProvince(provinceElementId) {
	    var provinceElement = document.getElementById(provinceElementId);
	    provinceElement.length = 0;
	    provinceElement.options[0] = new Option('เลือกจังหวัด', '-1');
	    provinceElement.selectedIndex = 0;
	    for (var i = 0; i < procince_err.length; i++) {
	        provinceElement.options[provinceElement.length] = new Option(procince_err[i], procince_err[i]);
	    }
	};
	
	// -------------insert object-------------//
 	function insertsubject() {
		
 		$.ajax({
 			url: "http://192.168.1.49:8082/niems/Model/user/insert.jsp?callback=?",
 			type: "post",
 			dataType: "jsonp",
 			data:{"user_name":$("#input-name").val(), "password":$("#input-fname").val(), "prefix":$("#inputinit").val(), "first_name":$("#input-fname").val(), "last_name":$("#input-lname").val(), "email":$("#input-email").val(), "province":"Bangkok", "status":"false", "position":$("#input-pos1").val(), "organization":$("#input-pos").val(), "user_items":"2", "role_id":"2"},
 			success:function(data){
 				if(data != null){
 					
 						alert("insert complate");
 					
 	    			}else{
 	    				
 	    				alert("insert error");

 	    			}
 				 
 				}
 			});
 		}
		
	// -------------page-1.html-------------//
	$("a[href='#tabs-1']").click(function(){
		addClassAsOfTabs(0);
		$.ajax({
			url : "userManagement.html",
			type:"get",
			async:false,
			datetype:"html",
			success:function(data){
				$("#tabs-1").html(data);
				//alert("test panel table");
				     $.ajax({
				        url: "http://192.168.1.49:8082/niems/Model/user/selectAll.jsp?callback=?", 
				        type:"get",
				        dataType:"jsonp",
				        success:function(data){
				            //console.log("ok");
				            //console.log(data);
				            createhtmlTable(data);
				            getProvince("province");
				        }
				     });

					$(document).ready(function(){
						
					});
			}
		});
	});
});