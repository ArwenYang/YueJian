Vue.directive('pin', function(el, binding) {
	var pinned = binding.value;
	if(pinned) {
		//关注
		el.style.color = 'black';
	} else {
		//取消关注
		el.style.color = 'lightgray';
	}
});
var app = new Vue({
	el: '#app',
	data: {
		id: "",
		club_name: "",
		introduction: "",
		equipsuggest: "",
		open_time: "",
		thumb: "",
		place: "",
		hits: "",
		insert_time: "",
		club_tel: "",
		tar: {
			pinned: false,
		},
	},
	mounted: function() {
		this.getData();
		this.guanzhu();
	},
	methods: {
//		获取俱乐部相关信息
		getData() {
			var id = location.href.split("?")[1].split("=")[1];
			console.log(id);
			var _this = this;
			var url = "http://172.24.10.175/workout/api.php/get/mod/club/id/" + id;
			this.$http.jsonp(url).then(function(res) {
				_this.id = res.body["id"];
				_this.club_name = res.body["club_name"];
				_this.introduction = res.body["introduction"];
				_this.equipsuggest = res.body["equipsuggest"];
				_this.open_time = res.body["open_time"];
				_this.hits = res.body["hits"];
				_this.insert_time = res.body["insert_time"];
				_this.club_tel = res.body["club_tel"];
				_this.thumb = res.body["thumb"];
				_this.place = res.body["province_name"] + res.body["city_name"] + res.body["district_name"] + res.body["club_contact"];
			}, function() {
				console.log('请求失败处理');
			});
			
//			获取教练列表
			var masterUrl = "http://172.24.10.175/workout/api.php/lists/mod/master";
			this.$http.jsonp(masterUrl).then(function(res) {
				for(var i = 0; i < res.body.length; i++) {
					if(res.body[i]["club_id"] == id) {
						var imgsrc = 'http://172.24.10.175/workout/Uploads/' + res.body[i]['thumb'];
						var masterid = res.body[i]['id'];
						$('.master').append("<li>" +
							"<a href='masterDetail.html?id=" + masterid + "'>" +
							"<img src=" + imgsrc + ">" +
							"</a>" +
							"<div class='masterText'>" +
							"<p class='master_name'>" + "<a href='masterDetail.html?id=" + masterid + "'>" + res.body[i]['realname'] + "/<span>" + res.body[i]['actcate_name'] + "大师</span></a></p>" +
							"<p class='master_place'>" + "<span class='iconfont icon-dingwei'></span>" + res.body[i]['province_name'] + " " + res.body[i]['city_name'] + "</p>" +
							"<p class='master_intro'>" + res.body[i]['introduction'] + "</p>" +
							"</div>" +
							"</li>");

					}
				}
			}, function() {
				console.log('请求失败处理');
			});
		},
//		关注
		guanzhu() {
			var flag = 0;
			var id = location.href.split("?")[1].split("=")[1];
			var user_id = window.sessionStorage.getItem('user_id');
			var listUrl = "http://172.24.10.175/workout/api.php/get/mod/user/id/" + user_id + "/related/1/map/fanclub";
			this.$http.jsonp(listUrl).then(function(res) {
//				判断用户是否关注了此俱乐部,若关注则将flag变为1
				for(var i = 0; i < res.body['fanclub'].length; i++) {
					if(res.body['fanclub'][i]['id'] == id) {
						flag = 1;
					}
				}
//				若用户关注了该俱乐部,则将图片样式对应为已关注，点击则取消关注
				if(flag) {
					this.tar['pinned'] = true;
					$("#gzForm>img").attr('src', 'img/collect_2.png');
					$("#gzForm>p").text('已关注');
					$('.operation').click(function() {
						var url = "http://172.24.10.175/workout/api.php/delete/mod/clubfans/club_id/" + id + "/user_id/" + user_id;
						$("#gzForm").ajaxSubmit({
							url: url,
							dataType: 'json',
							beforeSubmit: function() {
								alert("取消关注成功");
								btn.onclick = function() {
									window.location.reload();
								};
							}
						});
					});
				}
//				若用户未关注该俱乐部,则将图片样式对应为未关注，点击则关注				
				else {
					this.tar['pinned'] = false;
					$("#gzForm>img").attr('src', 'img/collect_1.png');
					$("#gzForm>p").text('关注');
					$('.operation').click(function() {
						var url = "http://172.24.10.175/workout/api.php/create/mod/clubfans/club_id/" + id + "/user_id/" + user_id + "/fans_type=1";
						$("#gzForm").ajaxSubmit({
							url: url,
							dataType: 'json',
							beforeSubmit: function() {
								alert("关注成功");
								btn.onclick = function() {
									window.location.reload();
								};
							}
						});
					});
				}
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