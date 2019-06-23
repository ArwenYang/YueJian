//vue组件
Vue.component('my-component', {
	template: '#myComponent',
});

var app = new Vue({
	el: '#app',
	data: {
		counter: 1,
		id: "",
		activity_name: "",
		thumb: "",
		notice: "",
		price: "",
		user_tel: "",
		user_name: "",
		rolename: window.sessionStorage.getItem("rolename"),
		realname: window.sessionStorage.getItem("realname"),
	},
	mounted: function() {
		this.getActivityData();
		this.getUserData();
	},
	methods: {
//		获取活动信息
		getActivityData() {
			var id = location.href.split("?")[1].split("=")[1];
			var _this = this;
			var activityurl = "http://172.24.10.175/workout/api.php/lists/mod/activity/id/" + id;
			this.$http.jsonp(activityurl).then(function(res) {
				_this.id = res.body[0]["id"];
				_this.activity_name = res.body[0]["activity_name"];
				_this.thumb = res.body[0]["thumb"];
				if(window.sessionStorage.getItem("rolename") == "学生") {
					_this.price = res.body[0]["activity_price_stu"];
				} else {
					_this.price = res.body[0]["activity_price"];
				}
				_this.notice = res.body[0]["notice"];
				_this.contact_tel = res.body[0]["user_tel"];
			}, function() {
				console.log('请求失败处理');
			});
		},
//		获取用户信息
		getUserData() {
			var user_id = window.sessionStorage.getItem("user_id");
			var _this = this;
			var userurl = "http://172.24.10.175/workout/api.php/getmine/userid/" + user_id;
			this.$http.jsonp(userurl).then(function(res) {
				_this.user_tel = res.body["user_name"];
				console.log(res.body);
			}, function() {
				console.log('请求失败处理');
			});
		},
//		减少下单数量
		handleReduce() {
			if(this.counter > 1) {
				this.counter--;
			}
		},
//		返回上一页
		back() {
			history.go(-1);
		},
//		结算成功弹出提示
		finish() {
			alert("结算成功，返回活动详情页");
			btn.onclick = function() {
				history.go(-1);
			};
		}
	},
//	计算总额
	computed: {
		priceCount() {
			return this.counter * this.price;
		}
	}
});