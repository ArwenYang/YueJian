$(function() {
	//tab选项卡
	$(".tab-item").click(function() {
		$(this).addClass("active").siblings().removeClass("active");
		var idx = $(this).index();
		$('.main').eq(idx).addClass("selected").siblings().removeClass("selected");
	});
//	返回上一页
	$('#header>span').click(function() {
		history.go(-1);
	});
});