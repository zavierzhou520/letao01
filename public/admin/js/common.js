$(function () {
  // 进度条显示
  NProgress.configure({ showSpinner: false });
  $(document).ajaxStart(function () {
    NProgress.start();
  });
  $(document).ajaxStop(function () {
    setTimeout(function () {
      NProgress.done();
    }, 500)
  });
  // 二级分类的显示和隐藏
  $('.child').prev().on('click', function () {
    $(this).next().slideToggle();
  })
  // 侧边的显示和隐藏
  $('.icon_menu').on('click', function () {
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
  })
  // 模态框的显示
  $('.icon_logout').on('click', function () {
    $('#logoutModal').modal('show');
  })
  // 退出
  $('.btn_logout').on('click', function () {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = "login.html";
        }
      }
    })
  })


})