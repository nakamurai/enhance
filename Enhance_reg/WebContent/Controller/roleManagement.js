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
				htmlTable+="<thead>";
					htmlTable+="<tr>";
						htmlTable+="<th class='fontcen' style=\"min-width:5%;\">";
 						htmlTable+="ID";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen' style=\"min-width:80%;\">";
 						htmlTable+="Role Name";
 						htmlTable+="</th>";

 						htmlTable+="<th class='fontcen'	 style=\"min-width=20%\">";
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
						htmlTable+="<input id=\"id_"+indexEntry[0]+"\" class='btn btn-info assignrole' type='button' data-toggle='modal' data-target='#FormAssignRole' value='Assign'>";
		 				htmlTable+="<input id=\"id_"+indexEntry[0]+"\" class='btn btn-info editrole' type='button' data-toggle='modal' data-target='#FormAddRole' value='Edit'>";
		 				htmlTable+="<input id=\"id_"+indexEntry[0]+"\" class='btn btn-danger delrole' type='button' value='Delete'>";
					htmlTable+="</td>";
				htmlTable+="</tr>";
			});
			htmlTable+="</tbody>";
 		htmlTable+="</table>";
		
		$("#TableCateType").html(htmlTable);
		
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
				
				
			}
		});
		
	});
});