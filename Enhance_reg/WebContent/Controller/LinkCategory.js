$(document).ready(function(){
	
	var addClassAsOfTabs = function(childNo){
		
		
		$("div#tabs ul").each(function(){
			$("li",this).removeClass("TabsActive");
			$("li",this).eq(childNo).addClass("TabsActive");
		});
	};
	
	
	var createhtmlTable = function(data){

		var htmlTable = "";
		var htmlTable="<table class='table table-striped table-bordered' id='htmlTable'>";
				htmlTable+="<thead>";
					htmlTable+="<tr>";
						htmlTable+="<th class='fontcen'>";
 						htmlTable+="ID";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen'>";
 						htmlTable+="Category Type";
 						htmlTable+="</th>";
 		
 						htmlTable+="<th class='fontcen'>";
 						htmlTable+="Category Link ";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen'>";
 						htmlTable+="Icon";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen'>";
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
			 				htmlTable+=indexEntry[4];
			 			htmlTable+="</td>";
			 			htmlTable+="<td>";
			 				htmlTable+=indexEntry[1];
			 			htmlTable+="</td>";
			 			htmlTable+="<td>";
			 				htmlTable+=indexEntry[2];
			 			htmlTable+="</td>";
			 			htmlTable+="<td>";
			 				htmlTable+="<input id=\"id_"+indexEntry[0]+"\" class='btn btn-info editcatelink' type='button' data-toggle='modal' data-target='#FormAddLink' value='Edit'>";
			 				htmlTable+="<input id=\"id_"+indexEntry[0]+"\" class='btn btn-danger delcatelink' type='button' value='Delete'>";
			 			htmlTable+="</td>";
			 		htmlTable+="</tr>";
			});

 				htmlTable+="</tbody>";
 			htmlTable+="</table>";

 	$("#TableLinkCate").html(htmlTable);
	};
	
	
	// -------------page-1.html-------------//
	$("a[href='#tabs-4']").click(function(){
		addClassAsOfTabs(3);
		$.ajax({
			url : "LinkCategory.html",
			type:"get",
			async:false,
			datetype:"html",
			success:function(data){
				$("#tabs-4").html(data);
				//createhtmlTable(data);
				//alert("test category link");
				var selectAllLink = function(){
					$.ajax({
						url:"http://192.168.1.49:8082/niems/Model/category_link/selectAll.jsp",
						type:"post",
						dataType:"jsonp",
						data:{"callback":"?"},
						success:function(data){
							//alert("test category type");
//							console.log("test daata");
//							console.log(data);
							createhtmlTable(data);
//							
							//Delete Start
							$(".delcatelink").click(function(){
								
								if (confirm("ต้องการลบข้อมูลนี้หรือไม่ ?")){
									
								var id=this.id;
								id=id.split("_");
								id=id[1];
								//alert(id);

									$.ajax({
										url:"http://192.168.1.49:8082/niems/Model/category_link/delete.jsp",
										type:"post",
										dataType:"jsonp",
										data:{"callback":"?","cate_link_id":id},
										success:function(data){
											console.log(data);
											
											if(data=="success"){
												//alert("delete data is successfully.");
												selectAllLink();
											}
										}
									});
									
								}								
							});
							//Delete End
							
							//Edit Start
							$(".editcatelink").click(function(){
								
								var id=this.id;
								id=id.split("_");
								id=id[1];
								//alert(id);

									$.ajax({
										url:"http://192.168.1.49:8082/niems/Model/category_link/edit.jsp",
										type:"post",
										dataType:"jsonp",
										data:{"callback":"?","cate_link_id":id},
										success:function(data){
											
											//console.log(data);
											//console.log($("#cate_link_id").val(id));
											$("#input-cate_name").html(data[0][1]);
											$("#input-cate_name").val(data[0][1]);
											$("#btn-insertlink").html("Edit");
											$("#action").val("edit");
											$("#cate_link_id").val(id);
											
										}

									});
									
							});
							//Edit End
							
						}
					});
					
					
				}
				selectAllLink();
				
				$("#btn-addlinkcate").click(function(){
					$("#input-cate_name").val("");
					$("#input-4").val("");
				});
				
				$("#btn-cancel").click(function(){
					$("#btn-insertlink").html("Add");
					$("#action").val("add");
				});
				
				
				$("#btn-insertlink").click(function(){
					
					var cate_name=$("#input-cate_name").val();
					
					if($("#action").val()=="add"){
						
						if(cate_name !=""){
							$.ajax({
								url:"http://192.168.1.49:8082/niems/Model/category_link/insert.jsp",
								type:"post",
								dataType:"jsonp",
								data:{"callback":"?","cate_name":cate_name,"cate_icon":$("#input-4").val(),"ineligible":"Y", "cate_type_id":$("#cate_link_id").val()},
								success:function(data){
									console.log(data);
									
									if(data=="success"){
										//alert("insert data is successfully.");
										$("#FormAddLink").modal('hide');
										selectAllLink();
 
									}
										
								}
							});
						}else{
							alert("Please insert Category type name.");
						}
					
					}else{

						$.ajax({
							url:"http://192.168.1.49:8082/niems/Model/category_link/update.jsp",
							type:"post",
							dataType:"jsonp",
							data:{"callback":"?","cate_name":cate_name,"cate_icon":$("#input-4").val(),"ineligible":"Y", "cate_type_id":"1", "cate_link_id":$("#cate_link_id").val()},
							success:function(data){
								//console.log(data);
								
								if(data=="success"){
									alert("update data is successfully.");
									
									
									$("#FormAddLink").modal('hide');
									
									$("#btn-insertlink").html("Add");
									$("#action").val("add");
									selectAllLink();
								}	
							}
						});	
						
					}
//					
				});
				

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