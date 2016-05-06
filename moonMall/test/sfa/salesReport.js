/**
 * 销售报表
 */
var request = require('supertest');
var should = require('should');
var common =  require('./common');
describe('销售报表',function(res){
    it("每日计划实际汇总信息",function(done){
        request(common.getHttpUrl())
            .post(common.buildUrl("/report/getPlanActuOfDayByDate"))
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
                data.total[0].should.have.property("compRate").which.is.a.String();

                data.itemList[0].should.have.property("storeId").which.is.a.String();
                data.itemList[0].should.have.property("storeName").which.is.a.String();

                data.itemList[0].total[0].should.have.property("totalName").which.is.a.String();
                data.itemList[0].total[0].should.have.property("actuTotal").which.is.a.String();
                data.itemList[0].total[0].should.have.property("planTotal").which.is.a.String();
                data.itemList[0].total[0].should.have.property("compRate").which.is.a.String();
                done();
            });

    });

    it("根据日期或计划编号查询实际明细列表",function(done){

        request(common.getHttpUrl())
            .post(common.buildUrl("/actuality/getActuDetailByDateOrPlanId"))
            .send({
                token:common.getToken(),
                planId:0,
                storeId:"0002000001",
                date:1403931367000
            })
            .expect(200)
            .end(function(err,res){
                var data = res.body;
                data.should.have.properties({isSuccess:true,responseCode:0});

                data.itemList[0].should.have.property("planId").which.is.a.Number();
                data.itemList[0].should.have.property("storeId").which.is.a.String();
                data.itemList[0].should.have.property("storeName").which.is.a.String();
                data.itemList[0].should.have.property("classId").which.is.a.String();
                data.itemList[0].should.have.property("classDesc").which.is.a.String();
                data.itemList[0].should.have.property("validFlag").which.is.a.String();
                data.itemList[0].should.have.property("remark").which.is.a.String();
                data.itemList[0].should.have.property("noSalesReason").which.is.a.String();

                data.itemList[0].taskList[0].should.have.property("taskId").which.is.a.String();
                data.itemList[0].taskList[0].should.have.property("taskDesc").which.is.a.String();

                data.itemList[0].workTime[0].should.have.property("enterTime").which.is.a.Number();
                data.itemList[0].workTime[0].should.have.property("leaveTime").which.is.a.Number();

                data.itemList[0].prdList[0].should.have.property("customerPrd").which.is.a.String();
                data.itemList[0].prdList[0].should.have.property("prdName").which.is.a.String();
                data.itemList[0].prdList[0].should.have.property("prdNum").which.is.a.Number();
                data.itemList[0].prdList[0].should.have.property("price").which.is.a.Number();
                data.itemList[0].prdList[0].should.have.property("isNew").which.is.a.Number();
                data.itemList[0].prdList[0].should.have.property("isGroupBuy").which.is.a.Number();

                data.itemList[0].fileList[0].should.have.property("filePath").which.is.a.String();

                done();
            });

    });


    it("获取用户指定月份的计划实际汇总信息",function(done){

        request(common.getHttpUrl())
            .post(common.buildUrl("/report/getPlanActuTotalByMonth"))
            .send({
                token:common.getToken(),
                yearMonth:1403931367000
            })
            .expect(200)
            .end(function(err,res){
                var data = res.body;
                data.should.have.properties({isSuccess:true,responseCode:0});

                data.total[0].should.have.property("totalName").which.is.a.String();
                data.total[0].should.have.property("actuTotal").which.is.a.String();
                data.total[0].should.have.property("planTotal").which.is.a.String();
                data.total[0].should.have.property("compRate").which.is.a.String();

                data.itemList[0].should.have.property("storeId").which.is.a.String();
                data.itemList[0].should.have.property("storeName").which.is.a.String();
                data.itemList[0].total[0].should.have.property("totalName").which.is.a.String();
                data.itemList[0].total[0].should.have.property("actuTotal").which.is.a.String();
                data.itemList[0].total[0].should.have.property("planTotal").which.is.a.String();
                data.itemList[0].total[0].should.have.property("compRate").which.is.a.String();
                done();
            });

    });
});
