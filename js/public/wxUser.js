/**********************
*******2019.2.12*******
*******   page  *******
**********************/

var wxUser = new WxUser();

function WxUser(){
    var _self = this;

    /**
     * 初始化
     * @param {*} shareInfo                分享信息
     */
    _self.Init = function(shareInfo){
        var data = {
            url: location.href
        };
        API.GetJSDKdata(data,function(data){
            wxShareConfig(data,shareInfo);
        });
    }

    /**
     * 微信分享设置
     * @param {*} data 
     * @param {*} shareInfo 
     */
    function wxShareConfig(data,shareInfo){
        wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
                'checkJsApi',
                // 'updateAppMessageShareData',
                // 'updateTimelineShareData',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
            ]
        });//end wx.config
        _self.wxSigned = true;  //通过微信新SDK验证

        wx.ready(function () {
            wx.showOptionMenu();
            // wx.hideMenuItems({
            //     menuList:["menuItem:share:appMessage","menuItem:share:timeline","menuItem:openWithSafari"]
            // });
            _self.shareInit(shareInfo);
        });//end wx.ready
    }

    /**
     * 分享初始化
     * @param {*} shareInfo                 分享信息
     */
    _self.shareInit = function(shareInfo){
        if(_self.wxSigned){
            // wx.updateAppMessageShareData({ 
            //     title: shareInfo.title,
            //     desc: shareInfo.desc,
            //     link: shareInfo.link, 
            //     imgUrl: shareInfo.imgUrl,
            //     success: function () {
            //       // 设置成功
            //       console.log("updateAppMessageShareData");
            //     }
            // })
            // wx.updateTimelineShareData({ 
            //     title: shareInfo.title,
            //     link: shareInfo.link, 
            //     imgUrl: shareInfo.imgUrl,
            //     success: function () {
            //       // 设置成功
            //       console.log("updateTimelineShareData");
            //     }
            // })

            wx.onMenuShareAppMessage({
	            title: shareInfo.title, // 分享标题
	            desc: shareInfo.desc, // 分享描述
	            link: shareInfo.link, // 分享链接
	            imgUrl: shareInfo.imgUrl, // 分享图标
	            type: 'link', // 分享类型,music、video或link，不填默认为link
	            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	            success: function () {
	                console.log("onMenuShareAppMessage");
	            }
            });
            
            wx.onMenuShareTimeline({
	            title: shareInfo.title, // 分享标题
	            link: shareInfo.link, // 分享链接
	            imgUrl: shareInfo.imgUrl, // 分享图标
	            success: function () {
	                console.log("onMenuShareTimeline");
	            }
	        });
        }
        else setTimeout(function(){_self.shareInit()},250);
    }
}