$(document).ready(function(){
	
	var addClassAsOfTabs = function(childNo){
		
		
		$("div#tabs ul").each(function(){
			$("li",this).removeClass("TabsActive");
			$("li",this).eq(childNo).addClass("TabsActive");
		});
	};
	
	var createTableRole = function(data){
		var htmlTable = "";
		var htmlTable="<table class='table table-striped table-bordered table-hover' id='htmlTable'>";
				htmlTable+="<thead style=\"background-color:#d2d2d2;\">";
					htmlTable+="<tr>";
						htmlTable+="<th class='fontcen' style='min-width:5%;'>";
 						htmlTable+="ID";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen' style='min-width:50%;'>";
 						htmlTable+="Role Name";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen' style='min-width:13%;'>";
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
					htmlTable+="<td>"+indexEntry[1]+"</td>";
					htmlTable+="<td>";
						htmlTable+="<input id=\"id_"+indexEntry[0]+"\" class='btn btn-primary assignrole' type='button' data-toggle='modal' data-target='#FormAssignLink' value='Assign'>";
		 				htmlTable+="<input id=\"id_"+indexEntry[0]+"\" class='btn btn-info editrole' type='button' data-toggle='modal' data-target='#FormAddRole' value='Edit'>";
		 				htmlTable+="<input id=\"id_"+indexEntry[0]+"\" class='btn btn-danger delrole' type='button' value='Delete'>";
					htmlTable+="</td>";
				htmlTable+="</tr>";
			});
			htmlTable+="</tbody>";
 		htmlTable+="</table>";
		
		$("#TableRole").html(htmlTable);
		
	};
	
// -------------page-2.html-------------
	$("a[href='#tabs-2']").click(function(){	
		addClassAsOfTabs(1);
		$.ajax({
			url : "ui_roleManagement.html",
			type:"get",
			async:false,
			datetype:"html",
			success:function(data){
			
				$("#tabs-2").html(data);

				var selectAllRole = function(){
					$.ajax({
						url:"http://192.168.1.49:8082/niems/Model/role/selectAll.jsp",
						type:"post",
						dataType:"jsonp",
						data:{"callback":"?"},
						success:function(data){
						
							//console.log(data);			
							createTableRole(data);
							
							//Delete Start
							$(".delrole").click(function(){
															
								if (confirm("ต้องการลบข้อมูลนี้หรือไม่ ?")){
									
								var id=this.id;
								id=id.split("_");
								id=id[1];

									$.ajax({
										url:"http://192.168.1.49:8082/niems/Model/role/delete.jsp",
										type:"post",
										dataType:"jsonp",
										data:{"callback":"?","role_id":id},
										success:function(data){
											//console.log(data);
											
											if(data=="success"){
												//alert("delete data is successfully.");
												selectAllRole();
											}
										}
									});
									
								}								
							});
							//Delete End
//							
							//Edit Start
							$(".editrole").click(function(){
							
								var id=this.id;
								id=id.split("_");
								id=id[1];
								alert(id);

									$.ajax({
										url:"http://192.168.1.49:8082/niems/Model/role/edit.jsp",
										type:"post",
										dataType:"jsonp",
										data:{"callback":"?","role_id":id},
										success:function(data){

											$("#btn-insert_role").html("Edit");
											$("#action").val("edit");
											$("#input-role_name").val(data[0][1]);
											$("#role_id").val(id);
											
										}

									});
									
							});
							//Edit End
							
						}
					});
				}
				selectAllRole();
				
				$("#btn-addrole").click(function(){
					$("#input-role_name").val("");
				});
				
				$("#btn-insert_role").click(function(){
					
					var role_name=$("#input-role_name").val();
					
					if($("#action").val()=="add"){
						
						if(role_name !=""){
							$.ajax({
								url:"http://192.168.1.49:8082/niems/Model/role/insert.jsp",
								type:"post",
								dataType:"jsonp",
								data:{"callback":"?","role_name":role_name},
								success:function(data){
									//console.log(data);
									
									if(data=="success"){
										//alert("insert data is successfully.");
										$("#FormAddRole").modal('hide');
										selectAllRole();

									}
										
								}
							});
							
						}else{
							alert("Please insert Category type name.");
						}
					
					}else{

						$.ajax({
							url:"http://192.168.1.49:8082/niems/Model/role/update.jsp",
							type:"post",
							dataType:"jsonp",
							data:{"callback":"?","role_name":$("#input-role_name").val(),"role_id":$("#role_id").val()},
							success:function(data){
								//console.log(data);
								
								if(data=="success"){
									alert("update data is successfully.");
									$("#FormAddRole").modal('hide');
									$("#btn-insert_role").html("Add");
									$("#action").val("add");
									selectAllRole();
		
								}	
							}
						});	
						
					}
					
				});
				$(document).ready(function(){

				});
			}

		});
		
	});
});