$(document).ready(function(){
	
	var addClassAsOfTabs = function(childNo){
		
		
		$("div#tabs ul").each(function(){
			$("li",this).removeClass("TabsActive");
			$("li",this).eq(childNo).addClass("TabsActive");
		});
	};
	
	function checkID(id){ 
	  if(id.length != 13) return false; 
	  for(i=0, sum=0; i < 12; i++) 
	  sum += parseFloat(id.charAt(i))*(13-i); if((11-sum%11)%10!=parseFloat(id.charAt(12))) 
	  return false; return true; 
	 }
	
	// -------------createhtmlTable-------------//
	var createhtmlTable = function(data){
    	//alert("test panel table");
		var htmlTable = "";
		var htmlTable="<table class='table table-striped table-bordered' id='htmlTable' width=\"100%\">";
				htmlTable+="<thead style=\"background-color:#d2d2d2;\">";
					htmlTable+="<tr>";
						htmlTable+="<th class='fontcen' style='min-width:5%'>";
 						htmlTable+="ID";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen' style='min-width:20%'>";
 						htmlTable+="First Name";
 						htmlTable+="</th>";
 		
 						htmlTable+="<th class='fontcen' style='min-width:20%'>";
 						htmlTable+="Last Name";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen' style='min-width:10%'>";
 						htmlTable+="Status";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen' style='min-width:10%'>";
 						htmlTable+="Role";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen' style='min-width:12%'>";
 						htmlTable+="Province";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen' style='min-width:12%'>";
 						htmlTable+="Action";
 						htmlTable+="</th>";
					htmlTable+="</tr>";
				htmlTable+="</thead>";
				htmlTable+="<tbody>";

			$.each(data,function(index,indexEntry){
					htmlTable+="<tr>";
						htmlTable+="<td class='fontcen'>";
			 				htmlTable+=""+(index+1);
			 			htmlTable+="</td>";
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
			 				htmlTable+=indexEntry[10];
			 			htmlTable+="</td>";
			 			htmlTable+="<td>";
			 				htmlTable+=indexEntry[5];
			 			htmlTable+="</td>";
			 			htmlTable+="<td>";
			 				htmlTable+="<input id=\"id_"+indexEntry[0]+"\" class='btn btn-info edituser' type='button' data-toggle='modal' data-target='#myModal' value='Edit'>";
			 				htmlTable+="<input id=\"id_"+indexEntry[0]+"\" class='btn btn-danger deluser' type='button' value='Delete'>";
			 			htmlTable+="</td>";
			 		htmlTable+="</tr>";
			});

 				htmlTable+="</tbody>";
 			htmlTable+="</table>";

 	$("#Panel_Table").html(htmlTable);
	};
	
	// -------------select Province-------------//
	var getProvinces = function(){
		  //alert("Test function getLinkCategory");
		     var SelectProvince="";
		     $.ajax({
		           url:"http://192.168.1.49:8082/niems/Model/user/select_province.jsp",
		           type:"post",
		           dataType:"jsonp",
		           data:{"callback":"?"},
		           success:function(data){
		        	  province=data;
		        	  //console.log("test show datalinkcategory");
		              //console.log(dataLinkCategory);
		              //console.log(dataLinkCategory[0][0]);
		              //console.log(dataLinkCategory[0][1]);
		        	  SelectProvince+="<select class=\"selectpicker\">";
			               $.each(province,function(index,indexEntry){
			            	   SelectProvince+="<option value="+indexEntry[0]+">"+indexEntry[1]+"</option>";
			               });
			               SelectProvince+="</select>";
		             $("#province").html(SelectProvince);
		              
		           }
		    }); 
		    
		 };
		 
//	var procince_err = new Array("Bangkok", "Amnat Charoen", "Ang Thong", "Buriram", "Chachoengsao", "Chai Nat", "Chaiyaphum", "Chanthaburi", "Chiang Mai", "Chiang Rai", "Chon Buri", "Chumphon", "Kalasin", "Kamphaeng Phet", "Kanchanaburi", "Khon Kaen", "Krabi", "Lampang", "Lamphun", "Loei", "Lop Buri", "Mae Hong Son", "Maha Sarakham", "Mukdahan", "Nakhon Nayok", "Nakhon Pathom", "Nakhon Phanom", "Nakhon Ratchasima", "Nakhon Sawan", "Nakhon Si Thammarat", "Nan", "Narathiwat", "Nong Bua Lamphu", "Nong Khai", "Nonthaburi", "Pathum Thani", "Pattani", "Phangnga", "Phatthalung", "Phayao", "Phetchabun", "Phetchaburi", "Phichit", "Phitsanulok", "Phra Nakhon Si Ayutthaya", "Phrae", "Phuket", "Prachin Buri", "Prachuap Khiri Khan", "Ranong", "Ratchaburi", "Rayong", "Roi Et", "Sa Kaeo", "Sakon Nakhon", "Samut Prakan", "Samut Sakhon", "Samut Songkhram", "Sara Buri", "Satun");
//
//	function getProvince(provinceElementId) {
//	    var provinceElement = document.getElementById(provinceElementId);
//	    provinceElement.length = 0;
//	    provinceElement.options[0] = new Option('เลือกจังหวัด', '-1');
//	    provinceElement.selectedIndex = 0;
//	    for (var i = 0; i < procince_err.length; i++) {
//	        provinceElement.options[provinceElement.length] = new Option(procince_err[i], procince_err[i]);
//	    }
//	};

		
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
				var selecAllUser = function(){
				     $.ajax({
				        url: "http://192.168.1.49:8082/niems/Model/user/selectAll.jsp", 
				        type:"post",
				        dataType:"jsonp",
				        data:{"callback":"?"},
				        success:function(data){

				            createhtmlTable(data);
				            getProvinces();
				            
				            //Delete Start
				            $(".deluser").click(function(){
				            	
				            	if (confirm("ต้องการลบข้อมูลนี้หรือไม่ ?")){
									
									var id=this.id;
									//alert(this.id);
									id=id.split("_");
									id=id[1];
									//alert(id);
										$.ajax({
											url:"http://192.168.1.49:8082/niems/Model/user/delete.jsp",
											type:"post",
											dataType:"jsonp",
											data:{"callback":"?","user_name":id},
											success:function(data){
												//console.log(data);
												
												if(data=="success"){
													//alert("delete data is successfully.");
													selecAllUser();
												}
											}
										});
										
									}
				            	
				            });
				            //Delete End
				            
				          //Edit Start
							$(".edituser").click(function(){
								
								var id=this.id;
								id=id.split("_");
								id=id[1];
								//alert(id);

									$.ajax({
										url:"http://192.168.1.49:8082/niems/Model/user/edit.jsp",
										type:"post",
										dataType:"jsonp",
										data:{"callback":"?","user_name":id},
										success:function(data){
											
											console.log(data);
											$("#input-name").val(data[0][1]);
											$("#input-pass").val(data[0][2]);
											
											$("#input-fname").val(data[0][3]);
											$("#input-lname").val(data[0][4]);
											$("#input-email").val(data[0][5]);
											$("#province").val(data[0][6]);
											$("#input-pos").val(data[0][9]);
											$("#input-pos1").val(data[0][8]);
																						
											$("#btn-insert").html("Edit");
											$("#action").val("edit");
											$("#input-name").val(id);
											
										}

									});
									
							});
							//Edit End
				        }
				     });


				}
				selecAllUser();
				
				$("#btn-adduser").click(function(){
					$("#input-name").val("");
					$("#input-pass").val("");
					$("#input-init").val("");
					$("#input-fname").val("");
					$("#input-lname").val("");
					$("#input-email").val("");
					$("#province").val("");
					$("#input-pos1").val("");
					$("#input-pos").val("");
					
				});
				
				$("#btn-cancel").click(function(){
					$("#btn-insert").html("Add");
					$("#action").val("add");
				});
			
	
				$("#btn-insert").click(function(){
					
					var inputName=$("#input-name").val();
					
					if($("#action").val()=="add"){//start if
						
							if(checkID(inputName), $("#input-fname").val() !=""){
									$.ajax({
										url:"http://192.168.1.49:8082/niems/Model/user/insert.jsp?callback=?",
										type:"post",
										dataType:"jsonp",
										data:{"user_name":$("#input-name").val(), "password":$("#input-pass").val(), "prefix":$("#input-init").val(), "first_name":$("#input-fname").val(), "last_name":$("#input-lname").val(), "email":$("#input-email").val(), "province":$("#province").val(), "status":"True", "position":$("#input-pos1").val(), "organization":$("#input-pos").val(), "user_items":"1", "role_id":"2"},
										success:function(data){
											//console.log(data);
											
											if(data=="success"){
												alert("insert data is successfully.");
												$("#myModal").modal('hide');
												selecAllUser();
			
											}
												
										}
									});

							}else{
								alert("กรุณากรอกข้อมูลให้ถูกต้อง");
							}
							
					}//end if
					else{
	
						$.ajax({
							url:"http://192.168.1.49:8082/niems/Model/user/update.jsp",
							type:"post",
							dataType:"jsonp",
							data:{"callback":"?","user_name":$("#input-name").val(), "password":$("#input-pass").val(), "prefix":$("#input-init").val(), "first_name":$("#input-fname").val(), "last_name":$("#input-lname").val(), "email":$("#input-email").val(), "province":$("#province").val(), "status":"True", "position":$("#input-pos1").val(), "organization":$("#input-pos").val(), "user_items":"1", "role_id":"2"},
							success:function(data){
								//console.log(data);
								
								if(data=="success"){
									//alert("update data is successfully.");
									
									selecAllUser();
									$("#myModal").modal('hide');
									
									$("#btn-insert").html("Add");
									$("#action").val("add");
								}	
							}
						});	
					
					}
				});
				
				//Search Start
				$("#btn-search").click(function(){
					$.ajax({
						url:"http://192.168.1.49:8082/niems/Model/user/search.jsp",
						type:"post",
						dataType:"jsonp",
						data:{"callback":"?","keyword":$("#input-search").val()},
						success:function(data){
							//console.log(data);
							createhtmlTable(data);

						}
					});	
				
				});
				// Search End
				
				$(document).ready(function(){
					
				});
			}
		});
	});
});