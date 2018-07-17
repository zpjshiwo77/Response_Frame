$(document).ready(function(){
	//变量的定义


	//页面初始化
	function pageInit(){
		loadInit();
		eventBind();
	}//end func
	pageInit();

	//加载图片
	function loadInit(){
		var loader = new PxLoader();
		loader.addImage('images/templete/test.jpg');
		
		icom.loadingShow();
		loader.addCompletionListener(function() {
			pageShow();
			icom.loadingHide();
			loader=null;
		});
		loader.start();	
	}//end func

	//页面显示
	function pageShow(){

	}//end func

	//事件绑定
	function eventBind(){

	}//end func


});//end ready