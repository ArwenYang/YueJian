//判断上次登录时是否记住密码
var remember=$('#remember');
var login_flag=window.localStorage.getItem('login_flag');
if(login_flag==1){
	remember.prop("checked",1);
	$('#user_phone').val(window.localStorage.getItem('yj_tel'));
	$('#user_pass').val(window.localStorage.getItem('yj_psw'));
}
else{
	remember.prop("checked",0);
}


//登录操作
var login=document.getElementById('login');
login.onclick=logIn;
function logIn(){
	var tel=document.getElementById('user_phone').value;
	var psw=document.getElementById('user_pass').value;
	var url="http://172.24.10.175/workout/api.php/login/tel/"+tel+"/password/"+psw;
	$.ajax({
		type: "get",
		dataType: "jsonp", 
		jsonp: "callback", 
		url: url, 
		async: false,
		success: function(data) {
			if(data["id"]){	
//				登陆成功则存储用户相关信息
				window.sessionStorage.setItem("user_id",data["id"]);
				window.sessionStorage.setItem("psw",psw);
				window.sessionStorage.setItem("rolename",data["rolename"]);
				window.sessionStorage.setItem("sessionID",data["sessionid"]);
				window.location.href="index_yj.html";
			}
			else{
//				登录失败给出提示
				alert("手机号或密码不正确");
				btn.onclick=function(){
					window.location.href="login.html";
				};							
			}
		}
	});	
	
//	若选择记住密码则将账号密码进行存储
	if(remember.is(':checked')){		
		window.localStorage.setItem('login_flag','1');
		window.localStorage.setItem('yj_tel',tel);
		window.localStorage.setItem('yj_psw',psw);
	}
//	若选择不记住密码则将账号密码进行移除
	else{
		window.localStorage.setItem('login_flag','0');
		if(window.localStorage.getItem('yj_psw')&&window.localStorage.getItem('yj_tel'))
		{
			window.localStorage.removeItem('yj_tel');
			window.localStorage.removeItem('yj_psw');
		}						
	}				
}