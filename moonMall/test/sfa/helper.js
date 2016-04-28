/**
 * 我的帮助,我的门店,上级信息
 */
var request = require('supertest');
var should = require('should');
var common =  require('./common');
describe('我的门店',function(res){

  it('我的门店',function(done){
    request(common.getHttpUrl())
      .post(common.buildUrl('/myStore/getStoreListByUserId'))
      .send({
        token: common.getToken()
      })
      .expect(200)
      .end(function(err,res){
        var data = res.body;
        data.should.have.properties({isSuccess:true,responseCode:0});
        data.should.have.property('itemList').which.is.an.Array();
        var itemList = data.itemList;

        for(var i = 0; i < itemList.length; i++){
          itemList[i].should.have.property('storeId').which.is.a.String();
          itemList[i].should.have.property('storeName').which.is.a.String();
          itemList[i].should.have.property('dateFrom').which.is.a.Number();
          itemList[i].should.have.property('dateTo').which.is.a.Number();
          itemList[i].should.have.property('provinceCode').which.is.a.String();
          itemList[i].should.have.property('provinceDesc').which.is.a.String();
          itemList[i].should.have.property('cityCode').which.is.a.String();
          itemList[i].should.have.property('cityDesc').which.is.a.String();
          itemList[i].should.have.property('countryCode').which.is.a.String();
          itemList[i].should.have.property('countryDesc').which.is.a.String();
          itemList[i].should.have.property('streetCode').which.is.a.String();
          itemList[i].should.have.property('streetDesc').which.is.a.String();
          itemList[i].should.have.property('address').which.is.a.String();
        }
        done();
      });
  });

});

describe('上级信息',function(res){

  it('上级信息',function(done){
    request(common.getHttpUrl())
      .post(common.buildUrl('/leader/getLeaderInfoByUserId'))
      .send({
        token: common.getToken()
      })
      .expect(200)
      .end(function(err,res){
        var data = res.body;
        data.should.have.properties({isSuccess:true,responseCode:0});
        data.should.have.property('bpPernr').which.is.a.String();
        data.should.have.property('bpName').which.is.a.String();
        data.should.have.property('position').which.is.a.String();
        data.should.have.property('positionDesc').which.is.a.String();
        data.should.have.property('mobile').which.is.a.String();
        done();
      });
  });

});