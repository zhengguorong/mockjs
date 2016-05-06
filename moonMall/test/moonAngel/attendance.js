/**
 * Created by huangxueying on 2016/4/20.
 */

var request = require('supertest');
var should = require('should');
var httpUrl = "http://angelapi.bluemoon.com.cn:8882/bluemoon-control";
var token = "e6affa1f17e64fca0b50a2d0a7056b88";
//加入公共参数
function buildUrl(url){
    var sceString="?client=wx&cuid=abc&format=json&time=1456830432362&version=3.0.0.417&sign=06b858215e58682041d214e02ffd69df";
    var url=url+sceString;
    return url;
}


describe('考勤打卡',function(res){
//    it('是否打卡',function(done){
//        request(httpUrl)
//            .post(buildUrl('/attendance/isPunchCard'))
//            .send({token:token})
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0,responseMsg:'请求成功！'});
//                data.should.have.property('isPunchCard').which.is.a.Boolean();
//                done();
//            });
//    });
//    it('考勤打卡扫码',function(done){
//        request(httpUrl)
//            .post(buildUrl('/attendance/checkScanCode'))
//            .send({
//                token:token
//                ,attendanceCode:'D0878'
//            }).expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0,responseMsg:'请求成功！'});
//                data.punchCard.should.have.property('attendanceCode').which.is.a.String();
//                data.punchCard.should.have.property('attendanceName').which.is.a.String();
//                data.punchCard.should.have.property('principalId').which.is.a.String();
//                data.punchCard.should.have.property('principalName').which.is.a.String();
//                data.punchCard.should.have.property('provinceName').which.is.a.String();
//                data.punchCard.should.have.property('address').which.is.a.String();
//                data.punchCard.should.have.property('cityName').which.is.a.String();
//                data.workTaskList.should.be.a.Array();
//                for(var i = 0;i<data.workTaskList.length;i++){
//                    data.workTaskList[i].should.have.property('workTaskType').which.is.a.String();
//                    data.workTaskList[i].should.have.property('taskCode').which.is.a.String();
//                    data.workTaskList[i].should.have.property('taskName').which.is.a.String();
//                    data.workTaskList[i].should.have.property('isSelected').which.is.a.Boolean();
//                }
//               done();
//        });
//    });
    it('保存更新打卡信息',function(done){
        var card = {
            punchCardType:"scan",
            workplaceType:"promotion",
            attendanceCode: "D0878",
            provinceName:"广东",
            cityName:"广州",
            countyName: "天河区",
            address: "中山大道西293号",
            longitude: "20.00",
            latitude: "10.00",
            altitude: "20.00"
        };
        request(httpUrl)
            .post(buildUrl('/attendance/confirmAttendance'))
            .send({
                token:token,
                punchCard:card,
                workTask:'1,2,3'
            })
            .expect(200)
            .end(function(err,res){
                var data = res.body;
                data.should.have.properties({isSuccess:true,responseCode:0,responseMsg:'打卡成功！'});
                done();
            });
    });
//
//
//    it('展示打卡信息',function(done){
//        request(httpUrl)
//            .post(buildUrl('/attendance/getPunchCard'))
//            .send({token:token})
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0,responseMsg:'请求成功！'});
////                data.should.have.property('isShow').which.is.a.Boolean();
////                data.punchCard.should.have.property('punchCardId').which.is.a.String();
//                data.punchCard.should.have.property('punchInTime').which.is.a.Number();
//                data.punchCard.should.have.property('attendanceCode').which.is.a.String();
//                data.punchCard.should.have.property('attendanceName').which.is.a.String();
//                data.punchCard.should.have.property('principalName').which.is.a.String();
//                data.punchCard.should.have.property('principalMobile').which.is.a.String();
//                data.punchCard.should.have.property('provinceName').which.is.a.String();
//                data.punchCard.should.have.property('cityName').which.is.a.String();
//                data.punchCard.should.have.property('countyName').which.is.a.String();
//                data.punchCard.should.have.property('address').which.is.a.String();
//                data.punchCard.should.have.property('punchCardType').which.is.a.String();
//                data.punchCard.should.have.property('workplaceType').which.is.a.String();
//                data.punchCard.should.have.property('totalBreedSalesNum').which.is.a.Number();
//                data.punchCard.should.have.property('totalSalesNum').which.is.a.Number();
//                data.punchCard.should.have.property('uploadImgNum').which.is.a.Number();
//                data.workTaskList.should.be.a.Array();
//                for(var i = 0;i<data.workTaskList.length;i++){
//                    data.workTaskList[i].should.have.property('workTaskType').which.is.a.String();
//                    data.workTaskList[i].should.have.property('taskCode').which.is.a.String();
//                    data.workTaskList[i].should.have.property('taskName').which.is.a.String();
//                    data.workTaskList[i].should.have.property('isSelected').which.is.a.Boolean();
//                }
//                done();
//            });
//    });
//    it('获取工作日志',function(done){
//        request(httpUrl)
//            .post(buildUrl('/attendance/getWorkDiary'))
//            .send({token:token})
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0,responseMsg:'请求成功！'});
//                if(data.diaryContent!=null){
//                    data.should.have.property('diaryContent').which.is.a.String();
//                }
//                done();
//            });
//    });
//    it('保存更新工作日志',function(done){
//        request(httpUrl)
//            .post(buildUrl('/attendance/confirmWorkDiary'))
//            .send({
//                token:token,
//                diaryContent:'今天天气很不好。'
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0,responseMsg:'保存成功！'});
//                done();
//            });
//    });
//    it('获取日报',function(done){
//        request(httpUrl)
//            .post(buildUrl('/attendance/getWorkDailyList'))
//            .send({
//                token:token
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0,responseMsg:'请求成功！'});
////                data.workDailyList.should.be.a.Array();
//                data.should.have.property('totalBreedSalesNum').which.is.a.Number();
//                data.should.have.property('totalSalesNum').which.is.a.Number();
//                var workDailyList = data.workDailyList;
//                for(var i = 0;i<workDailyList.length;i++){
//                    workDailyList[i].should.have.property('productCode').which.is.a.String();
//                    workDailyList[i].should.have.property('productName').which.is.a.String();
//                    workDailyList[i].should.have.property('salesNum').which.is.a.Number();
//                }
//
//                done();
//            });
//    });
//    it('选择产品',function(done){
//        request(httpUrl)
//            .post(buildUrl('/attendance/getProductList'))
//            .send({
//                token:token
////                ,condition:'机洗至尊'
////                ,timestamp:'20160402024911'
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
////                data.workDailyList.should.be.a.Array();
//                data.should.have.property('timestamp').which.is.a.Number();
//                var productList = data.productList;
//                for(var i = 0;i<productList.length;i++){
//                    productList[i].should.have.property('productCode').which.is.a.String();
//                    productList[i].should.have.property('productName').which.is.a.String();
//                }
//
//                done();
//            });
//    });
//    it('保存更新日报',function(done){
//        var workDaily = function(code,name,num){
//            this.productCode=code;
//            this.productName=name;
//            this.salesNum=num;
//        };
//        var workDailyList = new Array();
//        workDailyList.push(new workDaily('10000937','机洗至尊',13));
//        workDailyList.push(new workDaily('10000938','机洗至尊',18));
//        request(httpUrl)
//            .post(buildUrl('/attendance/confirmWorkDaily'))
//            .send({
//                token:token
//                ,totalBreedSalesNum:2
//                ,totalSalesNum:31
//                ,workDailyList:workDailyList
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
////                data.should.have.property('isPunchCard').which.is.a.Boolean();
//                done();
//            });
//    });
//    it('上传图片',function(done){
//        request(httpUrl)
//            .post(buildUrl('/attendance/uploadImg'))
//            .send({
//                token:token
//                ,imgPath:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAAtCAYAAAAuj3x7AAAgAElEQ…rNc9r/i7Xl3URzk2/OT3NB/C9XdqRm/xIeMqcITz55t/f/AOjcbIKxZd2gAAAAAElFTkSuQmCC'
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
//                done();
//            });
//    });
//    var imgId = 0;
//    it('展示图片',function(done){
//        request(httpUrl)
//            .post(buildUrl('/attendance/getImgList'))
//            .send({
//                token:token
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
//                var list = data.imgList;
//                for(var i = 0;i<list.length;i++){
//                    imgId = list[i].imgId;
//                    list[i].should.have.property('imgId').which.is.a.String();
//                    list[i].should.have.property('imgPath').which.is.a.String();
//                }
//                done();
//            });
//    });
//
//    it('删除图片',function(done){
//        request(httpUrl)
//            .post(buildUrl('/attendance/removeImg'))
//            .send({
//                token:token
//                ,imgId:imgId
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
//                done();
//            });
//    });
//
//    it('展示打卡记录',function(done){
//        request(httpUrl)
//            .post(buildUrl('/attendance/getPunchCardList'))
//            .send({
//                token:token
//                ,timestamp:20160419000000
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
//                data.should.have.property('totalCount').which.is.a.Number();
//                var list = data.punchCardList;
//                for(var i = 0;i<list.length;i++){
//                    list[i].should.have.property('punchCardId').which.is.a.String();
//                    list[i].should.have.property('punchInTime').which.is.a.Number();
//                    list[i].should.have.property('punchOutTime').which.is.a.Number();
//                    list[i].should.have.property('provinceName').which.is.a.String();
//                    list[i].should.have.property('cityName').which.is.a.String();
//                    list[i].should.have.property('countyName').which.is.a.String();
//                    list[i].should.have.property('address').which.is.a.String();
//                }
//                done();
//            });
//    });
//
//    it('选择上班点',function(done){
//        request(httpUrl)
//            .post(buildUrl('/attendance/getWorkplaceList'))
//            .send({
//                token:token
//                ,count:10
//                ,timestamp:20160128093612
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
//                data.should.have.property('totalCount').which.is.a.Number();
//                data.should.have.property('timestamp').which.is.a.Number();
//                var list = data.workplaceList;
//                for(var i = 0;i<list.length;i++){
//                    list[i].should.have.property('workplaceCode').which.is.a.String();
//                    list[i].should.have.property('workplaceName').which.is.a.String();
//                    list[i].should.have.property('provinceName').which.is.a.String();
//                    list[i].should.have.property('cityName').which.is.a.String();
//                    list[i].should.have.property('countyName').which.is.a.String();
//                    list[i].should.have.property('address').which.is.a.String();
//                }
//                done();
//            });
//    });
//
//
//    it('展示工作任务',function(done){
//        request(httpUrl)
//            .post(buildUrl('/attendance/getWorkplaceList'))
//            .send({
//                token:token
//                ,workTaskType:'promotion'
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
//                var list = data.workTask;
//                for(var i = 0;i<list.length;i++){
//                    list[i].should.have.property('workTaskType').which.is.a.String();
//                    list[i].should.have.property('taskCode').which.is.a.String();
//                    list[i].should.have.property('taskName').which.is.a.String();
//                    list[i].should.have.property('isSelected').which.is.a.Boolean();
//                }
//                done();
//            });
//    });
//
//    it('根据主键获取打卡信息',function(done){
//        request(httpUrl)
//            .post(buildUrl('/attendance/getPunchCardById'))
//            .send({
//                token:token
//                ,punchCardId:9
//            })
//            .expect(200)
//            .end(function(err,res){
//                var data = res.body;
//                data.should.have.properties({isSuccess:true,responseCode:0});
//                var list = data.workTaskList;
////                var list = data.workTaskList;
//                for(var i = 0;i<list.length;i++){
//                    list[i].should.have.property('workTaskType').which.is.a.String();
//                    list[i].should.have.property('taskCode').which.is.a.String();
//                    list[i].should.have.property('taskName').which.is.a.String();
//                    list[i].should.have.property('isSelected').which.is.a.Boolean();
//                }
//                var workDailyList = data.workDailyList;
//                for(var i = 0;i<workDailyList.length;i++){
//                    workDailyList[i].should.have.property('workDailyId').which.is.a.Number();
//                    workDailyList[i].should.have.property('productCode').which.is.a.String();
//                    workDailyList[i].should.have.property('productName').which.is.a.String();
//                    workDailyList[i].should.have.property('salesNum').which.is.a.Nunber();
//                    workDailyList[i].should.have.property('punchCardId').which.is.a.Nunber();
//                    workDailyList[i].should.have.property('isValid').which.is.a.Nunber();
//                }
//                var imgList = data.imgList;
//                for(var i = 0;i<imgList.length;i++){
//                    imgList[i].should.have.property('imgId').which.is.a.String();
//                    imgList[i].should.have.property('imgPath').which.is.a.String();
//                }
////                data.workDiary.should.have.property('workDailyId').which.is.a.Number();
////                data.workDiary.should.have.property('diaryContent').which.is.a.String();
////                data.workDiary.should.have.property('punchCardId').which.is.a.Number();
//                done();
//            });
//    });


});
