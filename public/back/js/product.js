

$(function(){
  var currentPage=1;
  var pageSize=2;
  var picArr = []; 
  render();
  function render(){
    $.ajax({
      url:"/product/queryProductDetailList",
      type:"get",
      data:{
        page: currentPage,
        pageSize: pageSize
      },
      dataType:"json",
      success:function(info){
        var htmlStr=template("productTpl",info);
        $(".lt_content tbody").html(htmlStr);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked: function( a, b, c, page ) {
            currentPage = page;
            render();
          }
        })

      }
    })
  }



  $('#addBtn').click(function(){
    $('#addModal').modal("show");

    $.ajax({
      url: "/category/querySecondCategoryPaging",
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

  $('.dropdown-menu').on("click","a",function(){
    var txt=$(this).text();
    var id=$(this).data("id");

    $("#dropdownText").text(txt);
    $('[name=" brandId "]').val(id);
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  })

  $('#fileupload').fileupload({
    dataType: "json",
    done:function(e,data){
      var picObj=data.result;
      var picAddr=picObj.picAddr;

      picArr.unshift(picObj);
      $('#imgBox').prepend('<img src="'+picAddr+'" width="100">');

      if(picArr.length>3){
        picArr.pop();
        $("#imgBox img:last-of-type").remove();
      }
      if(picArr.length==3){
        $('#form').data("bootstrapValidator").updateStatus("picStatus","VALID")
      }
    }
  })

  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num:{
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp:/^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          } 
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品价格"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });

  $('#form').on("success.form.bv",function(e){
    e.preventDefault();

    var params=$('#form').serialize();

    params+="&picName1="+picArr[0].picName+"&picAddr1="+ picArr[0].picAddr;
    params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;

    $.ajax({
      url:"/product/addProduct",
      type:"post",
      data:params,
      success:function(info){
        if(info.success){
          $('#addModal').modal("hide");
          $('#form').data("bootstrapValidator").resetForm(true);
          currentPage=1;
          render();

          $('#dropdownText').text("请选择二级分类")

          $('#imgBox img').remove();
          picArr=[];
        }
      }
    })
  })
})