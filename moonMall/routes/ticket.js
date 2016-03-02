var express = require('express');
var router = express.Router();
var Mock = require('mockjs');

router.all('/getVenueList',function(req,res,next){
	console.log(req.body);
	var token=req.body.token;
	var type=req.body.type;
	console.log(type);
	console.log(token);
	var venueCode=req.body.venueCode;
	var failData=Mock.mock({
		isSuccess:false,
		responseCode:1101,
		responseMsg:"非法参数",
	})
	var tokenError=Mock.mock({
		isSuccess:false,
		responseCode:2301,
		responseMsg:"token失效",
	})
	var successData=Mock.mock({
		"isSuccess": true,
		"responseMsg": "请求成功",
		"responseCode": 0,
		"itemList|1-10": [{
		"venueCode": "4401E01",
		"venueSname": "@cname",
		"timesCode": "a2343324",
		"timesName": "9:00-10:00",
		"isDefault":false
		}]
		})

	if(!token||!type){
		res.send(failData);
		return;
	}
	if(token!="abcde"){
		res.send(tokenError);
		return;
	}
	res.send(successData);
})

module.exports = router;