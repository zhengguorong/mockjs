/**
 * Created by huangxueying on 2016/4/27.
 */


var httpUrl = "https://angelapi.bluemoon.com.cn:8881/bmcrm-control/";
var token = "0e7cefb7165a4669ef870f9511b6ee69";

module. exports={
    //加入公共参数
    buildUrl:function(url){
        var sceString="?client=wx&cuid=abc&format=json&time=1456830432362&version=3.0.0.417&sign=06b858215e58682041d214e02ffd69df";
        var url=url+sceString;
        return url;
    },
    getHttpUrl:function(){
        return httpUrl;
    },
    getToken:function(){
        return token;
    }
};