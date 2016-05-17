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
            planDate:new Date().getTime()
        })
        .expect(200)
        .end(function(err,res){
            var data = res.body;
                console.log(data);
            data.should.have.properties({isSuccess:true,responseCode:0});

            data.total[0].should.have.property("totalName").which.is.a.String();
            data.total[0].should.have.property("actuTotal").which.is.a.String();
            data.total[0].should.have.property("planTotal").which.is.a.String();
            data.total[0].should.have.property("compRate").which.is.a.String();
            data.total[0].should.have.property("compRateNo").which.is.a.Number();

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
            data.itemList[0].total[0].should.have.property("compRateNo").which.is.a.String();
            done();
            });
    });
//
//
//    it("获取用户当前日期的计划明细",function(done){
//        request(common.getHttpUrl())
//            .post(common.buildUrl("/plan/getCurrPlanDetailByUserId"))
//            .send({
//                token:common.getToken(),
//                date:new Date().getTime()
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
//
//                data.itemList[0].should.have.property("planId").which.is.a.Number();
//                data.itemList[0].should.have.property("storeId").which.is.a.String();
//                data.itemList[0].should.have.property("storeName").which.is.a.String();
//                data.itemList[0].should.have.property("validFlag").which.is.a.String();
//                data.itemList[0].should.have.property("classId").which.is.a.String();
//                data.itemList[0].should.have.property("classDesc").which.is.a.String();
//
//                data.itemList[0].planTime[0].should.have.property("enterTime").which.is.a.Number();
//                data.itemList[0].planTime[0].should.have.property("leaveTime").which.is.a.Number();
//
//                data.itemList[0].taskList[0].should.have.property("taskId").which.is.a.String();
//                data.itemList[0].taskList[0].should.have.property("taskDesc").which.is.a.String();
//
//                data.itemList[0].prdList[0].should.have.property("customerPrd").which.is.a.String();
//                data.itemList[0].prdList[0].should.have.property("prdName").which.is.a.String();
//                data.itemList[0].prdList[0].should.have.property("prdNum").which.is.a.Number();
//                data.itemList[0].prdList[0].should.have.property("price").which.is.a.Number();
//                data.itemList[0].prdList[0].should.have.property("isNew").which.is.a.Number();
//
//                done();
//            });
//    });

//
//    it("根据计划编号更新计划有效标记",function(done){
//        request(common.getHttpUrl())
//            .post(common.buildUrl("/actuality/updatePlanValidFlagByPlanId"))
//            .send({
//                token:common.getToken(),
//                planId:1,
//                validFlag:"asdf"
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
//                done();
//            });
//    });
//
//    it("根据计划日期更新有效标记",function(done){
//        request(common.getHttpUrl())
//            .post(common.buildUrl("/plan/updatePlanValidFlagByDate"))
//            .send({
//                token:common.getToken(),
//                date:1,
//                validFlag:"asdf"
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
//                done();
//            });
//    });
//
//    it("进、离店打卡操作",function(done){
//        request(common.getHttpUrl())
//            .post(common.buildUrl("/actuality/savePunchInfo"))
//            .send({
//                token:common.getToken()
//                ,planId:10412
//                ,status:"ENTER_STORE"
//                ,workTime:new Date().getTime()
//                ,gpsType:"gps"
//                ,gpsHeight:"10.05"
//                ,gpsLongitude:"23.34"
//                ,gpsLatitude:"102.32"
//                ,gpsAddress:"北京市朝阳区36号"
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
//                done();
//            });
//    });
//
    it("获取进店打卡信息",function(done){
        request(common.getHttpUrl())
            .post(common.buildUrl("/actuality/getPunchOfLeaveByPlanId"))
            .send({
                token:common.getToken()
                ,planId:1
            })
            .expect(200)
            .end(function(err,res){
                var data = res.body;
                data.should.have.properties({isSuccess:true,responseCode:0});
                data.should.have.property("status").which.is.a.String();
                done();
            });
    });

//    it("销量提报",function(done){
//        request(common.getHttpUrl())
//            .post(common.buildUrl("/actuality/saveActuInfo"))
//            .send({
//                token:common.getToken()
//                ,planId:1
//                ,storeId:"0002000001"
//                ,actuDate:1403931367000
//                ,classId:"Z001"
//                ,noSalesReason:"asfddas"
//                ,remark:"sfsdc"
//                ,taskList:[{
//                    taskId:"T0001"
//                }]
//                ,prdList:[{
//                    customerPrd:"L10010002"
//                    ,prdNum:10
//                    ,isGroupBuy:0
//                    ,isNew:0
//                    }]
//                ,fileList:[{
//                    isNew:12
//                    ,fileStr:"upload/images/1437467044147.jpg"
//                }]
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
//                done();
//            });
//    });
//
    it("图片上传",function(done){
        request(common.getHttpUrl())
            .post(common.buildUrl("/actuality/uploadFile"))
            .send({
                token:common.getToken()
                ,planId:10412
                ,fileStr:"324324fadasfdasdasddasf2q423"
            })
            .expect(200)
            .end(function(err,res){
                var data = res.body;
                data.should.have.properties({isSuccess:true,responseCode:0});
                done();
            });
    });

});