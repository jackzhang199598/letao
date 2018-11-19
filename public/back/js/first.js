$(function() {

  // 一进入页面, 发送ajax请求, 获取数据, 进行页面动态渲染
 var currentPage=1;
 var pageSize=5;
 render();

 function render(){
  $.ajax({
    type: "get",
    url: "/category/queryTopCategoryPaging",
    data: {
      page: currentPage,
      pageSize: pageSize
    },
    dataType: "json",
    success: function( info ) {
      console.log( info );

      var htmlStr = template("firstTpl", info );

      $('tbody').html( htmlStr );


      $("#paginator").bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:info.page,//当前页
        totalPages:Math.ceil(info.total/info.size),//总页数
        size:"small",//设置控件的大小，mini, small, normal,large
        onPageClicked:function(a, b, c,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
          currentPage=page;
          render();
        }
      });
    }
  })
 }

 $('#addBtn').click(function(){
   $('#addModal').modal("show");
 })

 $('#form').bootstrapValidator({

  // 配置校验图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',    // 校验成功
    invalid: 'glyphicon glyphicon-remove',  // 校验失败
    validating: 'glyphicon glyphicon-refresh'  // 校验中
  },

  // 配置校验字段  (需要先在 input 中配置name)
  fields: {

    categoryName: {
      // 进行多个规则配置
      validators: {
        // 非空校验
        notEmpty: {
          // 校验提示
          message: "请输入一级分类名称"
        },

      }
    },
  }
});

$('#form').on("success.form.bv",function(e){
  e.preventDefault();
  $.ajax({
    url: "/category/addTopCategory",
    type: "POST",
    data:$('#form').serialize(),
    success:function(info){
      console.log(info);
      if(info.success){
        $('#addModal').modal("hide");
        currentPage=1;
        render();
        $('#form').data("bootstrapValidator").resetForm( true );

      }
    }
  })
})

})