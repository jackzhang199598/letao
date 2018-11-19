
$(function(){
  var currentPage=1;
  var pageSize=5;
  render();

  function render(){
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'get',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        var htmlStr=template("secondTpl",info);
        $('.lt_content tbody').html(htmlStr);

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
  };


  $('#addBtn').click(function(){
    $('#addModal').modal('show');
    $.ajax({
      url:"/category/queryTopCategoryPaging",
      type:"get",
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        var htmlStr=template("dropdownTpl",info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  });

})