//公共部分是否加载完成的变量
var loadHeaderEnd = false;
var loadFooterEnd = false;

/**
 * 页面初始化
 */
$(document).ready(function() {
    if(os.weixin) wxShareInit();
    // wxShareInit();
    if(icom.windowsW < 1000) icom.remUnitConverter(750);   //根据设计稿的宽度设定
    if(os.screenProp < 0.54) $(".pageWrap").addClass("screen189");
    if(os.screenProp > 0.64) $(".pageWrap").addClass("screen159");
    renderHeadNav();
    renderFootNav();
}); //end ready

/**
 * 微信分享初始化
 */
function wxShareInit(){
    var url = icom.getDominUrl();
    var shareInfo = {
        title: "分享标题",
        desc: "分享文案",
        link: url, 
        imgUrl: "http://seventh77.com/timeline/images/templete/test.jpg",
    }
    var opts = {
        shareInfo: shareInfo
    }
    wxUser.init(opts);
}

/**
 * 显示页面内容
 */
function pageContShow() {
    if (loadHeaderEnd && loadFooterEnd) {
        $("body").removeClass('hide');
        publicEventBind();
        imonitor.btnMonitor();
    }
} //end func

/**
 * 公共的事件绑定
 */
function publicEventBind() {
    
} //end func

/**
 * 渲染页面头部导航
 */
function renderHeadNav() {
    if ($("#headNav").length > 0) {
        $("#headNav").load("publicHtml/headNav.html?v=" + Math.random(), function() {
            loadHeaderEnd = true;
            pageContShow();
        });
    }
} //end func

/**
 * 渲染底部导航部分
 */
function renderFootNav() {
    if ($("#footNav").length > 0) {
        $("#footNav").load("publicHtml/footNav.html?v=" + Math.random(), function() {
            loadFooterEnd = true;
            pageContShow();
        });
    }
} //end func