$(document).ready(function(){
	
	var addClassAsOfTabs = function(childNo){
		
		
		$("div#tabs ul").each(function(){
			$("li",this).removeClass("TabsActive");
			$("li",this).eq(childNo).addClass("TabsActive");
		});
	};
	
// -------------page-2.html-------------
	$("a[href='#tabs-2']").click(function(){	
		addClassAsOfTabs(1);
		$.ajax({
			url : "DWH.html",
			type:"get",
			async:false,
			datetype:"html",
			success:function(data){
			
				$("#tabs-2").html(data);
			}
		});
		
	});
});