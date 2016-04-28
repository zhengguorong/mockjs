/**
 * 制定计划
 */
var request = require('supertest');
var should = require('should');
var common =  require('./common');

describe('制定计划',function(res){
  it('保存计划信息',function(done){
    request(common.getHttpUrl())
      .post(common.buildUrl('/plan/savePlanInfo'))
      .send({
        token:common.getToken(),
        storeId: '',
        classId: '',
        taskList: [{
          taskId: ''
        }],
        planTime: [{
          enterTime: 1461829145509,
          leaveTime : 1461829145509
        }],
        prdList: [{
          customerPrd: '',
          prdNum: 2,
          isNew: 1
        }]
      })
      .expect(200)
      .end(function(err,res){
        var data = res.body;
        data.should.have.properties({isSuccess:true,responseCode:0});
        done();
      });
  });

  it('获取已制定计划列表',function(done){
    request(common.getHttpUrl())
      .post(common.buildUrl('/plan/getPlanList'))
      .send({
        token:common.getToken()
      })
      .expect(200)
      .end(function(err,res){
        var data = res.body;
        data.should.have.properties({isSuccess:true,responseCode:0});
        data.should.have.property('itemList').which.is.an.Array();
        var itemList = data.itemList;

        for(var i = 0; i < itemList.length; i++){
          itemList[i].should.have.property('planDate').which.is.a.Number();
          itemList[i].should.have.property('storeList').which.is.an.Array();
          var storeList = itemList[i].storeList;
          for(var j = 0; j < storeList.length; j++){
            storeList[i].should.have.property('storeId').which.is.a.String();
            storeList[i].should.have.property('storeName').which.is.a.String();
          }
          itemList[i].should.have.property('price').which.is.a.Number();
          itemList[i].should.have.property('prdNum').which.is.a.Number();
          itemList[i].should.have.property('planNum').which.is.a.Number();
        }
        done();
      });
  });

  it('获取字段配置表信息',function(done){
    request(common.getHttpUrl())
      .post(common.buildUrl('/plan/getPlanList'))
      .send({
        token: common.getToken(),
        fieldType: "class,task"
      })
      .expect(200)
      .end(function(err,res){
        var data = res.body;
        data.should.have.properties({isSuccess:true,responseCode:0});
        data.should.have.property('itemList').which.is.an.Array();
        var itemList = data.itemList;
        for(var i = 0; i < itemList.length; i++){
          itemList[i].should.have.property('fieldCode').which.is.a.String();
          itemList[i].should.have.property('fieldType').which.is.a.String();
          itemList[i].should.have.property('fieldDesc').which.is.a.String();
          itemList[i].should.have.property('priority').which.is.a.Number();
        }
        done();
      });
  });

  it('获取产品信息',function(done){
    request(common.getHttpUrl())
      .post(common.buildUrl('/plan/getPrdInfoByIdOrName'))
      .send({
        prdIdOrName: ''
      })
      .expect(200)
      .end(function(err,res){
        var data = res.body;
        data.should.have.properties({isSuccess:true,responseCode:0});
        data.should.have.property('itemList').which.is.an.Array();
        var itemList = data.itemList;
        for(var i = 0; i < itemList.length; i++){
          itemList[i].should.have.property('customerPrd').which.is.a.String();
          itemList[i].should.have.property('prdName').which.is.a.String();
          itemList[i].should.have.property('price').which.is.a.Number();
          itemList[i].should.have.property('isNew').which.is.a.Number();
          itemList[i].should.have.property('priority').which.is.a.Number();
        }
        done();
      });
  });
});