$(document).ready(function(){
	
	var addClassAsOfTabs = function(childNo){
		
		
		$("div#tabs ul").each(function(){
			$("li",this).removeClass("TabsActive");
			$("li",this).eq(childNo).addClass("TabsActive");
		});
	};
		
	var createTableLink = function(data){
		var htmlTable = "";
		var htmlTable="<table class='table table-striped table-bordered table-hover' id='htmlTable'>";
				htmlTable+="<thead style=\"background-color:#d2d2d2;\">";
					htmlTable+="<tr>";
						htmlTable+="<th class='fontcen' style=\"min-width:5%;\">";
 						htmlTable+="ID";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen' style=\"min-width:50%;\">";
 						htmlTable+="Category Link";
 						htmlTable+="</th>";
 						
 						htmlTable+="<th class='fontcen' style=\"min-width:50%;\">";
 						htmlTable+="Link";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen'	style=\"min-width:10%;\">";
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
					htmlTable+="<td>"+indexEntry[2]+"</td>";
					htmlTable+="<td>";
		 				htmlTable+="<input id=\"id_"+indexEntry[0]+"\" class='btn btn-info editCateType' type='button' data-toggle='modal' data-target='#FormAddCateType' value='Edit'>";
		 				htmlTable+="<input id=\"id_"+indexEntry[0]+"\" class='btn btn-danger delCateType' type='button' value='Delete'>";
		 				//htmlTable+="<button id=\"id_"+indexEntry[0]+"\" type=\"button\" class=\"editCateType btn btn-info\">Edit</button>";
		 				//htmlTable+="<button id=\"id_"+indexEntry[0]+"\" type=\"button\" class=\"btn btn-danger editCateType\">Delete</button>";
					htmlTable+="</td>";
				htmlTable+="</tr>";
			});
			htmlTable+="</tbody>";
 		htmlTable+="</table>";
		
		$("#TableLink").html(htmlTable);
		
	};
	
	// -------------page-1.html-------------//
	$("a[href='#tabs-5']").click(function(){
		addClassAsOfTabs(4);
		$.ajax({
			url : "LinkBackOffice.html",
			type:"get",
			async:false,
			datetype:"html",
			success:function(data){
				$("#tabs-5").html(data);
				createTableLink(data);
				//alert("test category type");
				var selectAllLink = function(){
					$.ajax({
						url:"http://192.168.1.49:8082/niems/Model/link/selectAll.jsp",
						type:"post",
						dataType:"jsonp",
						data:{"callback":"?"},
						success:function(data){
							//alert("test category type");
							//console.log(data);
							
							createTableLink(data);
//							
//							//Delete Start
//							$(".delCateType").click(function(){
//								
//								if (confirm("ต้องการลบข้อมูลนี้หรือไม่ ?")){
//									
//								var id=this.id;
//								id=id.split("_");
//								id=id[1];
//
//									$.ajax({
//										url:"http://192.168.1.49:8082/niems/Model/link/delete.jsp",
//										type:"post",
//										dataType:"jsonp",
//										data:{"callback":"?","cate_link_id":id},
//										success:function(data){
//											//console.log(data);
//											
//											if(data=="success"){
//												//alert("delete data is successfully.");
//												selectallLink();
//											}
//										}
//									});
//									
//								}								
//							});
//							//Delete End
//							
//							//Edit Start
//							$(".editCateType").click(function(){
//								
//								var id=this.id;
//								id=id.split("_");
//								id=id[1];
//								//alert(id);
//
//									$.ajax({
//										url:"http://192.168.1.49:8082/niems/Model/link/edit.jsp",
//										type:"post",
//										dataType:"jsonp",
//										data:{"callback":"?","cate_link_id":id},
//										success:function(data){
//											
//											//console.log(data);
//											$("#input-linkname").html(data[0][1]);
//											$("#input-linkname").val(data[0][1]);
//											$("#btn-insert").html("Edit");
//											$("#action").val("edit");
//											$("#cate_link_id").val(id);
//											
//										}
//
//									});
//									
//							});
//							//Edit End
							
						}
					});
					
					
				}
//				selectAllLink();
//				
//				$("#btn-addlink").click(function(){
//					$("#input-linkname").val("");
//					$("#input-linkurl").val("");
//				});
//				
//				$("#btn-cancel").click(function(){
//					$("#btn-insert").html("Add");
//					$("#action").val("add");
//				});
				
				
//				$("#btn-insert").click(function(){
//					
//					var linkname=$("#input-linkname").val();
//					
//					if($("#action").val()=="add"){
//						
//						if(linkname !=""){
//							$.ajax({
//								url:"http://192.168.1.49:8082/niems/Model/link/insert.jsp",
//								type:"post",
//								dataType:"jsonp",
//								data:{"callback":"?","link_name":$("#input-linkname").val(),},
//								success:function(data){
//									//console.log(data);
//									
//									if(data=="success"){
//										alert("insert data is successfully.");
//										$("#FormAddCateType").modal('hide');
//										selectallLink();
//
//									}
//										
//								}
//							});
//						}else{
//							alert("Please insert Category type name.");
//						}
//					
//					}else{
//
//						$.ajax({
//							url:"http://192.168.1.49:8082/niems/Model/link/update.jsp",
//							type:"post",
//							dataType:"jsonp",
//							data:{"callback":"?","cate_type_name":cateTypeName,"cate_type_id":$("#cate_type_id").val()},
//							success:function(data){
//								//console.log(data);
//								
//								if(data=="success"){
//									alert("update data is successfully.");
//									
//									selectallLink();
//									$("#FormAddCateType").modal('hide');
//									
//									$("#btn-insert").html("Add");
//									$("#action").val("add");
//								}	
//							}
//						});	
//						
//					}
//					
//				});
				

				//Search Start
//				$("#btn-search").click(function(){
//					//cate_type_search
//					$.ajax({
//						url:"http://192.168.1.49:8082/niems/Model/category_type/search.jsp",
//						type:"post",
//						dataType:"jsonp",
//						data:{"callback":"?","keyword":$("#input-search").val()},
//						success:function(data){
//							//console.log(data);
//							createTableCateTypeList(data);
//
//						}
//					});	
//				
//				});
				// Search End
				
//				$(document).ready(function(){
//
//				});
			}
		});
	});
});