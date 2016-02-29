var request = require('supertest');
var should = require('should');

describe('检票模块', function(res) {
	it('获取首页图文列表',function(done){
		request('http://localhost:3000')
		.get('/')
		.expect(200)
		.end(function(err,res){
			var data=res.body;
			//类型判断
			data.isSuccess.should.be.a.String();
			data.responseCode.should.be.a.String();
			data.list.should.be.a.Array();
			data.should.have.property('isSuccess','true');
			data.should.have.property('responseCode','1001');
			if(data.list.length>0){
				data.list[0].should.be.a.Object();
				data.list[0].id.should.be.a.Number();
			}
			done();
		});
	})
});
