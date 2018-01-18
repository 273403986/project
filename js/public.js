define(function(){
	//鼠标移入移出top 服务中心
	function over(obj,className,img){
		var ele = document.getElementById(obj).getElementsByClassName(className)[0];
		ele.onmouseover = function(){
			ele.style.height = "100px";
			ele.style.borderLeft = "1px solid #d8d8d8";
			ele.style.background = "#fff url(" + img + "images/xia_03.jpg) no-repeat 55px 18px";
		}
		ele.onmouseout = function(){
			ele.style.height = "38px";
			ele.style.borderLeft = "0";
			ele.style.background = "#fafafa url(" + img + "images/xia_03.jpg) no-repeat 55px 18px";
		}
	}
	
	//右边固定栏
	function fixS(img){
		//获取退出登录按钮
		var emBtn = $("#fix .div1 ul .div11 em");
		//添加点击事件
		emBtn.click(function(){
			var users = $.cookie("loginUsers") ? $.cookie("loginUsers") : "";
			//删除cookie并放回
			users = convertStrToObj(users);
			for(var key in users){
			}
			delete users[key];
			$.cookie("loginUsers",convertObjToStr(users),{expires : 1,path : "/"});
			location.href = "";
		})
		var eles = document.getElementById("fix").getElementsByTagName("a");
		eles[3].parentNode.onmouseover = function(){
			var users = $.cookie("loginUsers") ? $.cookie("loginUsers") : "";
			if(users != ""){
				eles[3].parentNode.getElementsByTagName("h6")[0].style.display = "none";
				eles[3].parentNode.getElementsByTagName("div")[0].style.display = "block";
			}else{
				eles[3].parentNode.getElementsByTagName("h6")[0].style.display = "block";
				eles[3].parentNode.getElementsByTagName("div")[0].style.display = "none";
			}
			eles[3].parentNode.style.background = "url(" + img + "images/icon_list.png) no-repeat -237px -2px";
		}
		eles[3].parentNode.onmouseout = function(){
			eles[3].parentNode.getElementsByTagName("h6")[0].style.display = "none";
			eles[3].parentNode.getElementsByTagName("div")[0].style.display = "none";
			eles[3].parentNode.style.background = "#444851";
		}
		eles[4].onmouseover = function(){
			eles[4].parentNode.style.backgroundColor = "#c42c33";
		}
		eles[4].onmouseout = function(){
			eles[4].parentNode.style.backgroundColor = "#444851";
		}
		eles[6].parentNode.onmouseover = function(){
			eles[6].parentNode.getElementsByTagName("img")[0].style.display = "block";
			eles[6].parentNode.style.background = "url(" + img + "images/icon_list.png) no-repeat -237px -58px";
		}
		eles[6].parentNode.onmouseout = function(){
			eles[6].parentNode.getElementsByTagName("img")[0].style.display = "none";
			eles[6].parentNode.style.background = "#444851";
		}
		eles[7].parentNode.onmouseover = function(){
			eles[7].parentNode.getElementsByTagName("h6")[0].style.display = "block";
			eles[7].parentNode.style.background = "url(" + img + "images/icon_list.png) no-repeat -237px -2px";
		}
		eles[7].parentNode.onmouseout = function(){
			eles[7].parentNode.getElementsByTagName("h6")[0].style.display = "none";
			eles[7].parentNode.style.background = "#444851";
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
	}
	
	//给右侧固定栏div添加返回顶部事件
	function fix(){
		var div = $("#fix .div6 p a");
		var div2 = $("#service div")[0];
		div.click(function(){
			$('html,body').animate({scrollTop : 0},500);
		})
	}
	
	//给下面商品参数，详情点击添加事件
	function click(){
		//获取a按钮
		var li = $("#buy .div2 ul li");
		var a = $("#buy .div2 ul li a");
		a.click(function(){
			li.each(function(){
				$(this).css({"border-top" : "0px solid #fff","background" : "#f6f6f6"});
			})
			$(this).parent().css({"border-top" : "2px solid #c42c33","background" : "#fff"});
		})
	}
	
	//放大镜及移入移出切换大图
	function large(a,b,c,d,e){
		//获取大图
		var dPhoto = $("#shop .div2 .div21 .div211 img");
		//获取小图
		var xPhoto = $("#shop .div2 .div21 .div212 img");
		//给小图添加移入移出事件
		xPhoto.mouseover(function(){
			var index = $(this).index();
			if(index == 0){
				dPhoto[0].src = a;
				xPhoto.each(function(){
					$(this).css("border","1px solid #fff");
				})
				$(xPhoto[index]).css("border","1px solid #000");
			}
			if(index == 1){
				dPhoto[0].src = b;
				xPhoto.each(function(){
					$(this).css("border","1px solid #fff");
				})
				$(xPhoto[index]).css("border","1px solid #000");
			}
			if(index == 2){
				dPhoto[0].src = c;
				xPhoto.each(function(){
					$(this).css("border","1px solid #fff");
				})
				$(xPhoto[index]).css("border","1px solid #000");
			}
			if(index == 3){
				dPhoto[0].src = d;
				xPhoto.each(function(){
					$(this).css("border","1px solid #fff");
				})
				$(xPhoto[index]).css("border","1px solid #000");
			}
			if(index == 4){
				dPhoto[0].src = e;
				xPhoto.each(function(){
					$(this).css("border","1px solid #fff");
				})
				$(xPhoto[index]).css("border","1px solid #000");
			}
		})
		//给大图添加放大镜效果
		//将隐藏元素显示出来 画布canvasSun 和 放大区域land
		var span = $("#shop .div2 .div21 .div211 span");
		var land = $("#shop .div2 .div21 .div214");
		var landImg = $("#shop .div2 .div21 .div214 img");
		$(span[0]).mouseover(function(evt){
			$(span[1]).css("display","block");
			land.css("display","block");
			//克隆当前的图片
			var img = dPhoto.clone();
			//删除原先图片
			land.empty();
			//并添加当前的图片
			land.append(img);
		})
		//移动事件
		$(span[0]).mousemove(function(evt){
			var left = evt.offsetX - $(span[1]).width() / 2;
			var top = evt.offsetY - $(span[1]).height() / 2;
			var con1 = $(span[0]).width() - $(span[1]).width();
			var con2 = $(span[0]).height() - $(span[1]).height();
			if(left <= 0){
				left = 0;
			}else if(left >= con1){
				left = con1;
			}
			if(top <= 0){
				top = 0;
			}else if(top >= con2){
				top = con2;
			}
			$(span[1]).css({"left" : left,"top" : top});
			//获取比例
			//获取小图比例
			var px = left / con1;
			var py = top / con2;
			//重新获取大图片
			var landImg2 = $("#shop .div2 .div21 .div214 img");
			//设置大图位置
			landImg2.css({"left" : -px * (landImg2.width() - land.width()),"top" : -py * (landImg2.height() - land.height())});
		})
		//移出事件
		$(span[0]).mouseout(function(){
			$(span[1]).css("display","none");
			land.css("display","none");
		})
	}
	
	//给右边固定栏添加立即登录事件
	function lg(){
		//获取左上角的span 和 两个a按钮
		var span = $("#top .div1 span").eq(0);
		var a = $("#top .div1 a");
		//获取cookie中用户信息
		var users = $.cookie("loginUsers") ? $.cookie("loginUsers") : "";
		
		//#fix 下的 div1 下的 获取div11 和 h6 登陆成功显示div11
		//在这里只改变了span标签的值 public.js中修改
		var span1 = $("#fix .div1 ul .div11 span").eq(1);
		
		//将字符串转为对象
		if(users != ""){
			users = convertStrToObj(users);
			for(var key in users){
//					console.log(key);
//					console.log(users[key]);
			}
			span.text("你好：" + key + ",");
			span1.text(key);
			a.each(function(){
				$(this).css("display","none");
			})
			
		}else{
			a.each(function(){
				$(this).css("display","inline-block");
			})
			span.text("");
			span1.text("");
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
	}
	
	//给右边固定栏添加立即登录事件
	function lg2(){
		//获取元素input 以及验证码 立即登录
		var inp = $("#fix .div1 ul h6 input");
		var i1 = $("#fix .div1 ul h6 i");
		
		i1.click(function(){
			$(this).html(randomInt(1,9).toString() + randomInt(1,9).toString() + randomInt(1,9).toString() + randomInt(1,9).toString());
		})
		
		//点击立即登录按钮
		$(inp[3]).click(function(){
			//获取当前输入的用户名
			var usn = $(inp[0]).val();
			//获取当前输入的密码
			var pwd = $(inp[1]).val();
			//获取当前输入的验证码
			var code = $(inp[2]).val();
			//对验证码的验证
			if(code == Number(i1.html())){
				//获取cookie中用户信息
				var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
				//将字符串转为对象
				users = convertStrToObj(users);
				if(users[usn] == pwd){
					//登陆成功
					$.cookie("loginUsers",usn,{expires:1,path:"/"});
					alert("登录成功");
					location.href = "";
				}else{
					//登录失败
					alert("你输入的用户名和密码不匹配，请确认后重试！");
				}
			}else{
				alert("你输入的验证码不正确");
			}
		})
		
		//随机数字
		function randomInt(min,max){
			return Math.floor(Math.random() * (max - min + 1) + min);
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
	}

	//加载购物车中的信息（使商品页与购物车页中的购物车数量同步）
	function loadCart(){
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		var cartObj = convertCartStrToObj(cartStr);
		//获取到购物车中所有商品的数量
		var total = 0;
		for(var id in cartObj){
			total += Number(cartObj[id].num);
		}
		//更新右侧固定栏购物车的数量
		$("#fix .div2 span").text(total);
	}
	function convertCartStrToObj(cartStr) {
		//如果是空字符串，即没有购物车信息，那么购物车为空，直接返回一个空对象
		if(!cartStr) {
			return {};
		}
		if(cartStr){
//				alert(cartStr);
			return JSON.parse(cartStr);
		}	
	}

	function add(){
		//获取页面中的加减按钮
		var addsub = $("#shop .div2 .div22 .div223 a");
		//获取input的值 下标0 为text值 下标1位button
		var inp = $("#shop .div2 .div22 .div223 input");
		var num = 0;
		$(inp[0]).val(num);
		addsub.click(function(){
			var index = $(this).index();
			if(index == 2){ // 加
				num ++;
				$(inp[0]).val(num); 
			}else if(index == 3){ //减
				if(num <= 1){
					alert("商品的数量不能小于1");
				}else{
					num --;
					$(inp[0]).val(num);
				}
			}else{
				return;
			}
		})
		//改数量的input绑定一个blur事件
		inp.eq(0).blur(function(){
			//判断用输入是否合法
			var pattern = /^\d+$/;
			if(!pattern.test($(this).val())){
				$(this).val("1");
			}else{
			}
		})
		//给button按钮添加点击事件
		$(inp[1]).click(function(e){
			//创建cookie所需要的
			//商品的id
			var goodId = $($("#shop .div2 .div22 .div221 span")[2]).text();
			//商品的名称
			var name = $("#shop .div2 .div22 .div221 h2").text();
			//商品的价格
			var price = $($("#shop .div2 .div22 .div221 span")[1]).text();
			//获取当前购买数量
			var count = $($("#shop .div2 .div22 .div223 input")[0]).val();
			//获取图片的路径
			var src = $("#shop .div2 .div21 .div211 img").attr("src");
			//创建cookie
			//获取cookie中的信息
			//如果cookie中没有信息会返回一个undefined ,我所须是一个字符串类型的数据，所以将它转成一个“”空字符串。保持数据类型一致。
			if($($("#shop .div2 .div22 .div223 input")[0]).val() == 0){
				alert("数量不能为0");
				return;
			}
			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			//将字符串转成对象
			var cartObj = convertCartStrToObj(cartStr);
//				console.log(cartObj);
			//判断该商品是否已经在购物车中存在
			if(goodId in cartObj){
				//如果已存在，那么该商品的数量加1
				alert("购物车已存在该商品");
			}else{
				//如果不存在，那么将新商品的信息存入
				cartObj[goodId] = {
					"name" : name,
					"price" : price,
					"num" : count,
					"src" : src
				};
				var head = $("#fix .div2 p a");
				var img = $("#shop .div2 .div21 .div211 img");
				var flyElm = img.clone().css('opacity', 0.75);
				$('body').append(flyElm);
				flyElm.css({
					'z-index': 9000,
					'display': 'block',
					'position': 'absolute',
					'top': img.offset().top +'px',
					'left': img.offset().left +'px',
					'width': img.width() +'px',
					'height': img.height() +'px'
				});
				flyElm.animate({
					top: head.offset().top + 88,
					left: head.offset().left,
					width: 20,
					height: 32
				}, 'slow', function() {
					flyElm.remove();
					loadCart();
				});
			}
			
			//将新的购物车信息存回cookie
			//将对象转为字符串
			cartStr = JSON.stringify(cartObj);
//			console.log(cartStr);
			//存入cookie
			//document.cookie = "key=value"
			$.cookie("cart",cartStr,{expires : 7,path:"/"});
			//做一个飞入购物车的效果
		})
		//加载购物车中的信息（使商品页与购物车页中的购物车数量同步）
		loadCart();
	}

	return {
		over : over,
		fixS : fixS,
		fix : fix,
		click : click,
		large : large,
		lg : lg,
		lg2 : lg2,
		loadCart : loadCart,
		add : add
	}
})
