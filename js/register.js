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
		function sub(){}
		//获取input
		var inp = $("#start form input");
		//获取a 点击第二个a进入到注册页
		var oa = $("#start form a");
		var usn = null;
		var pwd = null;
		var con = null;
		//失焦事件
		$(inp[0]).blur(function(){
			//获取用户名
			usn = $(inp[0]).val();
			//正则表达式
			var ra = /0?(13|14|15|18|17)[0-9]{9}/;//验证手机号
			var rb = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;//验证邮箱
			if(ra.test(usn) || rb.test(usn)){
				inp[0].style.border = "1px solid #c8c8c8";
				$(inp[0]).next().css("display","none");
			}else{
				inp[0].style.border = "1px solid red";
				$(inp[0]).next().css("display","block");
			}
		})
		oa.eq(0).click(function(){
			$(this).html(randomInt(1,9).toString() + randomInt(1,9).toString() + randomInt(1,9).toString() + randomInt(1,9).toString());
		})
		$(inp[4]).blur(function(){
			//获取密码
			pwd = $(inp[4]).val();
			var rc = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;//验证密码
			if(rc.test(pwd)){
				inp[4].style.border = "1px solid #c8c8c8";
				$(inp[4]).next().css("display","none");
			}else{
				inp[4].style.border = "1px solid red";
				$(inp[4]).next().css("display","block");
			}
		})
		$(inp[5]).blur(function(){
			//获取密码
			pwd = $(inp[4]).val();
			//获取当前输入的第二次密码
			con = $(inp[5]).val();
			if(con != pwd){
				inp[5].style.border = "1px solid red";
				$(inp[5]).next().css("display","block");
			}else{
				inp[5].style.border = "1px solid #c8c8c8";
				$(inp[5]).next().css("display","none");
			}
		})
		//点击立即登录按钮
		$(inp[7]).click(function(){
			//用户不能为空
			if(!usn){
				alert("用户名不能为空！");
				location.href = "../html/register.html";
				return;
			}
			//检测密码是否相同
			//密码不能为空，密码规则
			if(!con || !pwd){
				alert("请输入密码");
				location.href = "../html/register.html";
				return;
			}
			if(pwd !== con){
				alert("两次输入的密码不一致，请重新输入");
				location.href = "../html/register.html";
				return;
			}
			if(inp.eq(1).val() != Number(oa.eq(0).html())){
				alert("验证码不正确");
				location.href = "../html/register.html";
				return;
			}
			
			//检测一下用户是否已经存在
			//假设："test1,123:test2,abc:test3,888"
			/*转为对象
			 * {
			 * 	test1:123,
			 *  test2:abc,
			 *  test3:888
			 * }
			 */
			
			//获取cookie中的用户信息
			var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
			//将字符串转为对象
			users = convertStrToObj(users);
			if(usn in users){ //判断usn属性是否在users对象中。
				alert("用户名已经被注册");
				return;
			}else{
				//注册成功，设置用户信息的cookie
				//test1 123  test2 abc  test3 888
				//"test1,123:test2,abc:test3,888"设置cookie的value值
				//registerUsers 设置cookie的name(key)值
				//将用户添加到已注册用户列表对象中
				users[usn] = pwd;
				//假设users[李涛] = 123
				
				//将用户信息对象转化回字符串，以便于设置cookie
				userStr = convertObjToStr(users);
				//设置用户信息cookie
				$.cookie("registerUsers",userStr,{expires:7,path:"/"});
				console.log(decodeURIComponent(document.cookie))
				alert("注册成功！");
				location.href = "../html/login.html";
			}
		})
		$(oa[1]).click(function(){
			//跳转到注册页
			location.href = "../html/login.html";
		})
		new sub();
		
		//随机数字
		function randomInt(min,max){
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
	})
})
//将对象转为字符串
function convertObjToStr(obj){
	var str = "";
	//遍历对象
	for(var usn in obj){
		var pwd = obj[usn];
		if(str){
			str += ":";
		}
		str += usn + ',' + pwd;
	}
	return str;
}
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