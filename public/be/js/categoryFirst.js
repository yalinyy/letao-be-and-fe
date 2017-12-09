/*
* @Author: Administrator
* @Date:   2017-12-04 19:24:24
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-04 21:08:50
*/
$(function(){
	getCateFirst();

$('#form').bootstrapValidator({
    // 反馈图标
    // 有出错图
    // 有验证通过图
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // fields 字段 -- 就是input的name属性的值 就是字段
    fields: {
      // 这是字段名称
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类不能为空'
          }
        }
      }
    }
  })
    // 这是当表单校验成功过后 执行的方法
    .on('success.form.bv', function (e) {
      // Prevent form submission --阻止默认的submit类型的按钮自动提交
      e.preventDefault();

      // 这个校验插件所获得的插件起作用的那个目标元素--form标签
      var $form = $(e.target);
      console.log($form);
      // Get the BootstrapValidator instance
      var bv = $form.data('bootstrapValidator');

      // Use Ajax to submit form data
      // $.get(提交地址,提交数据,success成功回调,dataType)
      // $.post()和$.get一摸一样 是$.ajax()的二次封装
      //  在这里我们可以书写ajax请求 当请求成功收
      
    addCateFirst($form.serialize());
    });
});





//一级分类用户数据
var getCateFirst=function(page,pageSize){
	$.ajax({
		url:'/category/queryTopCategoryPaging',
		type:'GET',
		data:{
			page:page || 1,
			pageSize:pageSize || 5
		},
		success:function(data){
			console.log(data);
			var cateFirstList=template('cateFirst-template',data);
			$('tbody').html(cateFirstList);
			$(".pagination").bootstrapPaginator({
								bootstrapMajorVersion:3,    //版本
								currentPage:data.page,    //当前页数
								numberOfPages:5,    //最多显示Page页
								totalPages:Math.ceil(data.total/data.size),    //所有数据可以显示的页数
								onPageClicked:function(e,originalEvent,type,page){
									getCateFirst(page);
								}
						})
		}
	})
}

var addCateFirst=function(data){
	$.ajax({
		type:'post',
	url:'/category/addTopCategory',
	data:data,
	success:function(data){
		console.log(data);
		if(data.success==true){
			$('#addModal').modal("hide");
			getCateFirst();
		}
	}
	})
}
	