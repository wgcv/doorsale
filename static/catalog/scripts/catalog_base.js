function expandCategories(a){a="#category-id-"+a
$(a).parents(".sub-categories").show(),$(a).parents(".parent-category-container").each(function(){$(".parent-category",this).first().addClass("arrow-down")})}function basketChanged(){$("#basket-container .price").hide(),$("#basket-container .price").fadeIn("fast"),bootstrapAjax($,"#basket-container")}$("[parent-category]").each(function(){var a=$(this)
$(a.attr("parent-category")).click(function(){a.is(":visible")?(a.hide(100),$(this).removeClass("arrow-down")):(a.show(100),$(this).addClass("arrow-down"))})})
