/**
 * Created by huangxueying on 2016/4/20.
 */
var request = require('supertest');

var should = require('should');
var httpUrl = "http://angelapi.bluemoon.com.cn:8882/bluemoon-control";
var token = "99f3724f64c189fc7b564baf636e5dad";
//加入公共参数
function buildUrl(url){
    var sceString="?client=wx&cuid=abc&format=json&time=1456830432362&version=3.0.0.417&sign=06b858215e58682041d214e02ffd69df";
    var url=url+sceString;
    return url;
}

describe('卡券活动',function(res){
    describe('查询消费者基本信息',function(res){
        var url = '/card/getCustomerInfo';
        it('查询消费者基本信息',function(done){
            request(httpUrl)
                .post(buildUrl(url))
                .send({
                    token:token
                    ,contents:'BM_MOONMALL:18620560907'
                })
                .expect(200)
                .end(function(err,res){
                    var data = res.body;
//                    console.log(data);
                    data.should.have.properties({isSuccess:true,responseCode:0});
                    data.userBase.should.have.property('mobile').which.is.a.String();
                    data.userBase.should.have.property('nickName').which.is.a.String();
                    data.userBase.should.have.property('registTime').which.is.a.Number();
                    data.userBase.should.have.property('registClient').which.is.a.String();
                    done();
                });
        });

//        it('非法参数',function(done){
//            request(httpUrl)
//            .post(buildUrl(url))
//            .send({})
//            .expect(200)
//            .end(function(err,res){
//                var data=res.body;
//                data.should.have.properties({isSuccess:false,responseCode:1101,responseMsg:'非法参数！'});
//                done()
//            });
//        });
    });
    describe('查询有发券权限的活动',function(res){
        var url = '/card/getOwnAuthCouponAct';
        it('查询有发券权限的活动',function(done){
            request(httpUrl)
                .post(buildUrl(url))
                .send({
                    token:token
                })
                .expect(200)
                .end(function(err,res){
                    var data = res.body;
//                    console.log(httpUrl+buildUrl(url));
                    data.should.have.properties({isSuccess:true,responseCode:0});
                    data.should.have.property('activitys').which.is.an.Array();
//                    console.log(data);
                    var list = data.activitys;
                    for(var i = 0;i<list.length;i++){
                        list[i].should.have.property('activityCode').which.is.a.String();
                        list[i].should.have.property('activityName').which.is.a.String();
                        list[i].should.have.property('activitySName').which.is.a.String();
                        list[i].should.have.property('startTime').which.is.a.Number();
                        list[i].should.have.property('endTime').which.is.a.Number();
                        list[i].should.have.property('activityDesc').which.is.a.String();
                        var couponsList = list[i].coupons;
                        for(var j = 0;j<couponsList;j++){
                            couponsList[j].should.have.property('couponCode').which.is.a.String();
                            couponsList[j].should.have.property('couponName').which.is.a.String();
                            couponsList[j].should.have.property('couponSName').which.is.a.String();
                        }
                    }
                    done();
                });
        });

//        it('非法参数',function(done){
//            request(httpUrl)
//                .post(buildUrl(url))
//                .send({})
//                .expect(200)
//                .end(function(err,res){
//                    var data=res.body;
//                    data.should.have.properties({isSuccess:false,responseCode:1101,responseMsg:'非法参数！'});
//                    done()
//                });
//        });
    });

//    describe('人工发券',function(res){
//        var url = '/card/mensendCoupon';
//        it('人工发券',function(done){
//            request(httpUrl)
//                .post(buildUrl(url))
//                .send({
//                    token:token
//                    ,mobile:'18620560907'
//                    ,activityCode:'YHQ2016042200002'
//                    ,coupons:[{
//                        couponCode:'ZPQ2016042200001'
//                        ,couponName:'快失效了'
//                        ,couponSName:'11:30失效'
//                    }]
//                })
//                .expect(200)
//                .end(function(err,res){
//                    var data = res.body;
//                    data.should.have.properties({isSuccess:true,responseCode:0});
//                    done();
//                });
//        });
//        it('非法参数',function(done){
//            request(httpUrl)
//                .post(buildUrl(url))
//                .send({})
//                .expect(200)
//                .end(function(err,res){
//                    var data=res.body;
//                    data.should.have.properties({isSuccess:false,responseCode:1101,responseMsg:'非法参数！'});
//                    done();
//                });
//        });
//    });
    describe('获取天使推送记录',function(res){
        var url = '/card/getMensendCouponLog';
        it('获取天使推送记录',function(done){
            request(httpUrl)
                .post(buildUrl(url))
                .send({
                    token:token
                    ,date:1461313342000
                })
                .expect(200)
                .end(function(err,res){
                    var data = res.body;
//                    console.log(data);
                    data.should.have.properties({isSuccess:true,responseCode:0});
                    data.should.have.property('total').which.is.a.Number();
                    var mensendLogs = data.mensendLogs;
                    for(var i = 0;i<mensendLogs.length;i++){
                        mensendLogs[i].should.have.property('sendNum').which.is.a.Number();
                        mensendLogs[i].should.have.property('sendTime').which.is.a.Number();

                        mensendLogs[i].userBase.should.have.property('mobile').which.is.a.String();
                        mensendLogs[i].userBase.should.have.property('nickName').which.is.a.String();
                        mensendLogs[i].userBase.should.have.property('registTime').which.is.a.Number();
                        mensendLogs[i].userBase.should.have.property('registClient').which.is.a.String();

                        mensendLogs[i].activity.should.have.property('activityCode').which.is.a.String();
                        mensendLogs[i].activity.should.have.property('activityName').which.is.a.String();
                        mensendLogs[i].activity.should.have.property('activitySName').which.is.a.String();
                        mensendLogs[i].activity.should.have.property('startTime').which.is.a.Number();
                        mensendLogs[i].activity.should.have.property('endTime').which.is.a.Number();
                        var coupons = mensendLogs[i].activity.coupons;
                        for(var j = 0;j<coupons.length;j++){
                            coupons[j].should.have.property('couponCode').which.is.a.String();
                            coupons[j].should.have.property('couponName').which.is.a.String();
                            coupons[j].should.have.property('couponSName').which.is.a.String();
                        }
                    }
                    done();
                });
        });

//        it('非法参数',function(done){
//            request(httpUrl)
//                .post(buildUrl(url))
//                .send({})
//                .expect(200)
//                .end(function(err,res){
//                    var data=res.body;
//                    data.should.have.properties({isSuccess:false,responseCode:1101,responseMsg:'非法参数！'});
//                    done()
//                });
//        });
    })
});
