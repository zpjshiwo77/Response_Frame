/**********************
*******2019.2.12*******
*******   page  *******
**********************/

var icom = new importCom();

function importCom() {
	var _self = this;

	//屏幕宽高
	_self.windowsW = $(window).width();
	_self.windowsH = $(window).height();

	/**
	 * 获得url参数
	 * @param {*} name			参数名称
	 */
	_self.getUrlParam = function(name) {
		if(name && name != '') {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return decodeURIComponent(r[2]);
			return null;
		} //end if
		else return null;
	} //end func

	/**
	 * 加载图片
	 * @param {*} src				图片路径
	 * @param {*} callback			回调函数
	 */
	_self.imageLoad = function(src, callback) {
		if(src && src != '') {
			var loader = new PxLoader();
			if($.type(src) === "string" && src != '') loader.addImage(src);
			else if($.type(src) === "array" && src.length > 0) {
				for(var i = 0; i < src.length; i++) {
					loader.addImage(src[i]);
				} //end for
			} //end else
			loader.addCompletionListener(function() {
				loader = null;
				if(callback) callback(src);
			});
			loader.start();
		} //end if
	} //end func	

	/**
	 * 常用正则
	 * @param {*} str			字符串
	 * @param {*} type			类型 0手机号码 1邮政编码 2EMAIL 3身份证 4 0-9的数字 5不能以数字或符号开头 6匹配由数字、26个英文字母或者下划线组成的字符串 7匹配中文 8不能包含数字和符号 9 6位验证码验证 10 4位验证码验证 11 6到10位数字与字母,下划线组合
	 */
	_self.checkStr = function(str, type) {
		if(str && str != '') {
			type = type || 0;
			switch(type) {
				case 0:
					var reg = new RegExp(/^1[3-9]\d{9}$/); //手机号码验证
					break;
				case 1:
					var reg = new RegExp(/^[1-9]\d{5}$/); //邮政编码验证
					break;
				case 2:
					var reg = new RegExp(/^([A-Za-z0-9._%+-])+@([a-zA-Z0-9])+(\.[a-zA-Z0-9])+/); //匹配EMAIL
					break;
				case 3:
					var reg = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/); //匹配身份证
					break;
				case 4:
					var reg = new RegExp(/^\d+$/); //是否为0-9的数字
					break;
				case 5:
					var reg = new RegExp(/^[a-zA-Z\u0391-\uFFE5]*[\w\u0391-\uFFE5]*$/); //不能以数字或符号开头
					break;
				case 6:
					var reg = new RegExp(/^\w+$/); //匹配由数字、26个英文字母或者下划线组成的字符串
					break;
				case 7:
					var reg = new RegExp(/^[\u0391-\uFFE5]+$/); //匹配中文
					break;
				case 8:
					var reg = new RegExp(/^[a-zA-Z\u0391-\uFFE5]+$/); //不能包含数字和符号
					break;
				case 9:
					var reg = new RegExp(/^\d{6}$/); //6位验证码验证
					break;
				case 10:
					var reg = new RegExp(/^\d{4}$/); //4位验证码验证
					break;
				case 11:
					var reg = new RegExp(/^(\w){6,10}$/);//6到10位数字与字母,下划线组合
					break;
			} //end switch
			if(reg.exec($.trim(str))) return true;
			else return false;
		} //end if
		else return false;
	} //end func
	
	/**
	 * 切割单行文字成几行
	 * @param {*} str			字符串
	 * @param {*} col			行数
	 */
	_self.textToMulti = function(str,col) {
		if(str!='' && col>1){
			if(str.indexOf('\n') == -1 && str.length>col) {
				var str1='';
				var line=Math.ceil(str.length/col);
				console.log('line:'+line);
				for(var i = 0; i < line; i++) {
					if(i < line - 1) str1 += str.substr(i * col, col) + '\n';
					else str1 += str.substr(i * col);
				} //edn for
				return str1;
			} //end if
			else return str;
		}//edn if
		else return null;
	}//edn func

	/**
	 * 字符串转json
	 * @param {*} str			字符串
	 */
	_self.strToJson = function(str){
		var json = eval('(' + str + ')'); 
    	return json;
	}//end func

	/**
	 * json转字符串
	 * @param {*} json			json对象
	 */
	_self.jsonToStr = function(json){
		var str = JSON.stringify(json);
    	return str;
	}//end func

	/**
	 * 检查是否是null或undefined
	 * @param {*} obj			对象
	 */
	_self.checkNull = function(obj){
		var bool = false;
	    if(obj == null || obj == "null" || obj == undefined || obj == "undefined") bool = true;
	    return bool;
	}//end func

	/**
	 * 获取当前页面地址
	 */
	_self.getThePageUrl = function(){
	    var url = location.href;
	    return url.split("/").pop();
	} //end func

	/**
	 * 获取字符串长度
	 * @param {*} str			字符串
	 */
	_self.getStringLen = function(str){
	    var strlen = 0;
	    for (var i = 0; i < str.length; i++) {
	        if (str.charCodeAt(i) > 128) {
	            strlen += 2;
	        } else {
	            strlen++;
	        }
	    }
	    return strlen;
	}//end func

	/**
	 * 字符串截取
	 * @param {*} str			需要截取的字符串
	 * @param {*} len			截取长度
	 */
	_self.setString = function(str, len) {
	    var strlen = 0;
	    var s = "";
	    for (var i = 0; i < str.length; i++) {
	        if (str.charCodeAt(i) > 128) {
	            strlen += 2;
	        } else {
	            strlen++;
	        }
	        s += str.charAt(i);
	        if (strlen >= len) {
	            return s + "...";
	        }
	    }
	    return s;
	} //end func

	/**
	 * rem单位转换
	 * @param {*} width			转换的宽度
	 */
	_self.remUnitConverter = function(width){
		var scale = width / 100;
		var unit = _self.windowsW / scale;
		$("html").css('font-size', unit);
	}//end func

	/**
	 * 显示loading
	 */
	_self.loadingShow = function() {
	    if($(".loading").length < 1) $("body").append('<div class="loading "><img src="images/public/loading.gif"></div>');
	    $(".loading").transition({ opacity: 1 }, 200);
	} //end func

	/**
	 * 隐藏loading
	 */
	_self.loadingHide = function() {
	    if($(".loading").length > 0) $(".loading").transition({ opacity: 0 }, 200, function() { $(this).remove() });
	} //end func

	/**
	 * 复制文本到剪切板
	 * @param {*} box			存储复制的文本dom对象
	 * @param {*} val 			需要复制的值
	 * @param {*} onComplete	复制成功的回调
	 * @param {*} onError		复制失败的回调
	 */
	_self.clipboard=function(box,val,onComplete,onError){
		var support = !!document.queryCommandSupported;
		if(support){
			if(box.length>0 && val!=''){
				box.attr({'data-copy':val}).on('click',{callback:onComplete},_copyText);
			}//edn if
		}//edn if
		else{
			console.log('浏览器不支持复制文本到剪贴板');
			if(onError) onError();
		}//end else
	}//edn func

	/**
	 * 时间格式转换
	 * @param {*} dete 			时间对象
	 * @param {*} detail		是否显示时，分，秒
	 * @param {*} string		分隔符
	 */
	_self.formatDateTime = function(date,detail,sign){
	    var y = date.getFullYear();    
	    var m = date.getMonth() + 1;    
	    m = m < 10 ? ('0' + m) : m;    
	    var d = date.getDate();    
	    d = d < 10 ? ('0' + d) : d;    
	    var h = date.getHours();  
	    h = h < 10 ? ('0' + h) : h;  
	    var minute = date.getMinutes();  
	    var second = date.getSeconds();  
	    minute = minute < 10 ? ('0' + minute) : minute;    
	    second = second < 10 ? ('0' + second) : second;   
	    if(detail) return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
	    else return y + sign + m + sign + d;
	}//end func
	
	/**
	 * 拷贝文本
	 * @param {*} e 事件对象
	 */
	function _copyText(e){
		var val=$(this).data('copy');
		var input=$('<textarea readonly="readonly"></textarea>').html(val).css({position:'absolute',left:0,top:0,width:1,height:1,visible:'hidden'}).appendTo('body');
		input[0].select();
		input[0].setSelectionRange(0, input[0].value.length);
		console.log('copy content:'+input.val())
		document.execCommand('Copy');
		input.remove();
		input=null;
		if(e.data.callback) e.data.callback();
	}//edn func

	/**
	 * 处理ios输入框的问题
	 */
	_self.IOSInput = function(){
		if(os.ios){
	        var itimer;
	        document.body.addEventListener('focusin', function(){
	            setTimeout(function(){
	                clearTimeout(itimer);
	            },200); 
	        })
	        document.body.addEventListener('focusout', function(){
	            itimer = setTimeout(function(){
	               $("body").scrollTop(0)
	            },300);
	        })
	    }
	}

	/**
	 * 获取站链接
	 */
	_self.getDominUrl = function(){
		var hrefs=window.location.href.split('?');
		return hrefs[0].substr(0, hrefs[0].lastIndexOf('/')+1);
	}
	
	/**
	 * 动态加载css
	 */
	_self.loadCss=function(src,shell,callback){
		shell = shell || 'head';
		var fileref = document.createElement('link');
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", src);
		document.querySelector(shell).appendChild(fileref);
		if(callback) fileref.onload = callback;
	}//edn func
	
	/**
	 * 动态加载js
	 */
	_self.loadJs=function(src,shell,callback){
		shell = shell || 'body';
		var fileref = document.createElement('script');
		fileref.setAttribute("type", "text/javascript");
		fileref.setAttribute("src", src);
		document.querySelector(shell).appendChild(fileref);
		if(callback) fileref.onload = callback;
	}//edn func
} //end import
