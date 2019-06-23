$(function() {
//	返回上一页
	$('#header>span').click(function() {
		history.go(-1);
	});

//	判断用户是否登录，已登录则可以进行提问
	if(window.sessionStorage.getItem('user_id')) {
		$('.question').append('<div>' +
			'<form action="javascript:;" method="post" id="questionForm">' +
			'<textarea name="question" rows="" cols=""></textarea>' +
			'<input type="button" name="" id="sub" value="提问"/>' +
			'</form>' +
			'</div>');
	}
//	判断用户是否登录，未登录则提示登录
	else {
		$('.question').append('<div>' +
			'<p>请<a href="login.html">登录</a>后进行提问</p>' +
			'</div>');
	}
//	获取大师信息
	var id = location.href.split("?")[1].split("=")[1];
	var masterUrl = 'http://172.24.10.175/workout/api.php/get/mod/master/id/' + id + '/map/clubjw';
	$.ajax({
		type: 'get',
		url: masterUrl,
		cache: false,
		dataType: 'jsonp',
		success: function(data) {
			var imgsrc = 'http://172.24.10.175/workout/Uploads/' + data['thumb'];
			$('#master_pic').attr('src', imgsrc);

			$('#basicInfo').prepend('<p class="large">' + data['realname'] + '/<span>' + data['actcate_name'] + '大师</span></p>' +
				'<p><span class="iconfont icon-dingwei"></span>' + data['province_name'] + ' ' + data['city_name'] + '</p>' +
				'<p>所属俱乐部：<span>' + data['club_name'] + '</span></p>');

			$('#introPart').append('<p class="intro">' + data['introduction'] + '</p>');

		}
	});
//	获取问大师列表信息
	var questionUrl = 'http://172.24.10.175/workout/api.php/lists/mod/masterfaq';
	$.ajax({
		type: 'get',
		url: questionUrl,
		cache: false,
		dataType: 'jsonp',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				if(data[i]['answer'] == '' || data[i]['answer'] == null) {
					var answer = '暂无回答';
				} else {
					var answer = data[i]['answer'];
				}
				if(data[i]['master_id'] == id) {
					$('#question>.mb').append('<dl><dt><i></i>' + data[i]['question'] + '</dt><dd><i></i>' + answer + '</dd></dl>');

				}
			}
			$('.mb dd').eq(0).show();
			$('.mb dt').click(function() {
				$('.mb dd').hide();
				$(this).next().show();
			});
		}
	});

//	提问
	document.getElementById('sub').onclick = ask;
	function ask() {
		var user_id = window.sessionStorage.getItem('user_id');
		var askUrl = "http://172.24.10.175/workout/api.php/create/mod/masterfaq/user_id/" + user_id + "/master_id/" + id + "/question/";
		$("#questionForm").ajaxSubmit({
			url: askUrl,
			dataType: 'json',
			beforeSubmit: function() {
				alert("提问成功");
				btn.onclick=function(){
					window.location.reload();
				};
			}
		});
//		alert("提问成功");
//		btn.onclick = function() {
//			window.location.reload();
//		};
	}
});