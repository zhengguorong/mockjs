var express = require('express');
var router = express.Router();
var Mock = require('mockjs');

var failData=Mock.mock({
	isSuccess:false,
	responseCode:1101,
	responseMsg:"非法参数"
});

router.all('/getVenueList',function(req,res,next){
	var token=req.body.token;
	var type=req.body.type;
	var venueCode=req.body.venueCode;

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
		});

	if(!token||!type){
		res.send(failData);
		return;
	}

	res.send(successData);
});

router.all('/checkScanCode',function(req,res,next){
	var token=req.body.token;
	var ticketCode=req.body.ticketCode;

	var tickeCodeError = Mock.mock({
		isSuccess:false,
		responseCode:10103,
		responseMsg:"此码无效"
	});

	if(!token||!ticketCode){
		res.send(failData);
		return;
	}
	if(ticketCode!="asd"){
		res.send(tickeCodeError);
	}

	var successData=Mock.mock({
		"isSuccess": true,
		"responseMsg": "请求成功",
		"responseCode": 0,
		"appointmentInfo ": {
			"ticketType":"angel",
			"venueCode": "4401E01",
			"venueSname": "@cname",
			"timesCode": "a2343324",
			"timesName": "9:00-10:00"
		}
	});
	res.send(successData);
});

router.all('/comesInto',function(req,res,next){
	var token=req.body.token;
	var venueCode=req.body.venueCode;
	var timesCode=req.body.timesCode;
	var ticketCode=req.body.ticketCode;

	var successData=Mock.mock({
		"isSuccess": true,
		"responseMsg": "请求成功",
		"responseCode": 0
	});
	if(!token||!venueCode||!timesCode||!ticketCode){
		res.send(failData);
		return;
	}

	res.send(successData);
});

router.all('/getTicketList',function(req,res,next){
	var token=req.body.token;

	var successData=Mock.mock({
		"isSuccess": true,
		"responseMsg": "请求成功",
		"responseCode": 0,
		"itemList|1-10 ": [{
			"ticketCode":"Q1323242343223",
			"ticketName": "洗涤科技馆门票",
			"ticketStatus": "wait_appointment",
			"startDate": new Date().getTime(),
			"endDate": new Date().getTime(),
			"price":100.00,
			"visitor":"@cname",
			"visitorMobile":"18665392876",
			"useTime":new Date().getTime()
		}]
	});
	if(!token){
		res.send(failData);
		return;
	}

	res.send(successData);
});

router.all('/getTicketDetail',function(req,res,next){
	var ticketCode=req.body.ticketCode;
	var token=req.body.token;

	var successData=Mock.mock({
		"isSuccess": true,
		"responseMsg": "请求成功",
		"responseCode": 0,
		"ticketInfo": {
			"ticketCode":"Q1323242343223",
			"ticketScode":"78657865",
			"ticketName": "洗涤科技馆门票",
			"ticketStatus": "wait_appointment",
			"startDate": new Date().getTime(),
			"endDate": new Date().getTime(),
			"price":100.00,
			"visitor":"@cname",
			"visitorMobile":"18665392876",
			"useTime":new Date().getTime(),
			"venueCode":"4401E01",
			"venueName":"广州市正佳馆",
			"venueSname":"正佳馆",
			"venueAddress":"广东省广州市天河区天河路123号正佳广场四楼"
		}
	});
	if(!token||!ticketCode){
		res.send(failData);
		return;
	}

	res.send(successData);
});

router.all('/getAppointmentVenueList',function(req,res,next){
	var ticketCode=req.body.ticketCode;
	var token=req.body.token;
	var cityCode=req.body.cityCode;
	var time=req.body.time;

	var successData=Mock.mock({
		"isSuccess": true,
		"responseMsg": "请求成功",
		"responseCode": 0,
		"itemList|1-10 ": [{
			"venueCode":"@zip",
			"venueName":"广州市正佳馆",
			"venueSname":"正佳馆",
			"startDate": new Date().getTime(),
			"endDate": new Date().getTime(),
			"venueAddress":"广东省广州市天河区天河路123号正佳广场四楼"
		}]
	});
	if(!token||!ticketCode){
		res.send(failData);
		return;
	}

	res.send(successData);
});

router.all('/getAppointmentTimeList',function(req,res,next){
	var venueCode=req.body.venueCode;
	var token=req.body.token;

	var successData=Mock.mock({
		"isSuccess": true,
		"responseMsg": "请求成功",
		"responseCode": 0,
		"itemList|1-10 ": [{
			"date":new Date().getTime(),
			"timesList|1-10 ":[{
				"timesCode":"@zip",
				"timesName":"08:00-08:45"
			}]
		}]
	});
	if(!token||!venueCode){
		res.send(failData);
		return;
	}

	res.send(successData);
});

router.all('/confirmAppointment',function(req,res,next){
	var ticketCode=req.body.ticketCode;
	var token=req.body.token;
	var venueCode=req.body.venueCode;
	var timesCode=req.body.timesCode;
	var visitor=req.body.visitor;
	var visitorMobile=req.body.visitorMobile;

	var successData=Mock.mock({
		"isSuccess": true,
		"responseMsg": "请求成功",
		"responseCode": 0
	});
	if(!token||!ticketCode||!venueCode||!timesCode){
		res.send(failData);
		return;
	}

	res.send(successData);
});

router.all('/cancelAppointment',function(req,res,next){
	var ticketCode=req.body.ticketCode;
	var token=req.body.token;

	var successData=Mock.mock({
		"isSuccess": true,
		"responseMsg": "请求成功",
		"responseCode": 0
	});
	if(!token||!ticketCode){
		res.send(failData);
		return;
	}

	res.send(successData);
});
module.exports = router;