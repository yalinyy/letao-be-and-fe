// 进度条
// 控制是否出现旋转的图标 如果写false那么就是不出现
NProgress.configure({ showSpinner: false });
//当ajax开始的时候 进度条开始
$(document).ajaxStart(function(){
  // console.log("开始");
  NProgress.start();

})
// 当ajax完成的时候 进度条结束
$(document).ajaxComplete(function(){
  // console.log("完成");
  NProgress.done();
})


// 功能: 菜单功能
$('[data-menu]').click(function(){
  // console.log(1);
  $(".ad_aside").toggle();
  $(".ad_section").toggleClass("menu");
})

// 功能: 退出功能(插件: 模态框)
// 方案1: 在每一个页面中 都写一套布局
// 方案2: 使用admin.js 把布局添加到页面中 只需要写一套就可以了(方案2)
$("[data-logout]").click(function(){
  // console.log(1);
  // 1.要把模态框添加到页面中(声明一个字符串 使用append)
  var html ='<div class="modal fade" tabindex="-1" id="modal">'+
  '<div class="modal-dialog modal-sm">'+
    '<div class="modal-content">'+
      '<div class="modal-header">'+
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
        '<h4 class="modal-title">用户退出</h4>'+
      '</div>'+
      '<div class="modal-body">'+
        '<p style="margin:0">您确定要退出登录账号吗？</p>'+
      '</div>'+
      '<div class="modal-footer">'+
        '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
        '<button type="button" class="btn btn-primary" id="user-exit">确定</button>'+
      '</div>'+
    '</div>'+
  '</div>'+
'</div>';
$('body').append(html);

// 点击按钮让模态框显示
$('#modal').modal('show');
})

// 点击确定 让用户退出并跳转到登录页面
$("body").on("click","#user-exit",function(){
  // console.log(1);
  $.ajax({
    type: "get",
    url: '/employee/employeeLogout',
    data:null,
    success:function(data){
      // console.log(data);
      if(data.success == true) {
        $('#modal').modal('hide');
        location.href = './login.html';
      }
    }
  })
})

// 二级菜单
$(".menu a[href='javascript:;']").click(function(){
  // console.log(1);
  // 折叠切换
  $(this).next().slideToggle();
})