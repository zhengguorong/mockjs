var express = require('express');
var router = express.Router();
var Mock = require('mockjs')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = Mock.mock({
  	isSuccess:'true',
  	responseCode:'1001',
  	'list|1-10':[{
  		'id|+1':1
  	}]
  })
  // console.log(JOSN.stringify(data,null,4))
  res.send(data);
});

router.get('/moonMall-gateway/user/getUser',function(req,res,next){
	var token=req.query.token||req.body.token;
	var failData=Mock.mock({
		isSuccess:false,
		responseCode:2301,
		responseMsg:"token无效",
	})
	var successData=Mock.mock({
		isSuccess:true,
		responseCode:0,
		responseMsg:"请求成功",
		user:{
			nickName:"zhengguorong",
			realName:"guorong zheng",
			mobile:18664694721,
			sex:'男',
			imageVo:{
				picUrl:"http://img.xxx.com/upload/imagage/50/1441785926006.jpg",
				width:"200",
				height:"200"
			},
			birthday:1423211232132,
		}
	})
	if(token){
		res.send(successData);
	}else{
		res.send(failData);
	}
})


module.exports = router;
