var app = new Vue({
	el: '#app',
	data: {
		photo: "",
		user_name: "",
	},
	mounted: function() {
		this.getData();
	},
	methods: {
//		获取用户头像信息
		getData() {
			var id = location.href.split("?")[1].split("=")[1];
			var _this = this;
			var url = "http://172.24.10.175/workout/api.php/getmine/userid/" + id;
			this.$http.jsonp(url).then(function(res) {
				if(res.body["photo"]) {
					_this.photo = 'http://172.24.10.175/workout/Uploads/' + res.body["photo"];
				} else {
					_this.photo = "img/defaultPic.jpg";
				}
				$('.bgBlur').css('background-image', 'url(' + _this.photo + ')');
			}, function() {
				console.log('请求失败处理');
			});
		},
//		返回上一页
		back() {
			history.go(-1);
		},
//		改变头像
		changePic() {
			var reads = new FileReader();
			var user_pic = document.getElementById("file_input");
			pic = user_pic.files[0];
			reads.readAsDataURL(pic);
			reads.onload = function(e) {
				$('.container_pic>img').attr('src', this.result);
				$('.bgBlur').css('background-image', 'url(' + this.result + ')');
			};
		},
//		提交修改
		change() {
			var userid = window.sessionStorage.getItem("user_id");
			var url = "http://172.24.10.175/workout/api.php/fuserphoto/userid/" + userid;
			$("#infoForm").ajaxSubmit({
				url: url,
				dataType: 'json',
				beforeSubmit: function() {
					alert("修改成功");
					btn.onclick = function() {
						history.go(-1);
					};
				}
			});
		}
	}
});