window.onload = function() {
	var input = document.getElementById("file_input");
	var result;
	var dataArr = []; // 储存所选图片的结果(文件名和base64数据)  

	var oAdd = document.getElementById("add");
	//var oSubmit = document.getElementById("submit");  
	var oInput = document.getElementById("file_input");

	if(typeof FileReader === 'undefined') {
		alert("抱歉，你的浏览器不支持 FileReader");
		input.setAttribute('disabled', 'disabled');
	} else {
		input.addEventListener('change', readFile, false);
	}　　　　　 //handler    
//	显示上传的图片
	function readFile() {
		fd = new FormData();
		var iLen = this.files.length;
		for(var i = 0; i < iLen; i++) {
			if(!input['value'].match(/.jpg|.gif|.png|.jpeg|.bmp/i)) {　　 //判断上传文件格式    
				return alert("上传的图片格式不正确，请重新选择");
			}
			var reader = new FileReader();
			//fd.append(i,this.files[i]);  
			reader.readAsDataURL(this.files[i]); //转成base64    
			reader.fileName = this.files[i].name;
			
//			成功读取
			reader.onload = function(e) {
				var imgMsg = {
					name: this.fileName, //获取文件名    
					base64: this.result //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里    
				}
				dataArr.push(imgMsg);
				result = '<img class="delete" src="img/delete.png" alt=""><div class="result"><img class="subPic" src="' + this.result + '" alt="' + this.fileName + '"/></div>';
				var div = document.createElement('div');
				div.innerHTML = result;
				div['className'] = 'float';
				document.getElementsByClassName('container_pic')[0].prepend(div);　　 //插入dom树    
				var img = div.getElementsByTagName('img')[0];
				img.onload = function() {
					var nowHeight = ReSizePic(this); //设置图片大小    
					this.parentNode.style.display = 'block';
					var oParent = this.parentNode;
					if(nowHeight) {
						oParent.style.paddingTop = (oParent.offsetHeight - nowHeight) / 2 + 'px';
					}
				}
				div.onclick = function() {
					$(this).remove(); // 在页面中删除该图片元素  
				}
			}
		}
	}

	oAdd.onclick = function() {
		oInput.value = ""; // 先将oInput值清空，否则选择图片与上次相同时change事件不会触发  
		oInput.click();
	}

}
//调整图片大小
function ReSizePic(ThisPic) {
	var RePicWidth = 200; //显示的宽度值    

	var TrueWidth = ThisPic.width; //图片实际宽度    
	var TrueHeight = ThisPic.height; //图片实际高度    

	if(TrueWidth > TrueHeight) {
		//宽大于高    
		var reWidth = RePicWidth;
		ThisPic.width = reWidth;
		//垂直居中    
		var nowHeight = TrueHeight * (reWidth / TrueWidth);
		return nowHeight; //将图片修改后的高度返回，供垂直居中用    
	} else {
		//宽小于高    
		var reHeight = RePicWidth;
		ThisPic.height = reHeight;
	}
}
//发布晒图
function publish() {
	var userid = window.sessionStorage.getItem("user_id");
	var sessionid = window.sessionStorage.getItem("sessionID");
	var url = "http://172.24.10.175/workout/api.php/fcreate/SessionID/" + sessionid + "/mod/shaitu/userid/" + userid + "/title/";
	$("#photoForm").ajaxSubmit({
		url: url,
		dataType: 'json',
		beforeSubmit: function() {
			alert("发布成功");
			btn.onclick = function() {
				history.go(-1);
			};
		}
	});
}
//返回上一页
function back() {
	history.go(-1);
}