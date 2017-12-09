$(document).ready(function () {
  // 有没有方法监听页面中所有ajax请求的开始和结束
  // ajax全局事件
  // 表单校验用的插件的默认方法: $(form标签的id).bootstrapValidator(配置对象)
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
      username: {
        // 校验器(校验规则)
        validators: {
          // 不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          // 字符串长度 
          stringLength: {
            min: 4,
            max: 30,
            message: '用户名的长度为6-30个字符'
          },
          callback: {
            message: '用户名不存在'
          }
          // 实时校验数据库中是否有该数据(但是该配置项最好不要用)
          // remote: {
          //     url: '/employee/employeeLogin',
          //     message: 'The username is not available'
          // },
          // 正则匹配
          // regexp: {
          //   regexp: /^[a-zA-Z0-9_\.]+$/,
          //   message: 'The username can only consist of alphabetical, number, dot and underscore'
          // }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          callback: {
            message: '密码错误'
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
      $.ajax({
        type: 'post',
        url: '/employee/employeeLogin',
        // $(form).serialize(); 序列化表单用的  key=value&key=value
        data: $form.serialize(),
        // beforeSend 是ajax开始前的校验都在这里写 如果这里不通过 那么ajax无法提交
        // beforeSend: function () {
        //   console.log("开始前");
        // },
        success: function (data) {
          // 校验用户名是否存在
          if (data.error == 1000) {
            //  INVALID 非法的
            //  VALID 合法的
            bv.updateStatus("username", "INVALID", "callback");
          }
          //  校验密码是否存在
          if (data.error == 1001) {
            //  INVALID 非法的
            //  VALID 合法的
            bv.updateStatus("password", "INVALID", "callback");
          }

          if (data.success == true) {
            location.href = "./index.html"
          }

        },
        // 无论ajax请求是否成功那么都会触发这个方法
        // complete:function(){
        //   console.log("结束了");
        // }
      })
    });
});