var userid = window.sessionStorage.getItem("user_id");
var sessionid = window.sessionStorage.getItem("sessionID");
var picUrl = "http://172.24.10.175/workout/api.php/getmine/userid/" + userid;
var photoUrl = "http://172.24.10.175/workout/api.php/lists/SessionID/" + sessionid + "/mod/shaitu/userid/" + userid;
//获取晒图列表信息
$.ajax({
	type: 'get',
	url: photoUrl,
	async: false,
	dataType: 'jsonp',
	success: function(data) {
		for(var i = 0; i < data.length; i++) {
			var id = data[i]['id'];

			$('#photoList>ul').append("<li><a href='photoDetail.html?id=" + id + "&userid=" + userid + "'>" +
				"<div class='head'>"
//				+"<img class='own_pic' src="+ownPic+">"
//				+"<span class='name'>"+username+"</span>"
				+
				"</div>" +
				"<p class='subject'>" + data[i]['title'] + "</p>" +
				"<div class='content'>"
//				+"<img src="+imgsrc+">"
//				+"<img src="+imgsrc2+">"
//				+"<img src="+imgsrc3+">"
				+
				"</div>" +
				"</a>" +
				"<div class='foot'>" +
				"<span class='time'>" + data[i]['update_time'] + "</span>" +
				"<span class='delete'>删除</span>" +
				"<img src='img/dustbin.png' alt='' >" +
				"</div>" +
				"</li>");
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
//		删除晒图
		$('.delete').click(function() {
			var shaituid = $(this).parent().siblings().attr('href').split("?")[1].split("=")[1].split("&")[0];
			var deleteUrl = "http://172.24.10.175/workout/api.php/delete/mod/shaitu/id/" + shaituid;
			$.ajax({
				type: 'post',
				url: deleteUrl,
				async: false,
				dataType: 'jsonp',
				success: function(data) {
//					alert("删除成功");
//					btn.onclick=function(){
//						window.location.reload();
//					};
				},
				complete: function() {
					alert("删除成功");
					btn.onclick = function() {
						window.location.reload();
					};
				},
			});

		});
	}
});
//获取发布晒图用户信息
$.ajax({
	type: 'get',
	url: picUrl,
	async: false,
	dataType: 'jsonp',
	success: function(data2) {
		for(var j = 0; j < data2["shaitunum"]; j++) {
			if(data2["photo"] == null) {
				var ownPic = "img/defaultPic.jpg";
			} else {
				var ownPic = 'http://172.24.10.175/workout/Uploads/' + data2['photo'];
			}
			var username = data2["user_name"];
			$('#photoList>ul>li:eq(' + j + ')').find('.head').append("<img class='own_pic' src=" + ownPic + ">" +
				"<span class='name'>" + username + "</span>");
		}
	}
});
//返回上一页
function back() {
	history.go(-1);
}