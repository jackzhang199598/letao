$.ajax({
  type: "get",
  url: "/employee/checkRootLogin",
  dataType: "json",
  success: function( info ) {
    console.log( info );
    if ( info.success ) {
      // 用户已登录
      console.log( "用户已登录, 继续访问" )
    }

    if ( info.error === 400 ) {
      // 未登录
      location.href = "login.html";
    }
  }
})