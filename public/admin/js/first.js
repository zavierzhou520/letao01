$(function () {
  var page = 1;
  var pageSize = 5;
  render();
  // 渲染页面
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize,
      },
      success: function (info) {
        console.log(info);
        var html = template('tpl', info);
        $('tbody').html(html);
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          size: 'small',
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });
      }
    })
  }
  // 添加一级分类
  // 显示模态框
  $('.btn_add').on('click', function () {
    $('#addModal').modal('show');
  });
  $("form").bootstrapValidator({
    //指定小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //指定校验的规则
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类的名称不能空'
          }
        }
      }
    }
  });
  // 添加一级分类
  $('form').on('success.form.bv', function (e) {
    e.preventDefault();
    console.log($('form').serialize())
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('form').serialize(),
      success: function (info) {
        if (info.success) {
          $("#addModal").modal("hide");

          //重新渲染第一页，因为添加的数据在最前面
          page = 1;
          render();


          //重置表单的内容
          $("form").data("bootstrapValidator").resetForm(true);
        }
      }

    })
  })





})