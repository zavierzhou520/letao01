

$(function () {
  var page = 1;
  var pagesize = 2;
  // 渲染数据
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: page,
        pagesize: pagesize
      },
      success: function (info) {
        console.log(info);
        var html = template('tpl', info);
        $('tbody').html(html);
        // 分页的实现
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //指定bootstrap的版本
          currentPage: page,//指定当前页数
          totalPages: Math.ceil(info.total / info.size),//设置总页数
          size: 'small', //调整分页控件的尺寸
          onPageClicked: function (a, b, c, p) {//当点击分页的按钮的时候，会触发
            page = p;
            //重新渲染
            render();
          }
        });
      }
    })
  }

  // 禁用按钮的切换
  $('tbody').on('click', '.btn', function () {
    $('#userModal').modal('show');
    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass('btn-success') ? 1 : 0;
    $('.btn_update').off().on('click',function(){
      $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
          id:id,
          isDelete:isDelete,
        },
        success:function(info){
         console.log(info)
         if(info.success){
          $('#userModal').modal('hide');
          render();
         }
        }
      })
    })

  })

})

