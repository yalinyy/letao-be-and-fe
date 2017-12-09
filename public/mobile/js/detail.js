$(function () {
  // 调用getProductDetail 需要参数id
  var url = new URLSearchParams(location.search);
  var id = url.get("id");
  // console.log(id);
  getProductDetail(id);


//给尺寸注册点击事件,让尺码有类样式
  $('.mui-content ').on('click','.product-size span',function(){
	$('.product-size span').removeClass('active');
	$(this).addClass('active');
})
//给加入购物车注册点击事件
$('.add-cart').on('click',function(){
	console.log(1);
	var productid= id;
    console.log(productid);

	var size=$('.product-size span').html();
	var num=mui('.mui-numbox').numbox().getValue();
	if(!productid){
		miu.toast('无效的商品');
		return false;
	}
	if(!size){

		mui.toast('请选择尺寸');
		return false;
	}
	if(num<=0){
		mui.toast('至少选择一件商品');
		return false;
	}
	addCart(productid,size,num);

})
})


var getProductDetail = function (id) {
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: id
    },
    beforeSend:function(){
    	//如果我们参数不够,我可以在这个地方把ajax请求终止掉
    },
    success: function (data) {
      // console.log(data);
      var productDetail = template('detail-template', data);
      $(".mui-content").html(productDetail);
      var size = data.size;//'40-50'
      // console.log(size);
      var sizeArr = size.split("-");// ["40","50"]
      // console.log(sizeArr);
      var start = sizeArr[0]; //40
      var end = sizeArr[1];//50
      var sizeData = {
        start: start,
        end: end
      }
      var sizeData = template("size-template", sizeData);
      $('.product-size').append(sizeData);
      // 轮播图
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 0//自动轮播周期，若为0则不自动播放，默认为0；
      });
       // 数字输入框手动初始化
      mui(".mui-numbox").numbox();
    }
  })
}
var addCart=function(productid,size,num){
	$.ajax({
		url: '/cart/addCart',
		type: 'post',
		dataType: 'json',
		data: {
			productId:productid,
			num:num,
			size:size
		},
		success:function(data){
			console.log(data);
      if(data.error=400){
        location.href="../login.html?returnUrl="+location.href;
        // return false;
      }
			if(data.success==true){
				//跳转到登录页,可以在location.href后面添加一个参数,把返回的参数当成地址带到参数后面
				location.href="../cart.html?returnUrl="+location.href;
        // return false;
			}
		}
	})
	
	
	
	
}