$(function() {

  // 一进入页面, 发送ajax请求, 获取数据, 进行页面动态渲染
 var currentPage=1;
 var pageSize=5;
 render();

 function render(){
  $.ajax({
    type: "get",
    url: "/user/queryUser",
    data: {
      page: currentPage,
      pageSize: pageSize
    },
    dataType: "json",
    success: function( info ) {
      console.log( info );

      var htmlStr = template("tmp", info );

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


 $('.lt_content tbody').on("click",".btn",function(){
  console.log( "呵呵额" );
   $('#userModal').modal("show");

  var id =$(this).parent().data("id");
  var isDelete = $(this).hasClass("btn-success") ? 1 : 0;

  $('#submitBtn').off("click").on("click",function(){
    $.ajax({
      type:"post",
      url: "/user/updateUser",
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function(info){
        console.log( info )
        if(info.success){
          $('#userModal').modal("hide");
          // 重新渲染
          render();
        }
      }
    })
  })
 })
})