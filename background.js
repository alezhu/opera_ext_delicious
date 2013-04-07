(function(){
	var LOG = 0;
	window.addEventListener("load", function(){
		if(LOG)opera.postError("BS: OnLoad");

		var theButton = opera.contexts.toolbar.createItem({
			disabled: false,
			title: "Save on delicious",
			icon: "icon.png",
			onclick: function(){
        
				if(LOG)opera.postError("BS: OnClick");

				var tab = opera.extension.tabs.getFocused();
				if(tab){
					tab.postMessage("AZ.DELICIOUS.SAVE");
				}
			}
		});
   
		opera.contexts.toolbar.addItem( theButton ); // add button to UI
		opera.extension.tabs.addEventListener( "blur", toggleIfExists, false);
		opera.extension.tabs.addEventListener( "focus", toggleIfExists, false);
		opera.extension.addEventListener( "message", function(event){
			if(LOG)opera.postError("BS: OnMessage " + event.data);
			toggleIfExists();	
		}, false);
		
		function toggleIfExists(){
		  var tab = opera.extension.tabs.getFocused();
		  if( tab ){
			theButton.disabled = false;
       
			theButton.title = "Save on delicious";
		  } else {
			theButton.disabled = true;
       
			theButton.title = "Please reload the tab for the extension to take effect. If it still does not work, then the extension probably does not have access to this tab, probably due to security restrictions.";
		  }
		}

		opera.extension.addEventListener("connect", function(event) {
			if(LOG)opera.postError("BS: OnConnect. ");
		}, false);
	}, false);
})();