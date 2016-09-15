$(document).ready(function(){
	var addClassAsOfTabs = function(childNo){
		
		
		$("div#tabs ul").each(function(){
			$("li",this).removeClass("TabsActive");
			$("li",this).eq(childNo).addClass("TabsActive");
		});
	};
	
// -------------page-5.html-------------
	$("a[href='#tabs-5']").click(function(){	
		addClassAsOfTabs(4);
		$.ajax({
			url : "UsageLogBackOffice.html",
			type:"get",
			async:false,
			datetype:"html",
			success:function(data){
			
				$("#tabs-5").html(data);
			}
		});
		
	});
});