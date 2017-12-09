/*
* @Author: Administrator
* @Date:   2017-12-01 16:52:23
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-01 19:29:42
*/
$(function(){

//获取用户信息
getUserData();
// 点击退出登录,注册点击事件,退出登录
$('.percenter').on('click','button',function(){
		loginOut();
		console.log(1);
})
})

var getUserData=function(){
	$.ajax({
		url:'/user/queryUserMessage',
		type:'get',
		data: null,
		success:function(data){
			var userInfo=template('user-template',data);
			$('.mui-media').html(userInfo);
		}
	
	});
	
}

var loginOut=function(){
	$.ajax({
		type:'get',
		url:'/user/logout',
		data:null,
		success:function(data){
			console.log(data);
			if(data.success==true){
				location.href='./login.html';
			}
		}
	})
}