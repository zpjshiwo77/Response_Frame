/**********************
*******20119.2.12*******
*******   page  *******
**********************/

//百度监测贴这里


//ga监测贴这里



var imonitor = new importMonitor();

function importMonitor(){
	var _self = this;

	/**
	 * 按钮监测
	 */
	_self.btnMonitor =  function(source){
		$("body").on("click",".monitor",function(){
			var hmsr = source || false;
			var index = $(".wrap").attr("data-index") || "默认页";
			var category = $(this).attr("data-category") || index;
			var label = $(this).attr("data-label");
			_self.addMonitor(hmsr,index,category,label);	
		});
	}//end func

	/**
	 * 页面监测
	 */
	_self.addMonitor = function(){
		if(window._hmt) _hmt.push(['_trackEvent', hmsr?'来源：'+hmsr:'来源：默认', index, (category!=''?category+'-':'') + label]);
		if(window.ga) ga('send', 'event', hmsr?'来源：'+hmsr:'来源：默认', index, (category!=''?category+'-':'') + label);
	}//end func

}//end import