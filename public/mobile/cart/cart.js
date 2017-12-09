$(function(){

getcartData();
//删除事件
$('.mui-table-view').on('click','.mui-btn-red',function(){
    var cataid=$(this).attr('data-id');
  delCart(cataid);
})

})


//获取购物车
var getcartData=function(){
  $.ajax({
    url: '/cart/queryCart',
    type: 'get',
    data:{},
    success:function(data){
        console.log(data);
        var cataList=template('cart-template',{list:data});
        $('.mui-table-view').html(cataList);
    }
   
  })
 
  
}


//删除购物车
var  delCart=function(cartid){
  $.ajax({
    url: '/cart/deleteCart',
    type: 'get',
    data:{
      id:cartid
    },
    success:function(data){
      console.log(data);
        if(data.success == true) {
        getcartData();
    }
    
  }

  
})
}