/**********************
*******2019.2.12*******
*******   page  *******
**********************/

var API = new importAPI();

function importAPI () {
	var _self = this;
	var requestDomain = location.href.indexOf("seventh") == -1 ? "http://127.1.1.1/API/" : "/API/";

	function _Ajax(opts){
	    icom.loadingShow();

	    $.ajax({
	        type: 'POST',
	        url: requestDomain + opts.API,
	        dataType: 'json',
	        async: true,
	        data: opts.data,
	        success: function(data){
	        	icom.loadingHide();
		        if (opts.Type) {
		            if (opts.onSuccess) opts.onSuccess(data);
		        } else {
		            if (data.errcode == 0) {
		                if (opts.onSuccess) opts.onSuccess(data.result);
		            } else {
		                alert(data.errmsg)
		            }
		        }
	        },
	        error: function(){
	        	alert("网络可能存在问题，请刷新试试！");
	        }
	    });
	}
}//end import