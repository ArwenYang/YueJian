//返回上一页
$('#header>span').click(function() {
	history.go(-1);
});

//退出登录
$('#footer').click(function() {
//	var logoutUrl="http://139.129.208.64/api.php/logout";
	window.sessionStorage.removeItem("user_id");
	window.sessionStorage.removeItem("psw");
	window.sessionStorage.removeItem("rolename");
	window.sessionStorage.removeItem("sessionID");
	window.location.href = "login.html";
});

//删除左右两端的空格
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}


var user_pass = document.getElementById('user_pass');
var user_repass = document.getElementById('user_repass');
//密码6-12位判断

//检查用户密码是否合法
user_pass.onblur = checkUserPass;
function checkUserPass() {
	var pass = trim(document.getElementById("user_pass").value);
	var repass = trim(document.getElementById("user_repass").value);
	if(pass == null || pass == "") {
		document.getElementById("alertError").innerHTML = "请输入6-12位密码";
		return 0;
	} else if(pass.length < 6 || pass.length > 12) {
		document.getElementById("alertError").innerHTML = "请输入6-12位密码";
		return 0;
	} else {
		if(repass != null && repass != "") {
			if(pass == repass) {
				document.getElementById("alertError").innerHTML = "";
				return 1;
			} else {
				document.getElementById("alertError").innerHTML = "两次密码不一致！";
				return 0;
			}
		} else {
			return 1;
		}
	}
}


//检查确认密码是否一致
user_repass.onblur = checkUserRepass;
function checkUserRepass() {
	var pass = trim(document.getElementById("user_pass").value);
	var repass = trim(document.getElementById("user_repass").value);
	if(repass == null || repass == "") {
		document.getElementById("alertError").innerHTML = "";
		return 0;
	} else {
		if(pass == repass) {
			document.getElementById("alertError").innerHTML = "";
			return 1;
		} else {
			document.getElementById("alertError").innerHTML = "两次密码不一致！";
			return 0;
		}
	}
}

//提交修改密码
function pswchange() {
	if(checkUserPass() * checkUserRepass()) {
		var userid = window.sessionStorage.getItem("user_id");
		var newPass = $("#user_pass").val();
		var url = "http://172.24.10.175/workout/api.php/updatepass/userid/" + userid + "/password/" + newPass;
		$("#passForm").ajaxSubmit({
			url: url,
			dataType: 'json',
			beforeSubmit: function() {
				$('#passEdit').css('display', 'none');
				alert("修改成功");
				btn.onclick = function() {
					window.location.href = "login.html";
				}
			}
		});
	}
}

//关闭修改密码框
function backSet() {
	$('#passEdit').css('display', 'none');
}

//获取用户信息
var user_id = window.sessionStorage.getItem("user_id");
var url = "http://172.24.10.175/workout/api.php/getmine/userid/" + user_id;
$.ajax({
	type: "get",
	dataType: "jsonp",
	jsonp: "callback",
	url: url,
	async: false,
	success: function(data) {
		$('#userInfo>.content>p').text(data["user_name"]);
		if(data["photo"] != null) {
			$('#userInfo>.content>img').attr("src", 'http://172.24.10.175/workout/Uploads/' + data["photo"]);
			$('#userInfo>.bgBlur').css("background-image", 'url(http://172.24.10.175/workout/Uploads/' + data["photo"] + ')');
		}

		$('#service>ul>li:eq(0)').click(function() {
			window.location.href = "myEdit.html?id=" + user_id;
		});
		$('#service>ul>li:eq(1)').click(function() {
			$('#passEdit').css('display', 'block');
		});
	}
});