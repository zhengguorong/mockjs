/**
 * Created by huangxueying on 2016/4/27.
 */
var request = require('supertest');
var should = require('should');
var common =  require('./common');
var token = "a786906b3bbd32d23d0df16a4e45ab32";
describe('用户相关',function(res){
    it("用户登录",function(done){
        request(common.getHttpUrl())
            .post(common.buildUrl("/user/ssoLogin"))
            .send({
                account:"80474566"
                ,password:"ANejIRrmFmo="
                ,deviceNum:"sdsdsfsdfsdfsdfsdfsdfsd"
            })
            .expect(200)
            .end(function(err,res){
                var data = res.body;
                data.should.have.properties({isSuccess:true,responseCode:0});
                token = data.token;
                console.log(token);
                data.should.have.property("token").which.is.a.String();
                done();
            });
    });

    it("获取用户信息",function(done){
        request(common.getHttpUrl())
            .post(common.buildUrl("/user/getUserInfo"))
            .send({
                token:token
            })
            .expect(200)
            .end(function(err,res){
                var data = res.body;
                data.should.have.properties({isSuccess:true,responseCode:0});
                data.user.should.have.property("account").which.is.a.String();
                data.user.should.have.property("realName").which.is.a.String();
                data.user.should.have.property("mobileNo").which.is.a.String();
                data.user.should.have.property("sex").which.is.a.String();
                data.user.should.have.property("blood").which.is.a.String();
                data.user.should.have.property("empType").which.is.a.String();
                done();
            });
    });
//
//    it("退出登录",function(done){
//        request(common.getHttpUrl())
//            .post(common.buildUrl("/user/logout"))
//            .send({
//                token:token
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
//                done();
//            });
//    });
//
//    it("修改密码",function(done){
//        request(common.getHttpUrl())
//            .post(common.buildUrl("/user/updatePassword"))
//            .send({
//                token:token
//                ,oldPassword:"ANejIRrmFmo="
//                ,newPassword:"ANejIRrmFmo="
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
//                done();
//            });
//    });
//
//    it("短信方式重置密码",function(done){
//        request(common.getHttpUrl())
//            .post(common.buildUrl("/user/resetPassword"))
//            .send({
//                mobileNo:"18676020987"
//                ,verifyCode:"1234"
//                ,newPassword:"ch6koq+jub8="
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
//                done();
//            });
//    });
//
//    it("获取短信验证码（重置密码）",function(done){
//        request(common.getHttpUrl())
//            .post(common.buildUrl("/user/getVerifyCode"))
//            .send({
//                mobileNo:"18676020987"
//                ,account:"80100272"
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
//                data.should.have.property("vailCode").which.is.a.String();
//                data.should.have.property("time").which.is.a.Number();
//                done();
//            });
//    });
//
    it("获取用户APP菜单权限",function(done){
        request(common.getHttpUrl())
            .post(common.buildUrl("/user/getAppRights"))
            .send({
                token:token
            })
            .expect(200)
            .end(function(err,res){
                var data = res.body;
                data.should.have.properties({isSuccess:true,responseCode:0});
                data.rightsList[0].should.have.property("menuId").which.is.a.String();
                data.rightsList[0].should.have.property("menuCode").which.is.a.String();
                data.rightsList[0].should.have.property("menuName").which.is.a.String();
                data.rightsList[0].should.have.property("iconImg").which.is.a.String();
                data.rightsList[0].should.have.property("url").which.is.a.String();
                done();
            });
    });

});