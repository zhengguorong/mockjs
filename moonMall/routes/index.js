var express = require('express');
var router = express.Router();
var Mock = require('mockjs');

//是否显示领卷按钮

router.all('/moonMall-gateway/activity/checkActivityCoupon',function(req,res,next){
	var successData=Mock.mock({
		isSuccess:true,
		responseCode:0,
		responseMsg:"请求成功",
		isDisplay: false
	})
	res.send(successData);
})
//获取首页推荐商品
router.all('/moonMall-gateway/item/getRecommendItem',function(req,res,next){
	var recommendType=req.body.recommendType;
	var successData=Mock.mock({
		isSuccess:true,
		responseCode:0,
		responseMsg:"请求成功",
		"itemRecommentList|1-10":[{
			id: "18",
			itemId: "17",
			rePicUrlInfo:{
				height: 350,
				picUrl: "http://mallapi.bluemoon.com.cn//upload/images/mall_product/6902022136924/1446804216697.png",
				width: 750
			}
		}]
	})
	var failData=Mock.mock({
		isSuccess:false,
		responseCode:1101,
		responseMsg:"非法参数",
	})
	if(recommendType||recommendType==""){
		res.send(successData);
	}else{
		res.send(failData);
	}
})
//获取分类列表
router.all('/moonMall-gateway/category/getCategory',function(req,res,next){
	var categoryId=req.body.categoryId;
	var successData=Mock.mock({
		isSuccess:true,
		responseCode:0,
		responseMsg:"请求成功",
		categorys:[{"cid":"ALL","name":"全部分类"},{"cid":"1","name":"洗衣液类"},{"cid":"101","name":"衣物护理类"},{"cid":"102","name":"家居清洁类"},{"cid":"103","name":"个人护理类"},{"cid":"104","name":"合作伙伴"}]
	})
	var failData=Mock.mock({
		isSuccess:false,
		responseCode:1101,
		responseMsg:"非法参数",
	})
	if(categoryId||categoryId==""){
		res.send(successData);
	}else{
		res.send(failData);
	}
})
router.all('/moonMall-gateway/category/getAllItemCategoryPage',function(req,res,next){
	var categoryId=req.body.categoryId;
	var currentPage=req.body.currentPage;
	var orderField=req.body.orderField;
	var orderType=req.body.orderType;
	var pageSize=req.body.pageSize;
	var successData=Mock.mock({
		isSuccess:true,
		responseCode:0,
		responseMsg:"请求成功",
		'items|1-30':[{
			itemId: "i16022120053596125271",
			itemName: "蓝月亮机洗绝配(亮白)+机洗神器补充装*3",
			itemSku: "80000266",
			marketPrice: 16870,
			memberPrice: 13900,
			picUrl: "/upload/images/mall_product/80006266/zt-lb-sqbc.png",
			stock: 9999,
			imageVo:{
				height: 500,
				picUrl: "http://mallapi.bluemoon.com.cn//upload/images/mall_product/80006266/zt-lb-sqbc.png",
				width: 500
			},
			'pageCount|1-20':18
		}]
	})
	var failData=Mock.mock({
		isSuccess:false,
		responseCode:1101,
		responseMsg:"非法参数",
	})
	if(currentPage&&pageSize){
		res.send(successData);
	}else{
		res.send(failData);
	}
})

//获取商品详情
router.all('/moonMall-gateway/item/findById',function(req,res,next){
	var itemId=req.body.itemId;
	var successData=Mock.mock({
		isSuccess:true,
		responseCode:0,
		responseMsg:"请求成功",
		itemInfoList:[{"itemId":"i16022120214325721111","itemName":"蓝月亮机洗绝配(洁净)+机洗神器补充装*3","itemSku":"80000267","memberPrice":13900,"marketPrice":16870,"stock":9999,"sellPoint":"","itemDesc":"","picUrl":{"picUrl":"http://mallapi.bluemoon.com.cn//upload/images/mall_product/80000267/zt-jj-sqbc.png","width":500,"height":500},"introImgUrlsInfo":[{"picUrl":"http://mallapi.bluemoon.com.cn//upload/images/mall_product/80000267/zt-jj-sqbc.png","width":500,"height":500}],"artImgUrls":[{"picUrl":"http://mallapi.bluemoon.com.cn//upload/images/mall_product/80000267/xqt-jj-sqbc_01.jpg","width":608,"height":493},{"picUrl":"http://mallapi.bluemoon.com.cn//upload/images/mall_product/80000267/xqt-jj-sqbc_02.jpg","width":608,"height":493},{"picUrl":"http://mallapi.bluemoon.com.cn//upload/images/mall_product/80000267/xqt-jj-sqbc_03.jpg","width":608,"height":494},{"picUrl":"http://mallapi.bluemoon.com.cn//upload/images/mall_product/80000267/xqt-jj-sqbc_04.jpg","width":608,"height":493},{"picUrl":"http://mallapi.bluemoon.com.cn//upload/images/mall_product/80000267/xqt-jj-sqbc_05.jpg","width":608,"height":493},{"picUrl":"http://mallapi.bluemoon.com.cn//upload/images/mall_product/80000267/xqt-jj-sqbc_06.jpg","width":608,"height":493},{"picUrl":"http://mallapi.bluemoon.com.cn//upload/images/mall_product/80000267/xqt-jj-sqbc_07.jpg","width":608,"height":493},{"picUrl":"http://mallapi.bluemoon.com.cn//upload/images/mall_product/80000267/xqt-jj-sqbc_08.jpg","width":608,"height":494},{"picUrl":"http://mallapi.bluemoon.com.cn//upload/images/mall_product/80000267/xqt-jj-sqbc_09.jpg","width":608,"height":493},{"picUrl":"http://mallapi.bluemoon.com.cn//upload/images/mall_product/80000267/xqt-jj-sqbc_10.jpg","width":608,"height":493}],"isShiiping":0}]
	})
	var failData=Mock.mock({
		isSuccess:false,
		responseCode:1101,
		responseMsg:"非法参数",
	})
	if(itemId){
		res.send(successData);
	}else{
		res.send(failData);
	}
	
})
//获取用户信息
router.all('/moonMall-gateway/user/getUser',function(req,res,next){
	var token=req.body.token;
	var failData=Mock.mock({
		isSuccess:false,
		responseCode:1101,
		responseMsg:"非法参数",
	})
	var successData=Mock.mock({
		isSuccess:true,
		responseCode:0,
		responseMsg:"请求成功",
		user:{"mobile":"18664694721","nickName":"郑国榕","realName":"","sex":"","brithday":0,"provinceId":"","provinceName":"","cityId":"","cityName":"","countyId":"","countyName":"","streetId":"","streetName":"","villageId":"","villageName":"","address":"","imageVo":{"picUrl":"http://mallapi.bluemoon.com.cn//upload/images/moon_mall/userImage/9/1444373827771.png","width":640,"height":640}}
	})
	if(token){
		res.send(successData);
	}else{
		res.send(failData);
	}
})
//获取不同状态订单列表
router.all('/moonMall-gateway/order/getCountByOrderStatus',function(req,res,next){
	var token=req.body.token;
	var failData=Mock.mock({
		isSuccess:false,
		responseCode:1101,
		responseMsg:"非法参数",
	})
	var successData=Mock.mock({
		isSuccess:true,
		responseCode:0,
		responseMsg:"请求成功",
		"counts":[{
		      "state": "WAIT_BUYER_PAY",
		 "count": 16
		    	 },
		 	 {
		      "state": "WAIT_SELLER_SEND_GOODS",
		 "count": 3
		 	 },
		 	 {
		      "state": "WAIT_BUYER_CONFIRM_GOODS",
		 "count": 1
		 	 },
		 	 {
		      "state": "WAIT_BUYER_EVALUATION",
		 "count": 8
		 }]

	})
	if(token){
		res.send(successData);
	}else{
		res.send(failData);
	}
})
//获取月亮卷余额
router.all('/moonMall-gateway/prepaid/queryUserRemainMoney',function(req,res,next){
	var token=req.body.token;
	var failData=Mock.mock({
		isSuccess:false,
		responseCode:1101,
		responseMsg:"非法参数",
	})
	var successData=Mock.mock({
		isSuccess:true,
		responseCode:0,
		responseMsg:"请求成功",
		remainMoney: 0

	})
	if(token){
		res.send(successData);
	}else{
		res.send(failData);
	}
})

//获取购物车列表
router.all('/moonMall-gateway/cart/getCart',function(req,res,next){
	var token=req.body.token;
	var failData=Mock.mock({
		isSuccess:false,
		responseCode:2301,
		responseMsg:"token失效",
	})
	var successData=Mock.mock({
		isSuccess:true,
		responseCode:0,
		responseMsg:"请求成功",
		"totalMemberPrice|100-1000": 614,
		"totalMarketPrice|100-1000": 692,
		"totalPrice|100-1000": 614,
		"discountFee|100-1000":100,
		"buyItems|1-10":[
			{
            "itemId": "25",
            "itemName": "蓝月亮薰衣草亮白增艳洗衣液袋装1kg",
            "sku": "6902022137372",
            "num|1-10":1 ,
            "picUrl": "/upload/images/mall_product/80000267/zt-jj-sqbc.png",
            "marketPrice": 17,
            "memberPrice": 13,
            "status": "off",
            "state": "tick",
            "imageVo": {
                "picUrl": "http://mallapi.bluemoon.com.cn//upload/images/mall_product/80000267/zt-jj-sqbc.png",
                "width": 0,
                "height": 0
            }
		}]
	})
	if(token){
		res.send(successData);
	}else{
		res.send(failData);
	}
})

module.exports = router;
