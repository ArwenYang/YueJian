var app = new Vue({
	el: '#app',
	data: {
		id: "",
		name: "",
		intro: "",
		traintime: "",
		thumb: "",
		price: "",
		place: "",
		notice: "",
		hits: "",
		update_time: "",
		tel: ""
	},
	mounted: function() {
		this.getData();
	},
	methods: {
//		获取训练数据
		getData() {
			var id = location.href.split("?")[1].split("=")[1];
			var _this = this;
			var url = "http://172.24.10.175/workout/api.php/lists/mod/train/id/" + id;
			this.$http.jsonp(url).then(function(res) {
				_this.id = res.body[0]["id"];
				_this.name = res.body[0]["name"];
				_this.intro = res.body[0]["intro"];
				_this.traintime = res.body[0]["traintime"];
				_this.price = res.body[0]["price"];
				_this.notice = res.body[0]["notice"];
				_this.hits = res.body[0]["hits"];
				_this.update_time = res.body[0]["update_time"];
				_this.tel = res.body[0]["tel"];
				_this.thumb = res.body[0]["thumb"];
				_this.place = res.body[0]["place"];
			}, function() {
				console.log('请求失败处理');
			});
		},
//		返回上一页
		back() {
			history.go(-1);
		},
//		判断用户是否登录
		check() {
			if(window.sessionStorage.getItem('user_id')) {
				window.location.href = 'exerciseSignUp.html?id=' + this.id;
			} else {
				alert('请先登录');
				btn.onclick = function() {
					window.location.reload();
				};
			}
		}
	}
});