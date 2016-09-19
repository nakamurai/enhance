$(document).ready(function() {
	 $("#tabs").tabs();
	
	 $("div#tabs ul").each(function(){
		 if($("li",this).eq(0).hasClass("TabsActive")){
				$("[href='#tabs-1']").trigger("click");
			}else if($("li",this).eq(1).hasClass("TabsActive")){
				$("[href='#tabs-2']").trigger("click");
			}else if($("li",this).eq(2).hasClass("TabsActive")){
				$("[href='#tabs-3']").trigger("click");
			}else if($("li",this).eq(3).hasClass("TabsActive")){
				$("[href='#tabs-4']").trigger("click");
			}else if($("li",this).eq(4).hasClass("TabsActive")){
				$("[href='#tabs-5']").trigger("click");
			}else if($("li",this).eq(5).hasClass("TabsActive")){
				$("[href='#tabs-6']").trigger("click");
			}else{
				false;
			}
		});
	 
	setTimeout(function(){
		$("a[href='#tabs-1']").trigger("click");
	},500);
	
});


