/**
 * Created by huangxueying on 2016/4/27.
 */
var request = require('supertest');
var should = require('should');
var common =  require('./common');
describe('今日工作',function(res){
    it("获取用户当前计划与实际汇总信息",function(done){
        request(common.getHttpUrl())
        .post("/actuality/getPlanAndActuTotal")
        .send({
            token:common.getToken(),
            data:1403931367000
        })
        .expect(200)
        .end(function(err,res){
            var data = res.body;
            data.should.have.properties({isSuccess:true,responseCode:0});
            data.total[0].should.have.property("totalName").which.is.a.String();
        });
    })

});