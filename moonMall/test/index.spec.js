
var should = require('should');
//考勤卡
//require('./moonAngel/attendance');
//卡卷活动
require('./moonAngel/card');













//describe('商城首页接口测试', function(res) {
//	it('获取首页推荐商品列表',function(done){
//		request("http://tmallapi.bluemoon.com.cn")
//		.post(buildUrl("/moonMall-gateway/item/getRecommendItem"))
//		.send({recommendType:'all'})
//		.expect(200)
//		.end(function(err,res){
//			var data=res.body;
//			data.should.have.properties({isSuccess:true,responseCode:0,responseMsg:'请求成功'})
//			data.itemRecommentList.should.be.a.Array();
//			if(data[0]){
//				data[0].should.be.a.Object();
//				data[0].should.have.keys()
//			}
//			done()
//		})
//	})
//	it('获取首页推荐列表－－异常处理',function(done){
//		request("http://tmallapi.bluemoon.com.cn")
//		.post(buildUrl("/moonMall-gateway/item/getRecommendItem"))
//		.send({})
//		.expect(200)
//		.end(function(err,res){
//			var data=res.body;
//			data.should.have.properties({isSuccess:false,responseCode:1101,responseMsg:'非法参数'})
//			done()
//		})
//	})
//});
