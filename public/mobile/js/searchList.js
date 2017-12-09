
$(function(){
  //当页面进入的时候,要请求数据
  //传入参数--在传入proname的时候   怎么来获取url里的参数
  //URLSearchParams(),是一个内置对象
 var url =new URLSearchParams(location.search);
  // console.log(location);
 // console.log(url);
var proname=url.get('key');

getSearchResult(1,4,proname);
// console.log(value);
// 
// 1当页面载入之后,要把搜索词 设置给搜索输入框
$('.search-box input').val(proname);
var priceFlag=true;
var numFlag=true;
// 2 当点击价格按钮的时候,让该按钮变成才能红色,然后使得商品列表按照价格排序
$('.lt-order [data-type="price"]').on('click',function(){
  $('.lt-order a').removeClass('active');
  $(this).addClass('active');
  if(priceFlag){
  	getSearchResult(1, 10, proname,2);
	priceFlag=false;
    $(this).find('span').removeClass('fa-angle-up');
    $(this).find('span').addClass('fa-angle-down');
    
  }else{
     getSearchResult(1, 10, proname,1);
     priceFlag=true;
     $(this).find('span').addClass('fa-angle-up');
    $(this).find('span').removeClass('fa-angle-down');
  }
//console.log(1);
}) 
//3点击销量按钮的时候,让按钮变成红色,然后使得商品按照库存排序
$('.lt-order [data-type="num"]').on('click',function(){
  $('.lt-order a').removeClass('active');
  $(this).addClass('active');
  if(numFlag){
  	getSearchResult(1, 10, proname,null,2);
	numFlag=false;
    $(this).find('span').removeClass('fa-angle-up');
    $(this).find('span').addClass('fa-angle-down');
    
  }else{
     getSearchResult(1, 10, proname,null,1);
     numFlag=true;
     $(this).find('span').addClass('fa-angle-up');
    $(this).find('span').removeClass('fa-angle-down');
  }
}) 
//4点击立即购买按钮,跳转到商品详情页
$('.lt-search-result').on('click','button',function(){
	//获取id值
	var id =$(this).attr('data-id');
	location.href='./search/detail.html?id='+id;
})
})
var getSearchResult=function(pageNum,pagesize,proname,price,num,brandid){
  
  $.ajax({
  type: 'get',
  url:'/product/queryProduct',
  data:{
    page:pageNum || 1,//页码
    pageSize:pagesize || 4,//每页的数据
    proName:proname || '',//产品名称
    brandId:brandid || '',//品牌id
    price:price || '',//使用价格排序
    num: num || ''  //产品库存
  },
  success:function(data){
    console.log(data);
    var searchResultList=template('result-template',data);
    $(".lt-search-result").html(searchResultList);
  }

})
}











