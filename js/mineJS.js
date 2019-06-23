var user_id = window.sessionStorage.getItem("user_id");
//判断用户是否登录
if(user_id) {
	var url = "http://172.24.10.175/workout/api.php/getmine/userid/" + user_id;
	$.ajax({
		type: "get",
		dataType: "jsonp",
		jsonp: "callback",
		url: url,
		async: false,
		success: function(data) {
//			显示用户个人信息
			$('#userInfo>.content>p').text(data["user_name"]);
			if(!(data["shaitunum"]==""||data["shaitunum"]==null)){
				$('#num>li').eq(0).children('p').eq(1).text(data["shaitunum"]);
			}
			
			if(!(data["focusnum"]==""||data["focusnum"]==null)){
				$('#num>li').eq(1).children('p').eq(1).text(data["focusnum"]);
			}
			
			if(!(data["messageunum"]==""||data["messageunum"]==null)){
				$('#num>li').eq(2).children('p').eq(1).text(data["messageunum"]);
			}
			

			if(data["photo"] != null) {
				$('#userInfo>.content>img').attr("src", 'http://172.24.10.175/workout/Uploads/' + data["photo"]);
				$('#userInfo>.bgBlur').css("background-image", 'url(http://172.24.10.175/workout/Uploads/' + data["photo"] + ')');
			}
//			功能列表跳转
			$('#service>ul>li:eq(0)').click(function() {
				window.location.href = "myPost.html?id=" + user_id;
			});
			$('#service>ul>li:eq(1)').click(function() {
				window.location.href = "myAttention.html?id=" + user_id;
			});
			$('#service>ul>li:eq(2)').click(function() {
				window.location.href = "myOrder.html?id=" + user_id;
			});
			$('#service>ul>li:eq(3)').click(function() {
				window.location.href = "mySet.html?id=" + user_id;
			});
		}
	});
}