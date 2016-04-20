/**
 * Created by huangxueying on 2016/4/20.
 */
var request = require('supertest');
var httpUrl = "http://www.limesoftware.cn:3000/bluemoon-control";
var token = "85055781AEFD98E9BC1C4A16F261EBD1";
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
                    ,contents:'BM_MOONMALL:13416208021'
                })
                .expect(200)
                .end(function(err,res){
                    var data = res.body;
                    data.should.have.properties({isSuccess:true,responseCode:0});
                    data.userBase.should.have.property('mobile').which.is.a.String();
                    data.userBase.should.have.property('nickName').which.is.a.String();
                    data.userBase.should.have.property('registTime').which.is.a.Number();
                    data.userBase.should.have.property('registClient').which.is.a.String();
                    done();
                });
        });
        it('非法参数',function(done){
            request(httpUrl)
            .post(buildUrl(url))
            .send({})
            .expect(200)
            .end(function(err,res){
                var data=res.body;
                data.should.have.properties({isSuccess:false,responseCode:1101,responseMsg:'非法参数！'});
                done()
            });
        });
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
                    data.should.have.properties({isSuccess:true,responseCode:0});
                    data.should.have.property('activitys').which.is.an.Array();
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
        it('非法参数',function(done){
            request(httpUrl)
                .post(buildUrl(url))
                .send({})
                .expect(200)
                .end(function(err,res){
                    var data=res.body;
                    data.should.have.properties({isSuccess:false,responseCode:1101,responseMsg:'非法参数！'});
                    done()
                });
        });
    });
    describe('人工发券',function(res){
        var url = '/card/mensendCoupon';
        it('人工发券',function(done){
            request(httpUrl)
                .post(buildUrl(url))
                .send({
                    token:token
                    ,mobile:'13344552345'
                    ,activityCode:'YHQ343465432124354'
                    ,outerCode:[{
                        couponCode:'ZPQ43465432124354'
                        ,couponName:'测试券'
                        ,couponSName:'测试券'
                    }]
                })
                .expect(200)
                .end(function(err,res){
                    var data = res.body;
                    data.should.have.properties({isSuccess:true,responseCode:0});
                    done();
                });
        });
        it('非法参数',function(done){
            request(httpUrl)
                .post(buildUrl(url))
                .send({})
                .expect(200)
                .end(function(err,res){
                    var data=res.body;
                    data.should.have.properties({isSuccess:false,responseCode:1101,responseMsg:'非法参数！'});
                    done();
                });
        });
    });
    describe('获取天使推送记录',function(res){
        var url = '/card/getMensendCouponLog';
        it('获取天使推送记录',function(done){
            request(httpUrl)
                .post(buildUrl(url))
                .send({
                    token:token
                    ,date:145643233545435
                })
                .expect(200)
                .end(function(err,res){
                    var data = res.body;
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
        it('非法参数',function(done){
            request(httpUrl)
                .post(buildUrl(url))
                .send({})
                .expect(200)
                .end(function(err,res){
                    var data=res.body;
                    data.should.have.properties({isSuccess:false,responseCode:1101,responseMsg:'非法参数！'});
                    done()
                });
        });
    })
});
