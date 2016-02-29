var express = require('express');
var router = express.Router();
var Mock = require('mockjs')

/* GET users listing. */
router.all('/backend/admin/login', function(req, res, next) {
   var successData=Mock.mock({"responseCode":0,"responseMsg":"请求成功!","isSuccess":true,"user":{"appName":"guorong","appId":"wx3bd1153aebcf8cd0","userName":"国榕测试号","loginName":"guorong"}})
   res.send(successData);
});

router.all('/activity/venuePlan/getVpAndSubList',function(req,res,next){
	var successData=Mock.mock({
		"responseCode":0,
		"responseMgs":"请求成功",
		"isSuccess":true,
		"list|1-100":[{"booking":49,"personCount":63,"actEndTime":"2016-02-27 11:00:00","angcome":4,"come":50,"actDate":"2016-02-27 00:00:00","actStartTime":"2016-02-27 10:15:00","venueName":"正佳馆","venueId":1}]
	})
	res.send(successData);
})
router.all("/activity/venuePlan/findAllBooking",function(req,res,next){
	var successData=Mock.mock({
		"responseCode":0,
		"responseMgs":"请求成功",
		"isSuccess":true,
		"list|1-100":[{
			actDate: "2016-02-27 00:00:00",
			actEndTime: "2016-02-27 07:00:00",
			actStartTime: "2016-02-27 06:00:00",
			checkPlanId: 80,
			checker: "80473646",
			createTime: "2016-02-27 04:07:17",
			id: 81,
			numCode: "Q16022700480031583481",
			personCount: "63",
			planId: 81,
			remark: null,
			status: "used",
			subPhone: "111111",
			suber: "@cname",
			useTime: "2016-02-27 04:41:11",
			userId: "13636677805",
			venueId: 1,
			venueName: "正佳馆",
		}]
	})
	res.send(successData);
})
module.exports = router;
