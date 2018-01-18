//设置配置文件（配置依赖模块的路径）
require.config({
	paths : {
		"jquery" : "jquery-1.11.3",
		"cookie" : "jquery.cookie",
		"sport" : "sport",
		"public1" : "public"
	}
})
//执行代码
require(["jquery","cookie","sport","public1"],function($,cookie,sport,public1){
	//代码
	$(function(){
		//鼠标移入移出top 服务中心
		public1.over("top","div2","");
		
		//获取cookie登录信息
		public1.lg();
		
		//给右边固定栏添加立即登录事件
		public1.lg2();
		
		//右边固定栏
		public1.fixS("");
		
		//右侧客服中心
		function service(){
			//点击出现客服中心
			var obj = document.getElementById("service").getElementsByTagName("div")[0];
			var scrollTop = document.documentElement.scrollTop + 200;
			sport.sport(obj,{"top" : scrollTop});
			//客服中心内容获取
			var ele = document.getElementById("service").getElementsByTagName("div")[1];
			var eleImg = ele.getElementsByTagName("img")[0];
			
			obj.onmouseover = function(){
				obj.getElementsByTagName("img")[0].src = "images/panel_open2.png";
			}
			obj.onmouseout = function(){
				obj.getElementsByTagName("img")[0].src = "images/panel_open.png";
			}
			obj.onclick = function(){
				ele.style.display = "block";
				ele.style.top = obj.offsetTop + "px";
				obj.style.display = "none";
			}
			sport.sport(ele,{"top" : scrollTop});
			eleImg.onmouseover = function(){
				eleImg.src = "images/panel_close2.png";
			}
			eleImg.onmouseout = function(){
				eleImg.src = "images/panel_close.png";
			}
			eleImg.onclick = function(){
				ele.style.display = "none";
				obj.style.display = "block";
			}
		}
		new service();
		
		//banner图的轮播
		function start(){
			var oBanner = document.getElementById("banner");
			var imgs = oBanner.getElementsByTagName("img");
			var oA = oBanner.getElementsByTagName("span");
			var nowIndex = 0;
			autoPlay();
			for(var i = 0;i < imgs.length;i ++){
				oA[i].index = i;
				oA[i].onclick = function(){
					nowIndex = this.index;
					init();
				}
			}
			function autoPlay(){
				var timer = setInterval(function(){
					nowIndex ++;
					if(nowIndex > imgs.length - 1){
						nowIndex = 0;
					}
					init();
				},1500);
				oBanner.onmouseenter = function(){
					clearInterval(timer);
				}
				oBanner.onmouseleave = function(){
					autoPlay();
				}
			}
			function init(){
				for(var j = 0;j < imgs.length;j ++){
					imgs[j].style.display = "none";
					oA[j].style.background = "#c8c6c9";
				}
				imgs[nowIndex].style.display = "block";
				oA[nowIndex].style.background = "orange";
			}
		}
		new start();
		
		//全部分类 二级菜单
		function menu(){
			var lis = $("#nav .ul1 .ul2 li");
			lis.hover(function(){
				$(this).children("h2").css("display","block");
			},function(){
				$(this).children("h2").css("display","none");
			})
		}
		new menu();
		
		//获取图片和其内容并添加到show .div4 .div5 .div1||.div2中
		function lac(){
			$.ajax({
				url : "JSON/insh.json",
				success : function(data){
//					$("#show .div4 .div5 .div1").html(data);
					var divA = $("#show .div4 .div5 .div1");
					var divB = $("#show .div4 .div5 .div2");
					for(var i in data){
						var H3 = $('<h3><p><img src="' + data[i] + '" alt="" /></p><a href="#">芯启源SL御享大师太空舱按摩椅（提货券）</a><i>￥5980</i><span></span><em>' + ++i + '</em></h3>');
						divA.append(H3);
						var H4 = $('<h3><p><img src="' + data[i] + '" alt="" /></p><a href="#">芯启源SL御享大师太空舱按摩椅（提货券）</a><i>￥5980</i><span></span><em>' + i + '</em></h3>');
						divB.append(H4);
//						<h3><p><img src="images/showa1.jpg" alt="" /></p><a href="#">芯启源SL御享大师太空舱按摩椅（提货券）</a><i>￥5980</i><span></span><em>1</em></h3>
					}
					//给show添加事件
					function shoW(){
						//获取所有的p添加移入移出事件
						var ps = $("#show h3");
						ps.hover(function(){
							$(this).css("border","1px solid #cf2c33");
							$(this).children("p").children("img").css({"width" : "230px","height" : "230px"});
						},function(){
							$(this).css("border","1px solid #fff");
							$(this).children("p").children("img").css({"width" : "224px","height" : "225px"});
						})
						//给左右按钮添加点击事件
						var oa = $("#show .div3 a");
						//div1的
						var obj = $("#show").children(".div4").children(".div5").children(".div1")[0];
						var oH3 = $("#show").children(".div4").children(".div5").children(".div1").children("h3");
						//div2的
						var obj2 = $("#show").children(".div4").children(".div5").children(".div2")[0];
						var oH32 = $("#show").children(".div4").children(".div5").children(".div2").children("h3");
						//给今日直播和昨日回顾添加点击按钮
						var H2a = $("#show h2 a");
						var span = $("#show h2 span");
						var div1 = $("#show .div4 .div5 .div1");
						var div2 = $("#show .div4 .div5 .div2");
						H2a.click(function(){
							var ind = $(this).index();
							if(ind == 0){
								span[0].style.display = "block";
								div1.css("display","block");
								span[1].style.display = "none";
								div2.css("display","none");
								H2a[0].style.backgroundColor = "#c42c33";
								H2a[1].style.backgroundColor = "#fff";
								oa[3].style.display = "none";
								oa[2].style.display = "none";
								oa[1].style.display = "block";
								oa[0].style.diplay = "block";
							}
							if(ind == 1){
								span[1].style.display = "block";
								div2.css("display","block");
								span[0].style.display = "none";
								div1.css("display","none");
								H2a[0].style.backgroundColor = "#fff";
								H2a[1].style.backgroundColor = "#c42c33";
								oa[3].style.display = "block";
								oa[2].style.display = "block";
								oa[1].style.display = "none";
								oa[0].style.diplay = "none";
							}
						})
						var nowIndex = 5;
						var nowIndex2 = 5;
						var num1 = 2;
						var num2 = 2;
						//给左右按钮添加点击事件
						oa.click(function(){
							var index = $(this).index();
							if(index == 0){
								nowIndex = nowIndex - 5;
								if(nowIndex <= 0){
									nowIndex = oH3.length + 5;
								}
								oa[0].innerText = num1 + "/" + 6;
								oa[1].innerText = num1 + "/" + 6;
								num1 ++;
								if(num1 == 7){
									num1 = 1;
								}
								init(obj,nowIndex,oH3);
							}
							if(index == 1){
								nowIndex = nowIndex + 5;
								if(nowIndex >= oH3.length + 5){
									nowIndex = 0;
								}
								oa[0].innerText = num1 + "/" + 6;
								oa[1].innerText = num1 + "/" + 6;
								num1 ++;
								if(num1 == 7){
									num1 = 1;
								}
								init(obj,nowIndex,oH3);
							}
							if(index == 2){
								nowIndex2 = nowIndex2 - 5;
								if(nowIndex2 <= 0){
									nowIndex2 = oH32.length + 5;
								}
								oa[2].innerText = num2 + "/" + 6;
								oa[3].innerText = num2 + "/" + 6;
								num2 ++;
								if(num2 == 7){
									num2 = 1;
								}
								init(obj2,nowIndex2,oH32);
							}
							if(index == 3){
								nowIndex2 = nowIndex2 + 5;
								if(nowIndex2 >= oH32.length + 5){
									nowIndex2 = 0;
								}
								oa[2].innerText = num2 + "/" + 6;
								oa[3].innerText = num2 + "/" + 6;
								num2 ++;
								if(num2 == 7){
									num2 = 1;
								}
								init(obj2,nowIndex2,oH32);
							}
						})
						function init(oObj,num,oEle){
							if(num == 0){
								sport.sport(oObj,{"left" : 0});
							}else if(num >= oEle.length + 5){
								sport.sport(oObj,{"left" : - (oEle[0].offsetWidth * (oEle.length - 5) + 10 * (num -10))});
							}else{
								sport.sport(oObj,{"left" : - (oEle[0].offsetWidth * (num-5) + 10 * (num -5))});
								
							}
						}
					}
					new shoW();
				}
			})
		}
		new lac();
		
		//给case下div 下h2添加移入事件
		function blck(){
			//获取h2
			var h2 = $("#case .div1 h2");
			h2.hover(function(){
				var index = $(this).index();
				if(index == 0){
					$(this).children("div").css("display","block");
					$(this).children("p").css("display","block");
				}
				if(index == 1){
					$(this).children("div").css("display","block");
					$(this).children("p").css("display","block");
				}
			},function(){
				var index = $(this).index();
				if(index == 0){
					$(this).children("div").css("display","none");
					$(this).children("p").css("display","none");
				}
				if(index == 1){
					$(this).children("div").css("display","none");
					$(this).children("p").css("display","");
				}
			})
		}
		new blck();
		
		//通过ajax获取图片内容并添加到news 下div中
		function lanews(){
			$.ajax({
				url : "JSON/innews.json",
				success : function(data){
//					$("#news div").html(data);
					var div = $("#news div");
					for(var i in data){
						var p = $('<p><img src="' + data[i] + '" alt="" /><a href="#">(走进小王家岛)大洋岛鲜捕海参滋补</a><i>￥5980</i></p>');
						div.append(p);
//						<p><img src="images/news1.jpg" alt="" /><a href="#">(走进小王家岛)大洋岛鲜捕海参滋补</a><i>￥5980</i></p>
					}
					function movie(){
						//获取所有的p
						var ps = $("#news div p");
						ps.hover(function(){
							$(this).children("img").animate({opacity : "0.7"},500);
						},function(){
							$(this).children("img").animate({opacity : "1"},500);
						})
					}
					new movie();
				}
			})
		}
		new lanews();
		
		//给右侧固定栏div添加返回顶部事件
		public1.fix();
		
		//登录注册按钮的实现
		function log(){
			var oA = $("#top .div1 a");
			//登陆按钮
			oA.click(function(){
				var index = $(this).index();
				if(index == 0){
					location.href = "../html/login.html";
				}
				if(index == 1){
					location.href = "../html/register.html";
				}
			})
		}
		new log();
		
		//上侧固定栏
		function fixT(){
			var scrollTop = document.documentElement.scrollTop;
			//大盒子
			var topFix = $("#topFix");
			//小logo
			var xLogo = $("#topFix img");
			//小input
			var xInp = $("#topFix input");
			//小a
			var xA = $("#topFix a");
			if(scrollTop > 300){
				topFix.css("display","block");
				xLogo.css("display","block");
				xInp.css("display","block");
				xA.css("display","block");
				sport.sport(topFix[0],{"height" : 50});
				sport.sport(xLogo[0],{"height" : 40});
				sport.sport(xInp[0],{"height" : 31});
				sport.sport(xA[0],{"height" : 33});
			}
		}
		new fixT();
		
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
		//加载购物车中的信息（使商品页与购物车页中的购物车数量同步）
		public1.loadCart();
		
		window.onscroll = function(){
			//滚动客服中心
			new service();
			var scrollTop = document.documentElement.scrollTop;
			//大盒子
			var topFix = $("#topFix");
			//小logo
			var xLogo = $("#topFix img");
			//小input
			var xInp = $("#topFix input");
			//小a
			var xA = $("#topFix a");
			if(scrollTop <= 300){
				sport.sport(topFix[0],{"height" : 0},function(){
					topFix.css("display","none");
				});
				sport.sport(xLogo[0],{"height" : 0},function(){
					xLogo.css("display","none");
				});
				sport.sport(xInp[0],{"height" : 0},function(){
					xInp.css("display","none");
				});
				sport.sport(xA[0],{"height" : 0},function(){
					xA.css("display","none");
				});
			}
			if(scrollTop > 300){
				topFix.css("display","block");
				xLogo.css("display","block");
				xInp.css("display","block");
				xA.css("display","block");
				sport.sport(topFix[0],{"height" : 50});
				sport.sport(xLogo[0],{"height" : 40});
				sport.sport(xInp[0],{"height" : 31});
				sport.sport(xA[0],{"height" : 33});
			}
		}
	})
})
