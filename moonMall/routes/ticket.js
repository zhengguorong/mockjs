var express = require('express');
var router = express.Router();
var Mock = require('mockjs');
var Random = Mock.Random;

Random.extend({
	ticketStatus: function(date) {
		var ticketStatus = ['wait_appointment', 'already_appointment', 'wait_appointment_already_use', 'already_appointment_already_use', 'wait_appointment_already_timeout', 'already_appointment_already_timeout'];
		return this.pick(ticketStatus)
	},
	ticketType: function(date){
		var ticketType = ['ticket', 'moonFriend', 'moonAngel', 'emp'];
		return this.pick(ticketType)
	}
});

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
		"itemList|3-10": [{
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

	//var tickeCodeError = Mock.mock({
	//	isSuccess:false,
	//	responseCode:10103,
	//	responseMsg:"此码无效"
	//});

	if(!token||!ticketCode){
		res.send(failData);
		return;
	}

	var successData=Mock.mock({
		"isSuccess": true,
		"responseMsg": "请求成功",
		"responseCode": 0,
		"appointmentInfo ": {
			"ticketType":"@ticketType",
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
		"itemList|3-10": [{
			"ticketCode":"Q1323242343223",
			"ticketName": "洗涤科技馆门票",
			"ticketStatus": "@ticketStatus",
			"startDate": new Date().getTime(),
			"endDate": new Date().getTime(),
			"price":100.00,
			"visitor":"@cname",
			"visitorMobile":"18665392876",
			"useTime":new Date().getTime(),
			"appointmentTime":new Date().getTime(),
			"timesCode":"@zip",
			"timesName":"洗涤科技馆"
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
	var endDate = "2016/03/22 11:30:00";
	var timestamp = new Date(endDate).getTime();

	var successData=Mock.mock({
		"isSuccess": true,
		"responseMsg": "请求成功",
		"responseCode": 0,
		"ticketInfo": {
			"ticketCode":"Q1323242343223",
			"ticketScode":"78657865",
			"ticketName": "洗涤科技馆门票",
			"ticketStatus": "@ticketStatus",
			"startDate": new Date().getTime(),
			"endDate": new Date().getTime(),
			"price":100.00,
			"visitor":"@cname",
			"visitorMobile":"18665392876",
			"useTime":new Date().getTime(),
			"venueCode":"4401E01",
			"venueName":"广州市正佳馆",
			"venueSname":"正佳馆",
			"venueAddress":"广东省广州市天河区天河路123号正佳广场四楼",
			"datesName":new Date().getTime(),
			"timesCode":"@zip",
			"timesName":"08:00-09:00",
			"venueStartDate":new Date().getTime(),
			"venueEndDate":timestamp
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
		"itemList|3-10": [{
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
		"itemList|3-10": [{
			"date":new Date().getTime(),
			"timesList|3-10":[{
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