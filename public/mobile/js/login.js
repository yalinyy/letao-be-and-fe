/*
* @Author: Administrator
* @Date:   2017-12-01 13:56:54
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-01 19:50:35
*/
$(function(){

	// 给登录注册点击事件
	$('.user-login').on('click',function(){
		 // 另外一种方案--$("").serialize(); 序列化表单
		 // 前提必须是form表单
		var formData= $('.form').serialize();
		userLogin(formData);
	})

})

var userLogin=function(data){
	$.ajax({
		url: '/user/login',
		type: 'post',
	
		data: data,
		success:function(data){
			console.log(data);
			if(data.error==403){
				mui.toast(data.message);
			}
			if(data.success==true){
				var urlData=new URLSearchParams(location.search);
				console.log(urlData);
				var url=urlData.get('returnUrl');
				console.log(url);
				location.href=url  || '../index.html';
			}
		}
	})
	
}