var user_id = window.sessionStorage.getItem("user_id");
var picUrl = "http://172.24.10.175/workout/api.php/getmine/userid/" + user_id;
//获取用户信息
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

//获取晒图列表信息
var userIdList = [];
var photoUrl = "http://172.24.10.175/workout/api.php/lists/mod/shaitu";
$.ajax({
	type: 'get',
	url: photoUrl,
	async: false,
	dataType: 'jsonp',
	success: function(data) {
		for(var i = 0; i < data.length; i++) {
			var id = data[i]['id'];
			var userid = data[i]['userid'];
			userIdList.push(data[i]['userid']);
			//						userIdList[userIdList.length]=data[i]['userid'];
			$('#photoList>ul').append("<li><a href='photoDetail.html?id=" + id + "&userid=" + userid + "'>" +
				"<div class='head'>"
				//								+"<img class='own_pic' src="+ownPic+">"
				//								+"<span class='name'>"+username+"</span>"
				+
				"</div>" +
				"<p class='subject'>" + data[i]['title'] + "</p>" +
				"<div class='content'>"
				//								+"<img src="+imgsrc+">"
				//								+"<img src="+imgsrc2+">"
				//								+"<img src="+imgsrc3+">"
				+
				"</div>" +
				"<div class='foot'>" +
				"<span class='time'>" + data[i]['update_time'] + "</span>" +
				"<img src='img/good2.png' alt='' >" +
				"<span>点赞</span>" +
				"<img src='img/comment.png' alt='' >" +
				"<span>评论</span>" +
				"</div>" +
				"</a></li>");
			if(data[i]['thumb0'] != "" && data[i]['thumb0'] != null) {
				var imgsrc0 = 'http://172.24.10.175/workout/Uploads/' + data[i]['thumb0'];
				$('#photoList>ul>li:eq(' + i + ')').find('.content').append("<img src=" + imgsrc0 + ">");
			}
			if(data[i]['thumb1'] != "" && data[i]['thumb1'] != null) {
				var imgsrc1 = 'http://172.24.10.175/workout/Uploads/' + data[i]['thumb1'];
				$('#photoList>ul>li:eq(' + i + ')').find('.content').append("<img src=" + imgsrc1 + ">");
			}
			if(data[i]['thumb2'] != "" && data[i]['thumb2'] != null) {
				var imgsrc2 = 'http://172.24.10.175/workout/Uploads/' + data[i]['thumb2'];
				$('#photoList>ul>li:eq(' + i + ')').find('.content').append("<img src=" + imgsrc2 + ">");
			}

		}
	},
	complete: function() {
		var times = userIdList.length;
		ajaxFunc(0, times);
	},
});

//获取发布晒图用户信息
function ajaxFunc(j, times) {
	if(j < times) {
		if(userIdList[j] == 0) {
			var ownPic = "img/defaultPic.jpg";
			var username = "游客";
			$('#photoList>ul>li:eq(' + j + ')').find('.head').append("<img class='own_pic' src=" + ownPic + ">" +
				"<span class='name'>" + username + "</span>");
		} else {
			var picUrl = "http://172.24.10.175/workout/api.php/getmine/userid/" + userIdList[j];
			$.ajax({
				type: 'post',
				url: picUrl,
				async: false,
				dataType: 'jsonp',
				success: function(data2) {
					if(data2["photo"] == null) {
						var ownPic = "img/defaultPic.jpg";
					} else {
						var ownPic = 'http://172.24.10.175/workout/Uploads/' + data2['photo'];
					}
					var username = data2["user_name"];
					$('#photoList>ul>li:eq(' + j + ')').find('.head').append("<img class='own_pic' src=" + ownPic + ">" +
						"<span class='name'>" + username + "</span>");
				}
			});
		}
		ajaxFunc(j + 1, times);
	}
}