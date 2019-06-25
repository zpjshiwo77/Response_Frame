var os = importOS();
function importOS() {
	var userAgent = navigator.userAgent;
	var browser = navigator.appName;
	var b_version = navigator.appVersion;
	var version = b_version.split(";");
	var os = {};
	os.windowW = window.innerWidth;
	os.windowH = window.innerHeight;
	os.screenProp = os.windowW / os.windowH;
	os.userAgent = userAgent;
	os.android = userAgent.match(/(Android)\s+([\d.]+)/) || userAgent.match(/Silk-Accelerated/) ? true : false;
	os.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
	os.iphone = !os.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
	os.ios = os.ipad || os.iphone;
	os.wp = userAgent.match(/Windows Phone/) || userAgent.match(/IEMobile/) ? true : false;
	os.supportsTouch = ((window.DocumentTouch && document instanceof window.DocumentTouch) || 'ontouchstart' in window);
	if(os.ios) os.iosVer = parseInt(userAgent.match(/OS \d+_/)[0].match(/\d+/)[0]);
	os.weixin = userAgent.match(/MicroMessenger/) ? true : false;
	if(os.weixin) {
		var ver = userAgent.match(/MicroMessenger\/\d+.\d+.\d+/)[0].match(/\d+.\d+.\d+/)[0].split('.');
		os.weixinVer = 0;
		for(var i = 0; i < ver.length; i++) os.weixinVer += parseInt(ver[i]) * Math.pow(10, ver.length - i - 1);
	} //edn if
	os.wxApp= window.__wxjs_environment=='miniprogram' || userAgent.match(/miniprogram/) || userAgent.match(/miniProgram/)  ? true : false;
	os.weibo = userAgent.match(/Weibo/) || userAgent.match(/weibo/) ? true : false;
	os.ali = userAgent.match(/AliApp/) ? true : false;
	os.alipay = os.ali && userAgent.match(/Alipay/) ? true : false;
	os.taobao = os.ali && userAgent.match(/WindVane/) ? true : false;
	os.netease = userAgent.match(/NewsApp/) ? true : false;
	os.facebook = userAgent.match(/(FB)/) ? true : false;
	os.safari = os.ios && userAgent.match(/Safari/) ? true : false;
	os.chrome = userAgent.match(/Chrome/) ? true : false;
	os.firefox = userAgent.match(/Firefox/) ? true : false;
	os.ie = document.documentMode;
	os.ie8 = false;
	if (version.length > 1) {
    	var trim_Version = version[1].replace(/[ ]/g, "");
	    if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") os.ie8 = true;
	}
	os.edge = userAgent.match(/Edge/) ? true : false;
	os.pc = !(os.android || os.ios || os.wp);
	os.oppo = false;
	os.oppoBrowser = false;
	os.oppoApp = false;
	os.oppoR15 = false;
	if(os.ios) {
		os.iphoneX = (screen.width == 375 && screen.height == 812) || (screen.width == 375 && window.innerHeight >= 635) || (window.innerWidth == 724 && window.innerHeight == 375) || (window.innerWidth == 375 && window.innerHeight == 724) || (window.innerWidth == 812 && window.innerHeight == 343) || (window.innerWidth == 343 && window.innerHeight == 812);
		os.iphone6Plus = (screen.width == 414 && screen.height == 736) || (screen.width == 414 && window.innerHeight >= 622);
		os.iphone6 = (screen.width == 375 && screen.height == 667) || (screen.width == 375 && window.innerHeight <= 603);
		os.iphone5 = (screen.width == 320 && screen.height == 568) || (screen.width == 320 && window.innerHeight >= 460);
		os.iphone4 = (screen.width == 320 && screen.height == 480) || (screen.width == 320 && window.innerHeight <= 450);
	} //edn if
	else if(os.android) {
		requestAnimationFrame(function() {
			os.screen159 = (screen.width == 360 && window.innerHeight < 540);
			os.screen189 = (screen.width == 360 && window.innerHeight > 590) || (screen.width == 393 && window.innerHeight > 660);
		});
		os.miui = userAgent.match(/MI/) || userAgent.match(/Redmi/) ? true : false;
		os.huawei = userAgent.match(/HUAWEI/) ? true : false;
		os.oppo = userAgent.match(/OPPO/) ? true : false;
		os.oppoBrowser= userAgent.match(/OppoBrowser/) ? true : false;
		os.oppoApp= os.oppo && !os.oppoBrowser && !!window.JSCallJava;
		os.oppoR15 = userAgent.match(/PAAM00/) || userAgent.match(/PAAT00/) || userAgent.match(/PACM00/) || userAgent.match(/PACT00/) ? true : false;
		os.vivo = userAgent.match(/vivo/) ? true : false;
	} //edn if
	return os;
} //end func