/**
 * Created by huangxueying on 2016/4/27.
 */
var request = require('supertest');
var should = require('should');
var common =  require('./common');
describe('今日工作',function(res){
    it("获取用户当前计划与实际汇总信息",function(done){
        request(common.getHttpUrl())
        .post(common.buildUrl("/actuality/getPlanAndActuTotal"))
        .send({
            token:common.getToken(),
            date:1403931367000
        })
        .expect(200)
        .end(function(err,res){
            var data = res.body;
            data.should.have.properties({isSuccess:true,responseCode:0});

            data.total[0].should.have.property("totalName").which.is.a.String();
            data.total[0].should.have.property("actuTotal").which.is.a.String();
            data.total[0].should.have.property("planTotal").which.is.a.String();

            data.itemList[0].should.have.property("planId").which.is.a.Number();
            data.itemList[0].should.have.property("storeId").which.is.a.String();
            data.itemList[0].should.have.property("storeName").which.is.a.String();
            data.itemList[0].should.have.property("validFlag").which.is.a.String();
            data.itemList[0].should.have.property("count").which.is.a.Number();
            data.itemList[0].should.have.property("status").which.is.a.String();
            data.itemList[0].should.have.property("classId").which.is.a.String();
            data.itemList[0].should.have.property("classDesc").which.is.a.String();

            data.itemList[0].planTime[0].should.have.property("enterTime").which.is.a.Number();
            data.itemList[0].planTime[0].should.have.property("leaveTime").which.is.a.Number();

            data.itemList[0].taskList[0].should.have.property("taskId").which.is.a.String();
            data.itemList[0].taskList[0].should.have.property("taskDesc").which.is.a.String();

            data.itemList[0].workTime[0].should.have.property("enterTime").which.is.a.Number();
            data.itemList[0].workTime[0].should.have.property("leaveTime").which.is.a.Number();

            data.itemList[0].total[0].should.have.property("totalName").which.is.a.String();
            data.itemList[0].total[0].should.have.property("actuTotal").which.is.a.String();
            data.itemList[0].total[0].should.have.property("planTotal").which.is.a.String();
            data.itemList[0].total[0].should.have.property("compRate").which.is.a.String();
            done();
            });
    });


});