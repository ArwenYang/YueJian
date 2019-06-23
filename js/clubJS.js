$(function() {
	//tab选项卡
	$(".tab-item").click(function() {
		$(this).addClass("active").siblings().removeClass("active");
		var idx = $(this).index();
		$('.main').eq(idx).addClass("selected").siblings().removeClass("selected");
	});

	//获取用户头像信息
	var user_id = window.sessionStorage.getItem("user_id");
	var picUrl = "http://172.24.10.175/workout/api.php/getmine/userid/" + user_id;
	$.ajax({
		type: 'post',
		url: picUrl,
		cache: false,
		dataType: 'jsonp',
		success: function(data) {
			if(data["photo"] != null) {
				$('#header>.pic').attr("src", 'http://172.24.10.175/workout/Uploads/' + data["photo"]);
			}
		}
	});
	
	//获取最具人气俱乐部信息
	var clubUrl = "http://172.24.10.175/workout/api.php/lists/mod/club";
	var nearclubUrl = "http://172.24.10.175/workout/api.php/nearclub";
	$.ajax({
		type: 'post',
		url: clubUrl,
		cache: false,
		dataType: 'jsonp',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				var imgsrc = 'http://172.24.10.175/workout/Uploads/' + data[i]['thumb'];
				var id = data[i]['id'];

				$('#zjrq').append("<li>" +
					"<img src=" + imgsrc + ">" +
					"<a href='clubDetail.html?id=" + id + "'>" +
					"<div>" +
					"<p class='name'>" + data[i]['club_name'] + "</p>" +
					"<p class='position'><span class='iconfont icon-dingwei2'></span>" + data[i]['province_name'] + " " + data[i]['city_name'] + " " + data[i]['district_name'] + " " + "</p>" +
					"</div>" +
					"</a>" +
					"</li>");
			}
		}
	});

	//获取离我最近俱乐部信息
	$.ajax({
		type: 'post',
		url: nearclubUrl,
		cache: false,
		dataType: 'jsonp',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				var imgsrc = 'http://172.24.10.175/workout/Uploads/' + data[i]['thumb'];
				var id = data[i]['id'];

				$('#lwzj').append("<li>" +
					"<img src=" + imgsrc + ">" +
					"<a href='clubDetail.html?id=" + id + "'>" +
					"<div>" +
					"<p class='name'>" + data[i]['club_name'] + "</p>" +
					"<p class='position'><span class='iconfont icon-dingwei2'></span>" + data[i]['province_name'] + " " + data[i]['city_name'] + " " + data[i]['district_name'] + " " + "</p>" +
					"</div>" +
					"</a>" +
					"</li>");
			}
		}
	});
});