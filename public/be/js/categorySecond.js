/*
* @Author: Administrator
* @Date:   2017-12-04 21:10:21
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-04 23:10:10
*/
$(function(){
	getCateSecond();


	//获取一级分类列表
	$('.dropdown .btn').on('click',function(){
		console.log(1);
		getCateFirst();
	})
	$('.dropdown').on('click','a',function(){
		$('.dropdown-text').html($(this).html());
		$('[name="categoryId"]').val($(this).attr('data-id'));

	})
	initUpload();
	 // 添加二级分类
  $("#addModal").on("click",".btn-primary",function(){
    console.log($(form).serialize());
    $.ajax({
      type: "post",
      url: '/category/addSecondCategory',
      data: $(form).serialize(),
      success:function(data){
        // console.log(data);
        if(data.success == true) {
          getSecondCategory();
          $("#addModal").modal("hide");
        }

      }
    })

  })
})

// 二级分类列表
var getCateSecond=function(page,pageSize){
	$.ajax({
		type:'get',
		url:'/category/querySecondCategoryPaging',
		data:{
			page:page || 1,
			pageSize:pageSize || 5
		},
		success:function(data){
			// console.log(data);
			var cateSecondList=template('cateSecond-template',data);
			$('tbody').html(cateSecondList);
			$(".pagination").bootstrapPaginator({
								bootstrapMajorVersion:3,    //版本
								currentPage:data.page,    //当前页数
								numberOfPages:5,    //最多显示Page页
								totalPages:Math.ceil(data.total/data.size),    //所有数据可以显示的页数
								onPageClicked:function(e,originalEvent,type,page){
									getCateSecond(page);
								}
						})
		}
	})
}

// 一级分类列表
var getCateFirst=function(page,pageSize){
	$.ajax({
		url:'/category/queryTopCategoryPaging',
		type:'GET',
		data:{
			page:page || 1,
			pageSize:pageSize || 5
		},
		success:function(data){
			// console.log(data);
			var html=[];
			$.each(data.rows,function(i, item) {
				// console.log(item);
				html.push('<li><a data-id='+item.id+' href="javascript:;">'+item.categoryName+'</a></li>')
				
			});
			$('.dropdown-menu').html(html.join());
		}
	})
}
// 上传图片
var initUpload = function(){
  $('[name="pic1"]').fileupload({
    dataType: 'json',
    done: function (e, data) {
        console.log(data.result.picAddr);
        $('[name="brandLogo"]').val(data.result.picAddr)
        $(".preview").html('<img id="previewimg" width="100" height="100" src="'+data.result.picAddr+'" alt="">');
    }
});
}