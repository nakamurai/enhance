$(document).ready(function(){
	
	var addClassAsOfTabs = function(childNo){
		
		
		$("div#tabs ul").each(function(){
			$("li",this).removeClass("TabsActive");
			$("li",this).eq(childNo).addClass("TabsActive");
		});
	};
	
	  var getLinkCategory = function(){
		  //alert("Test function getLinkCategory");
		     var dataParam="";
		     var htmlSelect="";
		     $.ajax({
		           url:"http://192.168.1.49:8082/niems/Model/category_link/selectAll.jsp",
		           type:"post",
		           dataType:"jsonp",
		           data:{"callback":"?"},
		           success:function(data){
		        	  dataLinkCategory=data;
		        	  htmlSelect+="<option value=\"All\">All</option>";
			               $.each(dataLinkCategory,function(index,indexEntry){
			                  htmlSelect+="<option value="+indexEntry[0]+">"+indexEntry[1]+"</option>";
			               });
		             $("#select_cate_link").html(htmlSelect);
		              
		           }
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

 						htmlTable+="<th class='fontcen' style=\"min-width:30%;\">";
 						htmlTable+="Category Link";
 						htmlTable+="</th>";
 						
 						htmlTable+="<th class='fontcen' style=\"min-width:30%;\">";
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
		 				htmlTable+="<input id=\"id_"+indexEntry[0]+"\" class='btn btn-info editlink' type='button' data-toggle='modal' data-target='#FormAddLinks' value='Edit'>";
		 				htmlTable+="<input id=\"id_"+indexEntry[0]+"\" class='btn btn-danger dellink' type='button' value='Delete'>";
					htmlTable+="</td>";
				htmlTable+="</tr>";
			});
			htmlTable+="</tbody>";
 		htmlTable+="</table>";
		
		$("#TableLink").html(htmlTable);
		
	};
	
	
	
//	$("#select_cate_link").change()(function(dataParam){
//		
//		var linkname=$("#input-linkname").val();
//		
//		$.ajax({
//			url:"http://192.168.1.49:8082/niems/Model/portal_link/select_link_by_cate_link.jsp",
//			type:"post",
//			dataType:"jsonp",
//			data:{"callback":"?", "cate_link_id":dataParam},
//			success:function(data){
//				selectdata = data;
//				console.log(dataParam);
//			}
//		});
//	});
	
	var selectDefaultAllLink = function(){
		
		$.ajax({
			url:"http://192.168.1.49:8082/niems/Model/link/selectAll.jsp",
			type:"post",
			dataType:"jsonp",
			data:{"callback":"?"},
			success:function(data){
				
				createTableLink(data);
				//getLinkCategory();

				//Delete Start
				$(".dellink").click(function(){
					
					if (confirm("ต้องการลบข้อมูลนี้หรือไม่ ?")){
						
					var id=this.id;
					id=id.split("_");
					id=id[1];

						$.ajax({
							url:"http://192.168.1.49:8082/niems/Model/link/delete.jsp",
							type:"post",
							dataType:"jsonp",
							data:{"callback":"?","link_id":id},
							success:function(data){
								//console.log(data);
								
								if(data=="success"){
									//alert("delete data is successfully.");
									selectDefaultAllLink();
								}
							}
						});
						
					}								
				});
				//Delete End
				
				//Edit Start
				$(".editlink").click(function(){
					
					var id=this.id;
					id=id.split("_");
					id=id[1];
					//alert(id);

						$.ajax({
							url:"http://192.168.1.49:8082/niems/Model/link/edit.jsp",
							type:"post",
							dataType:"jsonp",
							data:{"callback":"?","link_id":id},
							success:function(data){

								$("#input-linkname").val(data[0][2]);
								$("#radio").val(data[0][3]);
								$("#input-linkurl").val(data[0][4]);
								
								$("#btn-insertlink").html("Edit");
								$("#action").val("edit");
								$("#link_id").val(id);
								
							}

						});
						
				});
				//Edit End
				
			}
		});
	
	}
	
	var select_by_cate_link = function(){
		var selectVal = $("#select_cate_link option:selected").val();
			$.ajax({
				url:"http://192.168.1.49:8082/niems/Model/portal_link/select_link_by_cate_link.jsp",
				type:"post",
				dataType:"jsonp",
				data:{"callback":"?","cate_link_id":selectVal},
				success:function(data){
					
					createTableLink(data);
					
					//Delete Start
					$(".dellink").click(function(){
						
						if (confirm("ต้องการลบข้อมูลนี้หรือไม่ ?")){
							
						var id=this.id;
						id=id.split("_");
						id=id[1];

							$.ajax({
								url:"http://192.168.1.49:8082/niems/Model/link/delete.jsp",
								type:"post",
								dataType:"jsonp",
								data:{"callback":"?","link_id":id},
								success:function(data){
									//console.log(data);
									
									if(data=="success"){
										//alert("delete data is successfully.");
										selectDefaultAllLink();
									}
								}
							});
							
						}								
					});
					//Delete End
					
					//Edit Start
					$(".editlink").click(function(){
						
						var id=this.id;
						id=id.split("_");
						id=id[1];
						//alert(id);

							$.ajax({
								url:"http://192.168.1.49:8082/niems/Model/link/edit.jsp",
								type:"post",
								dataType:"jsonp",
								data:{"callback":"?","link_id":id},
								success:function(data){

									$("#input-linkname").val(data[0][2]);
									$("#radio").val(data[0][3]);
									$("#input-linkurl").val(data[0][4]);
									
									$("#btn-insertlink").html("Edit");
									$("#action").val("edit");
									$("#link_id").val(id);
									
								}

							});
							
					});
					//Edit End
								
				}
			});
	}
	
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
				
				getLinkCategory();
				
				setTimeout(function(){
					selectDefaultAllLink();
				},0);
					
					$("#select_cate_link").change('select', function(){

						var selectVal = $(this).val();
						
						if(selectVal == "All"){
							
							selectDefaultAllLink();
							
						}else{
							
							select_by_cate_link();

						}

					});
					$("#select_cate_link").change();

				
				$("#btn-addlink").click(function(){
					$("#input-linkname").val("");
					$("#input-linkurl").val("");
				});
				
				$("#btn-cancelna").click(function(){
					$("#btn-insertlink").html("Add");
					$("#action").val("add");
				});
				
				
				$("#btn-insertlink").click(function(){
					
					var selectVal = $("#select_cate_link option:selected").val();
					//alert(selectVal);
					var linktype = $('[name=radio]:checked').val();
					var linkname=$("#input-linkname").val();
					var linkurl=$("#input-linkurl").val()
					
					if($("#action").val()=="add"){
						
						if(linkname !="",linkurl !="" ){
							$.ajax({
								url:"http://192.168.1.49:8082/niems/Model/link/insert.jsp",
								type:"post",
								dataType:"jsonp",
								data:{"callback":"?","cate_link_id":selectVal,"link_name":linkname,"link_type":linktype,"link_url":linkurl,"link_custom":""},
								success:function(data){
									//console.log(data);
									
									if(data=="success"){

										alert("insert data is successfully.");
										$("#FormAddLinks").modal('hide');


									}
										
								}
							});
						}else{
							alert("Please insert link name and link URL.");
						}
					
					}else{

						$.ajax({
							url:"http://192.168.1.49:8082/niems/Model/link/update.jsp",
							type:"post",
							dataType:"jsonp",
							data:{"callback":"?","link_id":$("#link_id").val(),"cate_link_id":selectVal,"link_name":linkname,"link_type":linktype,"link_url":linkurl,"link_custom":""},
							success:function(data){
								//console.log(data);
								
								if(data=="success"){
									$("#btn-insertlink").html("Add");
									$("#action").val("add");
									
									alert("update data is successfully.");
									$("#FormAddLinks").modal('hide');

								}else{
									alert("update data is Not success.")
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