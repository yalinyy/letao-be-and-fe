/*
* @Author: Administrator
* @Date:   2017-12-03 15:18:31
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-03 21:54:58
*/
$(document).ready(function(){
	userList();
			$('tbody').on('click','.btn',function(){
				var userId=$(this).attr('data-id');
				var isDelete=$(this).hasClass('btn-danger')?1:0;
			delUser(userId,isDelete);
			})	
})
var userList=function(page,pageSize){
	$.ajax({
		type:'GET',
		url:'/user/queryUser',
		data:{
				page:page || 1,
				pageSize:pageSize || 5
		},
		success:function(data){
			console.log(data);
			var userManage=template("user-template",data);
			$('tbody').html(userManage);
			$(".pagination").bootstrapPaginator({
								bootstrapMajorVersion:3,    //版本
								currentPage:data.page,    //当前页数
								numberOfPages:5,    //最多显示Page页
								totalPages:Math.ceil(data.total/data.size),    //所有数据可以显示的页数
								onPageClicked:function(e,originalEvent,type,page){
									userManage(page);
								}
						})
		}
	})
}
	var delUser=function(userId,isDelete){
		$.ajax({
			url:'/user/updateUser',
			type:'post',
			data:{
		
					id:userId,
					isDelete:isDelete
				
			},
			success:function(data){
				console.log(data);
				if(data.success==true){
					userList();
				}
			}
		})
	}

