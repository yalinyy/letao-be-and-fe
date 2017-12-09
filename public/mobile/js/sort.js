/*
* @Author: Administrator
* @Date:   2017-11-28 11:47:10
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-28 13:45:04
*/
// 菜单区域滚动
var myScroll = new IScroll('#list-left');
// 一级菜单渲染
var getFirstCategory=function(){
	$.ajax({
		type:'get',
		url: '/category/queryTopCategory ',
		data:{},
		success:function(data){
			var firstData=template('first-template',data);
//			console.log(firstData);
			$('.lt-sort-sports ').html(firstData);
			getSecondCategory(data.rows[0].id);
		}
	});
}
 getFirstCategory();
// 二级分类联动渲染
var getSecondCategory=function(id){
	$.ajax({
		type:'get',
		url:'/category/querySecondCategory',
		data:{id:id},
		success:function(data){
			var secondData=template('second-template',data);
			$('.sort-right').html(secondData);
			console.log(data);
		}
	});
}
getSecondCategory();

//点击一级分类,动态渲染二级分类
$('.lt-sort-sports').on('click','a',function(){
//	console.log(1);
	$('lt-sort-sports').find('a').remove('mui-active');
	$(this).addClass('mui-active');
	var firstId=$(this).attr('data-id');
	getSecondCategory(firstId);
})

 
