$(function(){
	$("#markdownButton").click(function(){
		vo.thisView.createMarkDownBullet(); 
	}); 

	//grab the rendered div. 
	//(remove the content of everything else)
	//remove the classes. 
	$("body").on("blur", "#marked-mathjax-input", function(){
  		var editor = $("#marked-mathjax-input"); //(this is the text-area)
  		var wrapper = editor.closest(".hoverWrap"); 
  		var text = editor.siblings(".Current").html(); 
  		var html = "<div>" + text  + "</div>"; 
  		
  		wrapper.html(html).addClass('markdown'); 
  		//editor.remove() is redundant. 
  	}); 



	$("body").on("mouseover", "a.expandCollapse", function(event){
		$(event.target).find("a.expandCollapse").css("opacity", "1"); 
		$(event.target).closest("a.expandCollapse").css("opacity", "1"); 
		// $(event.target).siblings("a.expandCollapse").css("opacity", "1")
	}); 
	$("body").on("mouseleave", "a.expandCollapse", function(event){
		$(event.target).find("a.expandCollapse").css("opacity", ".001"); 
		$(event.target).closest("a.expandCollapse").css("opacity", ".001"); 
		// $(event.target).siblings("a.expandCollapse").css("opacity", ".001")
	}); 

	

	$("body").on("click", ".expandCollapse", function(event){
		var LI = $(event.target).parent(); 
		LI.children("ul").slideToggle(110); 
		LI.children(".zoomButton").toggleClass("collapsed"); 
	}); 
	$("body").on("click", ".splitScreen", function(){
		$(".main2").remove();
	})
	$("body").on("keydown", "textarea", keydownHandler);
	$("body").on("focus", "textarea", function(event){
		var that = this;
		voInitializer(that, event);
		var id = $(event.target).closest("li").attr("data-id");
		keydownHandler(event); 

		socket.emit("editing", [id, CurrentUser.google.name]);
	}); 
	$("body").on("blur", "textarea", function(event){
		var thisLI = $(event.target).closest("li");
		var id = thisLI.attr("data-id");
		var text = thisLI.children().children("textarea").val();
		$("textarea").textareaAutoExpand();
		socket.emit("blurred", [id, text, CurrentUser]);
		 
	});
	$("body").on("click", ".transclude", function(event){
		alert("Transclusion syncing with the server has not been implemented. KnownBugs:\n0.Don't make infinite loops.\n1."); 
		transclude();  
	}); 
})