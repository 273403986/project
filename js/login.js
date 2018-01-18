//设置配置文件（配置依赖模块的路径）
require.config({
	paths : {
		"jquery" : "jquery-1.11.3",
		"cookie" : "jquery.cookie"
	}
})
//执行代码
require(["jquery","cookie"],function($,cookie){
	//代码
	$(function(){
		function sub(){
			//获取input
			var inp = $("#start form input");
			//获取a 点击第二个a进入到注册页
			var oa = $("#start form a");
			//点击立即登录按钮
			$(inp[4]).click(function(){
				//获取当前输入的用户名
				var usn = $(inp[0]).val();
				//获取当前输入的密码
				var pwd = $(inp[1]).val();
				//获取当前输入的验证码
				var code = $(inp[2]).val();
				//对验证码的验证
				if(code == Number(oa.eq(0).html())){
					//获取cookie中用户信息
					var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
					//将字符串转为对象
					users = convertStrToObj(users);
					if(users[usn] == pwd){
						//登陆成功
						$.cookie("loginUsers",usn,{expires:1,path:"/"});
						alert("登录成功");
						location.href = "../index.html";
					}else{
						//登录失败
						alert("你输入的用户名和密码不匹配，请确认后重试！");
					}
				}else{
					alert("你输入的验证码不正确");
				}
			})
			oa.eq(0).click(function(){
				$(this).html(randomInt(1,9).toString() + randomInt(1,9).toString() + randomInt(1,9).toString() + randomInt(1,9).toString());
			})
			$(oa[1]).click(function(){
				//跳转到注册页
				location.href = "register.html";
			})
			//随机数字
			function randomInt(min,max){
				return Math.floor(Math.random() * (max - min + 1) + min);
			}
		}
		new sub();
	})
})
//将字符串转为对象
function convertStrToObj(str){
	if(!str){//如果空字符串
		return{};//返回空对象
	}
	var users = str.split(":");
	var obj = {};
	for(var i = 0;i < users.length;i ++){
		var userData = users[i].split(",");
		obj[userData[0]] = userData[1];
	}
	return obj;
}