$(function() {
	//tab选项卡
	$(".tab-item").click(function() {
		$(this).addClass("active").siblings().removeClass("active");
		var idx = $(this).index();
		$('.main').eq(idx).addClass("selected").siblings().removeClass("selected");
	});

//  获取用户头像信息
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
	var exerciseUrl = "http://172.24.10.175/workout/api.php/lists/mod/train";
	var rumenUrl = "http://172.24.10.175/workout/api.php/lists/mod/train/degree/1";
	var cainiaoUrl = "http://172.24.10.175/workout/api.php/lists/mod/train/degree/2";
	var jinjieUrl = "http://172.24.10.175/workout/api.php/lists/mod/train/degree/3";
//	获取全部训练列表信息
	$.ajax({
		type: 'post',
		url: exerciseUrl,
		cache: false,
		dataType: 'jsonp',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				var imgsrc = 'http://172.24.10.175/workout/Uploads/' + data[i]['thumb'];
				var id = data[i]['id'];
				if(data[i]['degree'] == 1) {
					var degree = '入门';
				} else if(data[i]['degree'] == 2) {
					var degree = '菜鸟';
				} else if(data[i]['degree'] == 3) {
					var degree = '进阶';
				}

				$('#quanbu').append("<li>" +
					"<img src=" + imgsrc + ">" +
					"<a href='exerciseDetail.html?id=" + id + "'>" +
					"<div>" +
					"<p class='name'>" + data[i]['name'] + "</p>" +
					"<p class='date'>" + "<span>" + data[i]['traintime'] + "</span>" + "我们在" + "<span>" + data[i]['place'] + "</span>等你！" + "</p>" +
					"<p class='level'>训练等级：" + "<span>" + degree + "</span>" + "</p>" +
					"<p class='price'>￥" + data[i]['price'] + "</p>" +
					"</div>" +
					"</a>" +
					"</li>");
			}
		}
	});
//	获取入门训练列表信息
	$.ajax({
		type: 'post',
		url: rumenUrl,
		cache: false,
		dataType: 'jsonp',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				var imgsrc = 'http://172.24.10.175/workout/Uploads/' + data[i]['thumb'];
				var id = data[i]['id'];
				$('#rumen').append("<li>" +
					"<img src=" + imgsrc + ">" +
					"<a href='exerciseDetail.html?id=" + id + "'>" +
					"<div>" +
					"<p class='name'>" + data[i]['name'] + "</p>" +
					"<p class='date'>" + "<span>" + data[i]['traintime'] + "</span>" + "我们在" + "<span>" + data[i]['place'] + "</span>等你！" + "</p>" +
					"<p class='level'>训练等级：" + "<span>入门</span>" + "</p>" +
					"<p class='price'>￥" + data[i]['price'] + "</p>" +
					"</div>" +
					"</a>" +
					"</li>");
			}
		}
	});
//	获取菜鸟训练列表信息
	$.ajax({
		type: 'post',
		url: cainiaoUrl,
		cache: false,
		dataType: 'jsonp',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				var imgsrc = 'http://172.24.10.175/workout/Uploads/' + data[i]['thumb'];
				var id = data[i]['id'];
				$('#cainiao').append("<li>" +
					"<img src=" + imgsrc + ">" +
					"<a href='exerciseDetail.html?id=" + id + "'>" +
					"<div>" +
					"<p class='name'>" + data[i]['name'] + "</p>" +
					"<p class='date'>" + "<span>" + data[i]['traintime'] + "</span>" + "我们在" + "<span>" + data[i]['place'] + "</span>等你！" + "</p>" +
					"<p class='level'>训练等级：" + "<span>菜鸟</span>" + "</p>" +
					"<p class='price'>￥" + data[i]['price'] + "</p>" +
					"</div>" +
					"</a>" +
					"</li>");
			}
		}
	});
//	获取进阶训练列表信息
	$.ajax({
		type: 'post',
		url: jinjieUrl,
		cache: false,
		dataType: 'jsonp',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				var imgsrc = 'http://172.24.10.175/workout/Uploads/' + data[i]['thumb'];
				var id = data[i]['id'];
				$('#jinjie').append("<li>" +
					"<img src=" + imgsrc + ">" +
					"<a href='exerciseDetail.html?id=" + id + "'>" +
					"<div>" +
					"<p class='name'>" + data[i]['name'] + "</p>" +
					"<p class='date'>" + "<span>" + data[i]['traintime'] + "</span>" + "我们在" + "<span>" + data[i]['place'] + "</span>等你！" + "</p>" +
					"<p class='level'>训练等级：" + "<span>进阶</span>" + "</p>" +
					"<p class='price'>￥" + data[i]['price'] + "</p>" +
					"</div>" +
					"</a>" +
					"</li>");
			}
		}
	});
});