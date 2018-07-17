//公共部分是否加载完成的变量
var loadHeaderEnd = false;
var loadFooterEnd = false;

//页面初始化
$(document).ready(function() {
    renderHeadNav();
    renderFootNav();
    if(icom.windowsW < 1000) icom.remUnitConverter(750);   //根据设计稿的宽度设定
}); //end ready

//显示页面内容
function pageContShow() {
    if (loadHeaderEnd && loadFooterEnd) {
        $("body").removeClass('hide');
        publicEventBind();
        imonitor.btnMonitor();
    }
} //end func

//公共的事件绑定
function publicEventBind() {
    
} //end func

//渲染页面头部导航
function renderHeadNav() {
    if ($("#headNav").length > 0) {
        $("#headNav").load("publicHtml/headNav.html?v=" + Math.random(), function() {
            loadHeaderEnd = true;
            pageContShow();
        });
    }
} //end func

//渲染底部导航部分
function renderFootNav() {
    if ($("#footNav").length > 0) {
        $("#footNav").load("publicHtml/footNav.html?v=" + Math.random(), function() {
            loadFooterEnd = true;
            pageContShow();
        });
    }
} //end func