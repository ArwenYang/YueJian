var user_pass = document.getElementById("user_pass");
var user_repass = document.getElementById("user_repass");
var user_phone = document.getElementById("user_phone");
var codeText = document.getElementById("code");
//var getCode=document.getElementById("getCode");
var checkCode = document.getElementById("checkCode");
var sub = document.getElementById("sub");
var ok = document.getElementsByClassName("ok");
//var ordertime=20; 
//var timeleft=ordertime;
var rule = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
var code; //验证码              
//Bmob.initialize("ef8e75ec036df21eff2808d68cbff206", "368dd8c25b9fc011766cedb7cfef6cff");

//随机生成验证码
function createCode() {
	code = "";
	var codeLength = 4; //验证码的长度     
	var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
		'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数   
	for(var i = 0; i < codeLength; i++) { //循环操作
		var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）   
		code += random[index]; //根据索引取得随机数加到code上   
	}
	codeText.innerText = code; //把code值赋给验证码   
}
//删除左右两端的空格
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

window.onload = function() {
//	getCode.disabled=true;
//	sub.disabled=true;
	createCode();
}

//手机号合法判断			
user_phone.onblur = checkUserPhone;
function checkUserPhone() {
	var str = document.getElementById("user_phone").value;
	if(trim(str) == "") {
		document.getElementById("alert_phone").innerHTML = "请输入手机号";
		ok[0].style.display = "none";
		return 0;
	} 
	else if(rule.test(user_phone.value)) {
//		getCode.removeAttr("disabled");
		document.getElementById("alert_phone").innerHTML = "";
		ok[0].style.display = "block";
		return 1;
	} 
	else {
//		getCode.disabled=true;
		document.getElementById("alert_phone").innerHTML = "手机号不合法";
		ok[0].style.display = "none";
		return 0;
	}
}

//密码6-12位判断
user_pass.onblur = checkUserPass;
function checkUserPass() {
	var pass = trim(document.getElementById("user_pass").value);
	var repass = trim(document.getElementById("user_repass").value);
	if(pass == null || pass == "") {
		document.getElementById("alert_pass").innerHTML = "请输入6-12位密码";
		ok[1].style.display = "none";
		return 0;
	} 
	else if(pass.length < 6 || pass.length > 12) {
		document.getElementById("alert_pass").innerHTML = "请输入6-12位密码";
		ok[1].style.display = "none";
		return 0;
	} 
	else {
		if(repass != null && repass != "") {
			if(pass == repass) {
				document.getElementById("alert_pass").innerHTML = "";
				document.getElementById("alert_repass").innerHTML = "";
				ok[2].style.display = "block";
				return 1;
			} 
			else {
				document.getElementById("alert_repass").innerHTML = "两次密码不一致！";
				ok[2].style.display = "none";
				return 0;
			}
		} 
		else {
			document.getElementById("alert_pass").innerHTML = "";
			ok[1].style.display = "block";
			return 1;
		}
	}
}

//确认密码是否一致
user_repass.onblur = checkUserRepass;
function checkUserRepass() {
	var pass = trim(document.getElementById("user_pass").value);
	var repass = trim(document.getElementById("user_repass").value);
	if(repass == null || repass == "") {
		document.getElementById("alert_repass").innerHTML = "";
		ok[2].style.display = "none";
		return 0;
	} 
	else {
		if(pass == repass) {
			document.getElementById("alert_repass").innerHTML = "";
			ok[2].style.display = "block";
			ok[1].style.display = "block";
			return 1;
		} 
		else {
			document.getElementById("alert_repass").innerHTML = "两次密码不一致！";
			ok[2].style.display = "none";
			return 0;
		}
	}
}


//校验验证码   
checkCode.onblur = checkUserCode;
function checkUserCode() {
	var checkCodeText = checkCode.value.toUpperCase(); //取得输入的验证码并转化为大写         
	if(checkCodeText.length <= 0) { //若输入的验证码长度为0
		document.getElementById("alert_code").innerHTML = "请输入验证码";
		ok[3].style.display = "none";
		return 0;
	} 
	else if(checkCodeText != code) { //若输入的验证码与产生的验证码不一致时
		document.getElementById("alert_code").innerHTML = "验证码错误";
		ok[3].style.display = "none";
		createCode(); //刷新验证码   
		checkCode.value = ""; //清空文本框   
		return 0;
	} 
	else { //输入正确时
		document.getElementById("alert_code").innerHTML = "";
		ok[3].style.display = "block";
		return 1;
	}
}

//			//计时函数
//			function timeCount(){
//			    timeleft-=1;
//			    if (timeleft>0)
//			    {
//			        getCode.disabled=true;
//			        getCode.value=timeleft+" 秒后重发";
//			        setTimeout(timeCount,1000);
//			    }
//			    else 
//			    {
//			        getCode.value="重新发送";
//			        timeleft=ordertime;   //重置等待时间
//			        getCode.disabled=false;
//			    }
//			}

//			getCode.onclick=sendCode;
//			function sendCode(){
//			    this.disabled=true;//防止多次点击
//			    //ajax请求 向后台发送 获取验证码请求
//			    //发送验证码
//			    Bmob.Sms.requestSmsCode({"mobilePhoneNumber": user_phone.value } ).then(function(obj) 
//			    {
//			        document.getElementById("alert_code").innerHTML="验证码已发送，请稍等！";
//			        ok[4].style.display="none";
//			    }, function(err)
//			    {
//			        document.getElementById("alert_code").innerHTML="验证码发送失败！";
//			        //alert("发送失败"+err);
//			        ok[4].style.display="none";
//			    });                   
//			    timeCount(this);               
//			}
//			
//			checkCode.onchange=checkUserCode;
//			function checkUserCode()
//			{
//			    Bmob.Sms.verifySmsCode(user_phone.value, checkCode.value).then(function(obj) 
//			    {
//			        document.getElementById("alert_code").innerHTML="验证码验证成功，可注册！";
//			        ok[4].style.display="block";
//			    }, function(err)
//			    {
//			        document.getElementById("alert_code").innerHTML="验证码错误！";
//			         ok[4].style.display="none";
//			    });
//			}
//			
//			checkCode.onblur=judge;

//登录
sub.onclick = checkAgain;
function checkAgain() {
	var rs = checkUserPhone() * checkUserPass() * checkUserRepass();

	if(rs) {
		var tel = user_phone.value;
		var psw = user_pass.value;
		var url = "http://172.24.10.175/workout/api.php/reg";
		$.ajax({
			type: "get",
			dataType: "jsonp",
			jsonp: "callback",
			url: url,
			async: false,
			data: {
				tel: tel,
				password: psw
			},
			success: function(data) {
				alert("注册成功，可返回登录");
				btn.onclick = function() {
					window.location.href = "login.html";
				};
				console.log("ok");
			},
			error: function(data) {
//				alert("该手机号已被注册");
//				btn.onclick=function(){
//					window.location.href="register.html";
//				};
				console.log(data);
			}
		});
	}
}