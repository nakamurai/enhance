$(document).ready(function(){
	
	var addClassAsOfTabs = function(childNo){
			
		$("div#tabs ul").each(function(){
			$("li",this).removeClass("TabsActive");
			$("li",this).eq(childNo).addClass("TabsActive");
		});
	};
	
	var createTableUsage = function(data){
    	//alert("test panel table");
		var htmlTable = "";
		var htmlTable="<table class='table table-striped table-bordered' id='htmlTable'>";
				htmlTable+="<thead style=\"background-color:#d2d2d2;\">";
					htmlTable+="<tr>";
						htmlTable+="<th class='fontcen'>";
 						htmlTable+="Full Name";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen'>";
 						htmlTable+="Province";
 						htmlTable+="</th>";
 		
 						htmlTable+="<th class='fontcen'>";
 						htmlTable+="Category Link";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen'>";
 						htmlTable+="Link";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen'>";
 						htmlTable+="Reason";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen'>";
 						htmlTable+="DateTime";
 						htmlTable+="</th>";
					htmlTable+="</tr>";
				htmlTable+="</thead>";
				htmlTable+="<tbody>";

			$.each(data,function(index,indexEntry){
					htmlTable+="<tr>";
				 		htmlTable+="<td>";
			 				htmlTable+=indexEntry[1];
			 			htmlTable+="</td>";
			 			htmlTable+="<td>";
			 				htmlTable+=indexEntry[2];
			 			htmlTable+="</td>";
			 			htmlTable+="<td>";
			 				htmlTable+=indexEntry[3];
			 			htmlTable+="</td>";
			 			htmlTable+="<td>";
			 				htmlTable+=indexEntry[4];
			 			htmlTable+="</td>";
			 			htmlTable+="<td>";
			 				htmlTable+=indexEntry[5];
			 			htmlTable+="</td>";
			 			htmlTable+="<td>";
			 				htmlTable+=indexEntry[6];
			 			htmlTable+="</td>";
			 		htmlTable+="</tr>";
			});

 				htmlTable+="</tbody>";
 			htmlTable+="</table>";

 	$("#UsageTable").html(htmlTable);
	};
	
// -------------page-6.html-------------
	$("a[href='#tabs-6']").click(function(){	
		addClassAsOfTabs(5);
		$.ajax({
			url : "UsageLogBackOffice.html",
			type:"get",
			async:false,
			datetype:"html",
			success:function(data){
			
				$("#tabs-6").html(data);
				var selecAllUser = function(){
					$.ajax({
				        url: "http://192.168.1.49:8082/niems/Model/usage_log/selectAll.jsp", 
				        type:"post",
				        dataType:"jsonp",
				        data:{"callback":"?"},
				        success:function(data){
				        	alert("Hi data");
				        	console.log(data);
				        	createTableUsage(data);
				            
				        }
					});
					$(document).ready(function(){
						
					});
				}
				selecAllUser();

			}
		});
	});

});