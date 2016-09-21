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
	
	var selecAllUsage = function(){
		$.ajax({
	        url: "http://192.168.1.49:8082/niems/Model/usage_log/selectAll.jsp", 
	        type:"post",
	        dataType:"jsonp",
	        data:{"callback":"?"},
	        success:function(data){

	        	createTableUsage(data);
	            
	        }
		});

	}
	
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	
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
				
				setTimeout(function(){
					selecAllUsage();
				},0);
				
				//date start
				var checkin = $('#dpk1').datepicker({
					format: 'yyyy/mm/dd',
					todayHighlight: true,
					autoclose: true,
					onRender: function(date) {
					    return date.valueOf();
					  }
				}).on('changeDate', function(ev) {
					if (ev.date.valueOf() > checkout.date.valueOf()) {
					    var newDate = new Date(ev.date)
					    newDate.setDate(newDate.getDate() + 1);
					    checkout.setValue(newDate);
					    //alert($('#dpk1').val());
					  }
					 	  checkin.hide();
						  $('#dpk2')[0].focus();

						}).data('datepicker');

				var checkout = $('#dpk2').datepicker({
					format: 'yyyy/mm/dd',
					todayHighlight: true,
					autoclose: true,
					onRender: function(date) {
				    return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
				  }
				}).on('changeDate', function(ev) {
				  checkout.hide();
				}).data('datepicker');
				//date end
				
			    console.log($('#dpk1').data('datepicker'));
				//console.log(checkin);
				$("#btn-searchUsage").click(function(){
					  $.ajax({
						  url:"http://192.168.1.49:8082/niems/Model/usage_log/search.jsp",
						  type:"post",
						  dataType:"jsonp",
						  data:{"callback":"?","keyword":$("#searchLog").val(),"start_date":checkin,"end_date":checkout},
					
						  success:function(data){
							//console.log(data);
							  
							  createTableUsage(data);

						}
					  });
				});
				
				$(document).ready(function(){

				});
			}

		});
	});


});