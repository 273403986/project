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
		
		//获取图片和其内容并添加到show 下面的div3下div31下的 ul 中
		function load(){
			$.ajax({
				url : "../JSON/images.json",
				success : function(data){
//					$("#show .div3 .div31 ul").html(data);
					var ul = $("#show .div3 .div31 ul");
					for(var i in data){
						var li = $("<li></li>");
						var img = $("<img src='" + data[i] + "'/>");
						li.append(img);
						var p = $('<p><span>¥599</span><a href="javascript:;">尚品宅配功能环保鞋柜（提货券）</a></p>');
						li.append(p);
						ul.append(li);
//						<li><img src="../images/sub1.jpg" alt="" /><p><span>¥599</span><a href="javscript:;">尚品宅配功能环保鞋柜（提货券）</a></p></li>
					}
					//修改页面上#show 下 div2下 div22 下 div221下 的第二个span标签内容
					var span = $("#show .div2 .div22 .div221 span")[1];
					$(span).text(data.length);
					
					//点击图片或者a下面最近浏览会出现记录，数量大于5时删除
					function record(){
						//获取img
						var img = $("#show .div3 .div31 ul li img");
						//获取按钮a
						var oa = $("#show .div3 .div31 ul li p a");
						//获取show 下 div5 下 ul
						var ul5 = $("#show .div5 .div52 ul");
						var num = 0;
						var num1 = 0;
						//点击img事件跳转到详情页
						img.click(function(){
							var index = $(this).index("img");
							var li5 = $(this).parent().clone();
							if(num == 0){
								ul5.prepend(li5);
							}
							num ++;
							//获取ul5下面li的个数
							var ulli = $("#show .div5 .div52 ul li");
							//获取img的路径进行对比，如果相同则不添加
							var ulimg = $("#show .div5 .div52 ul li img");
							var flag = true;
							for(var j = 0; j < ulli.length;j ++){
								if($(this).attr("src").replace(/[^0-9]/ig,"") == $(ulimg[j]).attr("src").replace(/[^0-9]/ig,"")){
									flag = false;
									break;
								}
							}
							if(flag){
								ul5.prepend(li5);
							}
							if(ulli.length > 5){
								//删除最后一个li
								ulli[4].remove();
							}
							if(index == 1){
								window.open("../html/datail.html");
							}else if(index == 2){
								window.open("../html/detail2.html");
							}else if(index == 3){
								window.open("../html/detail3.html");
							}else{
								window.open("../html/datail.html");
							}
						})
					}
					new record();
				}
			})
		}
		new load();
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
		}
	})
})