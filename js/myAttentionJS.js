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
//	俱乐部列表信息获取
	var user_id = window.sessionStorage.getItem('user_id');
	var clubListUrl = "http://172.24.10.175/workout/api.php/get/mod/user/id/" + user_id + "/related/1/map/fanclub";
	$.ajax({
		type: 'post',
		url: clubListUrl,
		cache: false,
		dataType: 'jsonp',
		success: function(data) {
			for(var i = 0; i < data['fanclub'].length; i++) {
				var imgsrc = 'http://172.24.10.175/workout/Uploads/' + data['fanclub'][i]['thumb'];
				var id = data['fanclub'][i]['id'];
				$('#clubList>ul').append("<li>" +
					"<img src=" + imgsrc + ">" +
					"<div>" +
					"<a href='clubDetail.html?id=" + id + "'>" +
					"<p class='name'>" + data['fanclub'][i]['club_name'] + "</p>" +
					"</a>" +
					"<div class='attention'>" +
					"<form action='javascript:;' method='post' class='gzForm'>" +
					"<img src='img/collect_2.png'/>" +
					"<p>取消关注</p>" +
					"</form>" +
					"</div>" +
					"</div>" +
					"</li>");
			}
//			取消关注
			$('.attention').click(function() {
				var url = "http://172.24.10.175/workout/api.php/delete/mod/clubfans/club_id/" + id + "/user_id/" + user_id;
				$(".gzForm").ajaxSubmit({
					url: url,
					dataType: 'json',
					beforeSubmit: function() {
						alert("取消关注成功");
						btn.onclick = function() {
							window.location.reload();
						};
					}
				});
			});
		}
	});
});