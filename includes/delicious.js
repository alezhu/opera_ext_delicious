(function(){
	var selectText = '';
	var LOG = 0;
	
	if(window.parent == window){	
		window.addEventListener("DOMContentLoaded", function(){
			if(LOG)opera.postError("IS: Loaded. " + window.location.href);
			
			window.document.addEventListener("mouseup", function() {
				selectText = window.document.getSelection();
				if(LOG)opera.postError("IS: TextSelected: " + selectText);
			} , false)
		}, false);

		opera.extension.addEventListener("message", function(event){
			// Get content of incoming message.
			var message  = event.data;
			if(LOG)opera.postError("IS: OnMessage " + message +". Location: " + window.location.href);
			switch(event.data)
			{ 
				case "AZ.DELICIOUS.SAVE":
					var w = window;
					//while( w.parent != w) w = w.parent;
					var url = 'http://www.delicious.com/save?url='+encodeURIComponent(w.location.href);
					url += '&title='+encodeURIComponent(w.document.title);
					url += '&notes='+encodeURIComponent('' + selectText);
					url += '&v=6&noui=0';
					url += '&jump=yes';
					w.location.href = url;
					//tab.update({url: url});
					break;
			}
		}, false);
	}
})();