/*
* @Author: Administrator
* @Date:   2017-12-01 19:54:39
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-01 21:40:58
*/
$(function(){
	$('.btn-register').on('click',function(){
		var formdata=$('.form').serialize();
		getuserSign(formdata);
	})

	//获取验证码
	$('.btn-vcode').on('click',function(){
		Vcode();
	})
})


//获取注册信息
var getuserSign=function(option){
	$.ajax({
		type:'post',
		url:'/user/register',
		data:option,
		beforeSend:function(){
			// 判断用户名不能为空
			if($('[name="username"]').val()==''){
				mui.toast('用户名不能为空');
				return false;
			}
			// 判断手机号是否为空 和格式
      		var reg = /^1[34578]\d{9}$/;
      		if(!reg.test($('[name="mobile"]').val())){
      			mui.toast('请输入正确的手机号');
      			return false;
      		}
      		//判断密码不能为空
      		if($('[name="password"]').val()==''){
      			mui.toast('密码不能为空');
      			return false;
      		}
      		if($('[name="password"]').val()!=$('[name="repwd"]').val()){
      			mui.toast('两次密码不一致');
      			return false;
      		}
      		if($('[name="vCode"]').val()==''){
      			mui.toast('请获取验证码');
      			return false;
      		}
		},
		success:function(data){
		console.log(data);
		if(data.success==true){
			location.href='./percenter.html';
		}
		}
	})
}

//获取验证码
var Vcode=function(){
	$.ajax({
	type:'get',
	url:'/user/vCode',
	data:null,
	success:function(data){
		console.log(data);

	}
	})
}