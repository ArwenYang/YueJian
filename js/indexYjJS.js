$(function() {
	var user_id = window.sessionStorage.getItem("user_id");
	var picUrl = "http://172.24.10.175/workout/api.php/getmine/userid/" + user_id;
	var activityUrl = "http://172.24.10.175/workout/api.php/lists/mod/activity";
	var masterUrl = "http://172.24.10.175/workout/api.php/lists/mod/master";
	var competitionUrl = "http://172.24.10.175/workout/api.php/lists/mod/contest";
	
//	获取用户头像
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

//	获取精彩活动列表信息
	$.ajax({
		type: 'post',
		url: activityUrl,
		cache: false,
		dataType: 'jsonp',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				var imgsrc = 'http://172.24.10.175/workout/Uploads/' + data[i]['thumb'];
				var id = data[i]['id'];
				$('#activity').append("<li>" +
					"<img src=" + imgsrc + ">" +
					"<a href='activityDetail.html?id=" + id + "'>" +
					"<div>" +
					"<p class='activity_name'>" + data[i]['activity_name'] + "</p>" +
					"<p class='activity_date'>" + "<span>" + data[i]['start_date'] + "</span>" + "到" + "<span>" + data[i]['end_date'] + "</span>" + "</p>" +
					"<p class='activity_hits'>已有" + "<span>" + data[i]['hits'] + "</span>" + "人看过" + "</p>" +
					"</div>" +
					"</a>" +
					"</li>");
			}
		}
	});

//	获取权威大师列表信息
	$.ajax({
		type: 'post',
		url: masterUrl,
		cache: false,
		dataType: 'jsonp',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				var imgsrc = 'http://172.24.10.175/workout/Uploads/' + data[i]['thumb'];
				var id = data[i]['id'];
				$('#master').append("<li>" +
					"<a href='masterDetail.html?id=" + id + "'>" +
					"<img src=" + imgsrc + ">" +
					"</a>" +
					"<div class='masterText'>" +
					"<p class='master_name'>" + "<a href='masterDetail.html?id=" + id + "'>" + data[i]['realname'] + "/<span>" + data[i]['actcate_name'] + "大师</span></a></p>" +
					"<p class='master_place'>" + "<span class='iconfont icon-dingwei'></span>" + data[i]['province_name'] + " " + data[i]['city_name'] + "</p>" +
					"<p class='master_hits'>点击量:" + data[i]['hits'] + "</p>" +
					"</div>" +
					"</li>");
			}
		}
	});

//	获取最近比赛列表信息
	$.ajax({
		type: 'post',
		url: competitionUrl,
		cache: false,
		dataType: 'jsonp',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				var imgsrc = 'http://172.24.10.175/workout/Uploads/' + data[i]['thumb'];
				var id = data[i]['id'];
				$('#competition').append("<li>" +
					"<img src=" + imgsrc + ">" +
					"<a href='competitionDetail.html?id=" + id + "'>" +
					"<div>" +
					"<p>" + data[i]['name'] + "</p>" +
					"</div>" +
					"</a>" +
					"</li>");
			}
		}
	});
})