var app = new Vue({
	el: '#app',
	data: {
		id: "",
		activity_name: "",
		introduction: "",
		start_date: "",
		end_date: "",
		thumb: "",
		activity_price: "",
		activity_price_stu: "",
		attend_num: "",
		place: "",
		notice: "",
		hits: "",
		update_time: "",
		contact_tel: ""
	},
	mounted: function() {
		this.getData();
	},
	methods: {
//		获取活动信息
		getData() {
			var id = location.href.split("?")[1].split("=")[1];
			var _this = this;
			var url = "http://172.24.10.175/workout/api.php/lists/mod/activity/id/" + id;
			this.$http.jsonp(url).then(function(res) {
				_this.id = res.body[0]["id"];
				_this.activity_name = res.body[0]["activity_name"];
				_this.introduction = res.body[0]["introduction"];
				_this.start_date = res.body[0]["start_date"];
				_this.end_date = res.body[0]["end_date"];
				_this.activity_price = res.body[0]["activity_price"];
				_this.activity_price_stu = res.body[0]["activity_price_stu"];
				_this.attend_num = res.body[0]["attend_num"];
				_this.notice = res.body[0]["notice"];
				_this.hits = res.body[0]["hits"];
				_this.update_time = res.body[0]["update_time"];
				_this.contact_tel = res.body[0]["contact_tel"];
				_this.thumb = res.body[0]["thumb"];
				_this.place = res.body[0]["province_name"] + res.body[0]["city_name"] + res.body[0]["district_name"] + res.body[0]["place"];
			}, function() {
				console.log('请求失败处理');
			});
		},
//		返回功能
		back() {
			history.go(-1);
		},
//		检查用户是否登录
		check() {
			if(window.sessionStorage.getItem('user_id')) {
				window.location.href = 'activitySignUp.html?id=' + this.id;
			} else {
				alert('请先登录');
				btn.onclick = function() {
					window.location.reload();
				};
			}
		}
	}
});