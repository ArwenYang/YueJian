var app = new Vue({
	el: '#app',
	data: {
		id: "",
		title: "",
		thumb0: "",
		thumb1: "",
		thumb2: "",
		update_time: "",
		userid: "",
		user_name: "",
		photo: "",
		reply: "",
		reply_time: "",
		userList: [],
		photo_user_id: "",
	},
	mounted: function() {
		this.getPhotoData();
		this.getUserData();
		this.getReplyData();
	},
	methods: {
//		获取晒图信息
		getPhotoData() {
			var id = location.href.split("?")[1].split("=")[1].split("&")[0];
			var _this = this;
			var url = "http://172.24.10.175/workout/api.php/slists/mod/shaitu/id/" + id;
			this.$http.jsonp(url).then(function(res) {
				_this.id = res.body[0]["id"];
				_this.title = res.body[0]["title"];
				_this.thumb0 = res.body[0]["thumb0"];
				_this.thumb1 = res.body[0]["thumb1"];
				_this.thumb2 = res.body[0]["thumb2"];
				_this.update_time = res.body[0]["update_time"];
				_this.photo_user_id = res.body[0]["userid"];
				if(res.body[0]["thumb0"] != "" && res.body[0]["thumb0"] != null) {
					var imgsrc0 = 'http://172.24.10.175/workout/Uploads/' + res.body[0]["thumb0"];
					$('.content').append("<img class='contentPic' src=" + imgsrc0 + ">");
				}
				if(res.body[0]["thumb1"] != "" && res.body[1]["thumb1"] != null) {
					var imgsrc1 = 'http://172.24.10.175/workout/Uploads/' + res.body[0]["thumb1"];
					$('.content').append("<img class='contentPic' src=" + imgsrc1 + ">");
				}
				if(res.body[0]["thumb2"] != "" && res.body[0]["thumb2"] != null) {
					var imgsrc2 = 'http://172.24.10.175/workout/Uploads/' + res.body[0]["thumb2"];
					$('.content').append("<img class='contentPic' src=" + imgsrc2 + ">");
				}
			}, function() {
				console.log('请求失败处理');
			});
		},
//		获取发布晒图用户信息
		getUserData() {
			var userid = location.href.split("?")[1].split("&")[1].split("=")[1];
			var _this = this;
			_this.userid = userid;
			var url = "http://172.24.10.175/workout/api.php/getmine/userid/" + _this.userid;
			this.$http.jsonp(url).then(function(res2) {
				if(res2.body["user_name"]) {
					_this.user_name = res2.body["user_name"];
				} else {
					_this.user_name = "游客";
				}
				if(res2.body["photo"]) {
					_this.photo = 'http://172.24.10.175/workout/Uploads/' + res2.body["photo"];
				} else {
					_this.photo = "img/defaultPic.jpg";
				}

			}, function() {
				console.log('请求失败处理');
			});
		},
//		获取发布评论用户信息
		ajaxFunc(j, times, userList) {
			var _this = this;
			if(j < times) {
				if(userList[j] == 0) {
					var ownPic = "img/defaultPic.jpg";
					var username = "游客";
					$('#comment>ul>li:eq(' + j + ')').prepend("<img src=" + ownPic + ">");
					$('#comment>ul>li:eq(' + j + ')').find('.comentInfo').prepend('<p class="commentName">' + username + '</p>');
				} else {
					var replyPicUrl = "http://172.24.10.175/workout/api.php/getmine/userid/" + userList[j];
					$.ajax({
						type: 'post',
						url: replyPicUrl,
						async: false,
						dataType: 'jsonp',
						success: function(data2) {
							if(data2["photo"] == null) {
								var ownPic = "img/defaultPic.jpg";
							} else {
								var ownPic = 'http://172.24.10.175/workout/Uploads/' + data2['photo'];
							}
							var username = data2["user_name"];
							$('#comment>ul>li:eq(' + j + ')').prepend("<img src=" + ownPic + ">");
							$('#comment>ul>li:eq(' + j + ')').find('.comentInfo').prepend('<p class="commentName">' + username + '</p>');
						}
					});
				}
				this.ajaxFunc(j + 1, times, userList);
			}
		},
//		获取评论列表数据
		getReplyData() {
			var id = location.href.split("?")[1].split("=")[1].split("&")[0];
			var _this = this;
			var url = "http://172.24.10.175/workout/api.php/slists2/mod/shaireply/shaitu_id/" + id;
			this.$http.jsonp(url).then(function(res) {
				for(var i = 0; i < res.body['data'].length; i++) {
					_this.reply = res.body['data'][i]["reply"];
					_this.reply_time = res.body['data'][i]["reply_time"];
					_this.userList.push(res.body['data'][i]['userid']);
					$('#comment>ul').append('<li>'
//		 				+'<img src="img/lunniangpic.png"/>'
						+
						'<div class="comentInfo">'
//		 				+'<p class="commentName">姓名</p>'
						+
						'<p class="commentContent">' + _this.reply + '</p>' +
						'</div>' +
						'<p>' + _this.reply_time + '</p>' +
						'</li>');
				}
				var times = _this.userList.length;
				this.$options.methods.ajaxFunc(0, times, _this.userList);
			}, function() {
				console.log('请求失败处理');
			});
		},
//		返回上一页
		back() {
			history.go(-1);
		},
//		发表评论
		comment() {
//			var userid = window.sessionStorage.getItem("user_id");
//			var sessionid = window.sessionStorage.getItem("sessionID");
//			var id = location.href.split("?")[1].split("=")[1].split("&")[0];
//			var url = "http://172.24.10.175/workout/api.php/create/mod/shaireply/SessionID/" + sessionid + "/shaitu_id/" + id + "/userid/" + this.photo_user_id + "/reply_userid/" + userid;
//			$("#photoForm").ajaxSubmit({
//				url: url,
//				dataType: 'json',
//				beforeSubmit: function() {
//					alert("评价成功");
//					btn.onclick = function() {
//						window.location.reload();
//					};
//				}
//			});
		}
	}
});