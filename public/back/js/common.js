$(document).ajaxStart(function() {
  NProgress.start();
});

$(document).ajaxStop(function() {
  setTimeout(function() {
    NProgress.done();
  }, 1000);
});


$(function(){
  $('.lt_aside .category').click(function(){
    $(this).next().stop().slideToggle();
  });

  $(".lt_topbar .icon_left").click(function(){
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
  })

  $('.lt_topbar .icon_right').click(function(){
    $('#logoutModal').modal("show");
  });
  $('#logoutBtn').click(function() {

    // 发送ajax请求, 让后台销毁当前用户的登录状态
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 退出成功
          location.href = "login.html";
        }
      }
    });


  })

})



