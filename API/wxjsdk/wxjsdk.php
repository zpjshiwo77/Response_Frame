<?php
require_once ("jssdk.php");
require_once ("config.wx.php");
//error_reporting(E_ALL);
ini_set('display_errors', 'Off');
//ini_set('display_startup_errors', TRUE);

$jssdk = new JSSDK($_REQUEST["appid"], APPSECRET);
$signPackage = $jssdk->GetSignPackage($_REQUEST["url"]);
$back["appId"] = $signPackage["appId"];
$back["timestamp"] = $signPackage["timestamp"];
$back["nonceStr"] = $signPackage["nonceStr"];
$back["signature"] = $signPackage["signature"];
$back["url"] = $_REQUEST["url"];
$result["errcode"] = 0;
$result["errmsg"] = "成功";
$result["result"] = $back;
if ($_REQUEST["callback"])
	echo($_REQUEST["callback"] . "(" . json_encode($back) . ");");
else 
	echo(json_encode($result));
