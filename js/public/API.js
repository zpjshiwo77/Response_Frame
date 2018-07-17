/**********************
*******2018.7.17*******
*******   page  *******
**********************/

var API = new importAPI();

function importAPI () {
	var _self = this;
	var requestDomain = "";

	function _Ajax(opts){
	    icom.loadingShow();

	    $.ajax({
	        type: 'POST',
	        url: requestDomain + opts.API,
	        dataType: 'json',
	        async: true,
	        data: opts.data,
	        success: function(){
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

	//测试接口
	_self.Test = function(data,onSuccess){
		_Ajax({
            API:"/api/test/test",
            data:data,
            onSuccess:onSuccess,
            Type:false
        });
	}//end func
}//end import