//比赛详情高度适应
document.getElementById("detail").style.height = document.getElementById("detail").scrollWidth * .28 + "rem";
//Vue
var app = new Vue({
	el: '#app',
	data: {
		id: "",
		name: "",
		thumb: "",
		detail_url: "",
		cdate: "",
		introduction: "",
		hits: "",
		update_time: ""
	},
	mounted: function() {
		this.getData();
	},
	methods: {
//		获取比赛信息
		getData() {
			var id = location.href.split("?")[1].split("=")[1];
			var _this = this;
			var url = "http://172.24.10.175/workout/api.php/lists/mod/contest/id/" + id;
			this.$http.jsonp(url).then(function(res) {
				_this.id = res.body[0]["id"];
				_this.name = res.body[0]["name"];
				_this.introduction = res.body[0]["introduction"];
				_this.cdate = res.body[0]["cdate"];
				_this.detail_url = res.body[0]["url"];
				_this.hits = res.body[0]["hits"];
				_this.update_time = res.body[0]["update_time"];
				_this.thumb = res.body[0]["thumb"];
			}, function() {
				console.log('请求失败处理');
			});
		},
//		返回上一页
		back() {
			history.go(-1);
		}
	}
});