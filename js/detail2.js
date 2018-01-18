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
	$(function(){
		//代码
		//鼠标移入移出top 服务中心
		public1.over("top","div2","../");
		
		//右边固定栏
		public1.fixS("../");
		
		//获取cookie登录信息
		public1.lg();
		
		//给右边固定栏添加立即登录事件
		public1.lg2();
		
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
				obj.getElementsByTagName("img")[0].src = "../images/panel_open2.png";
			}
			obj.onmouseout = function(){
				obj.getElementsByTagName("img")[0].src = "../images/panel_open.png";
			}
			obj.onclick = function(){
				ele.style.display = "block";
				ele.style.top = obj.offsetTop + "px";
				obj.style.display = "none";
			}
			sport.sport(ele,{"top" : scrollTop});
			eleImg.onmouseover = function(){
				eleImg.src = "../images/panel_close2.png";
			}
			eleImg.onmouseout = function(){
				eleImg.src = "../images/panel_close.png";
			}
			eleImg.onclick = function(){
				ele.style.display = "none";
				obj.style.display = "block";
			}
		}
		new service();
		
		//给右侧固定栏div添加返回顶部事件
		public1.fix();
		
		//获取图片和其内容并添加到buy 下面的div1下ul 中
		function load(){
			$.ajax({
				url : "../JSON/detail.json",
				success : function(data){
//					$("#buy .div1 ul").html(data);
					var ul = $("#buy .div1 ul");
//					$("#recommend .div1 .div2 ul");
					var ul2 = $("#recommend .div1 .div11 ul");
					for(var i in data){
						var li = $("<li></li>");
						var img = $("<img src='" + data[i] + "'/>");
						li.append(img);
						var p = $('<p>（搭售）联合邦利健康关爱组</p><p><span>￥</span><span>69</span></p>');
						li.append(p);
						ul.append(li);
//						<li><img src="../images/buy1.jpg" alt="" /><p>（搭售）联合邦利健康关爱组</p><p><span>￥</span><span>69</span></p></li>
						var li2 = $('<li><p><img src="' + data[i] + '" alt="" /></p><a href="#">（搭售）联合邦利健康关爱组</a><i>￥69</i></li>');
						ul2.append(li2);
//						<li><p><img src="../images/buy1.jpg" alt="" /></p><a href="#">（搭售）联合邦利健康关爱组</a><i>￥69</i></li>
					}
					
					//给recommend添加事件
					function recommend(){
						//点击左右按钮
						var oa = $("#recommend .div2 a");
						//大盒子
						var ul = $("#recommend .div1 .div11 ul")[0];
						//每一个li
						var li = $("#recommend .div1 .div11 ul li");
						var nowIndex = 5;
						//给左右按钮添加点击事件
						oa.click(function(){
							var index = $(this).index();
							if(index == 0){
								nowIndex = nowIndex - 5;
								if(nowIndex <= 0){
									nowIndex = li.length + 5;
								}
								init(ul,nowIndex,li);
							}
							if(index == 1){
								nowIndex = nowIndex + 5;
								if(nowIndex >= li.length + 5){
									nowIndex = 0;
								}
								init(ul,nowIndex,li);
							}
						})
						function init(oObj,num,oEle){
							if(num == 0){
								sport.sport(oObj,{"left" : 0});
							}else if(num >= oEle.length + 5){
								sport.sport(oObj,{"left" : - (oEle[0].offsetWidth * (oEle.length - 5) + 6 * (num -10))});
							}else{
								sport.sport(oObj,{"left" : - (oEle[0].offsetWidth * (num-5) + 6 * (num -5))});
							}
						}
					}
					new recommend();
				}
			})
		}
		new load();
		
		//放大镜及移入移出切换大图
		public1.large("../images/pot1.jpg","../images/pot2.jpg","../images/pot3.jpg","../images/pot4.jpg","../images/pot5.jpg");
		
		//给下面商品参数，详情点击添加事件
		public1.click();
		
		//添加购物车事件
		public1.add();
		
		window.onscroll = function(){
			//滚动客服中心
			new service();
		}
	})
})
