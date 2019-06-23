window.alert = function(str) {
	var alertBox = document.createElement("div");
	alertBox.id="alertBox";
	alertBox.style.position = "absolute";
	alertBox.style.width = "15rem";
	alertBox.style.background = "rgba(0,0,0,.8)";
	alertBox.style.border = "1px solid grey";
	alertBox.style.left = "50%";
	alertBox.style.top = "50%";
	alertBox.style.transform = "translate(-50%, -50%)";
	alertBox.style.textAlign = "center";
	alertBox.style.zIndex = "100";
	alertBox.style.color = "#fff";
	var strHtml = "";
	strHtml += '<div id="title">提示：<div id="close" onclick="certainFunc()"></div></div>';
	strHtml += '<div id="content">'+str+'</div>';
	strHtml += '<div id="certain"><input id="btn" type="button" value="确 定" onclick="certainFunc()" onhover="hoverFunc()"/></div>';
	alertBox.innerHTML = strHtml;
	document.body.appendChild(alertBox);
	var title = document.getElementById("title");
	title.style.textAlign = "left";
	title.style.marginTop = "1rem";
	title.style.paddingLeft = "1rem";
	title.style.height = "1.5rem";
	title.style.fontSize = "1rem";
	var close = document.getElementById("close");
	close.style.width = "1rem";
	close.style.height = "1rem";
	close.style.marginRight = "1rem";
	close.style.background = "url('images/close.png')";
	close.style.float = "right";
	var content = document.getElementById("content");
	content.style.margin = "1rem";
	content.style.fontSize = ".8rem";
	var certain = document.getElementById("certain");
	certain.style.position = "relative";
	certain.style.height = "2.5rem";
	certainFunc = function() {
		alertBox.parentNode.removeChild(alertBox);
	};
	var btn = document.getElementById("btn");
	btn.style.width = "3rem";
	btn.style.height = "1.5rem";
	btn.style.background = "#2599f0";
	btn.style.border = "1px solid grey";
	btn.style.position = "absolute";
	btn.style.right = "1rem";
	btn.style.bottom = "1rem";
	btn.style.marginTop = ".5rem";
	btn.style.cursor = "pointer";
	btn.style.color = "#fff";
	btn.style.fontSize=".7rem";
	hoverFunc = function() {
		btn.style.border = "1px blue solid";
	};
//	btn.onclick=function(){
//	 	window.location.href="login.html";
//	}
}