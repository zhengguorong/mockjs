
var frisby = require('frisby');

var URL = 'http://localhost:3000/';


	frisby.create("get act list")
	.get(URL+"wechats/activity/venuePlan/getVpAndSubList")
	.expectStatus(200)
	.expectJSONTypes({
		isSuccess:Boolean,
		// responseCode:Int,
		responseMgs:String
	})
	.expectJSON({
		isSuccess:true,
		responseCode:0,
		responseMgs:'请求成功'
	})
	.toss();

