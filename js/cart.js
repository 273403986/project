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
		
		//添加获取购物车事件
		function get(){
			//取出在cookie中存的购物车信息
			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			var money = 0;
			//获取总价元素
			var goodPrice = 0;
			var ospan = $("#purchase .div2 p span").eq(1);
			if(!cartStr) {
					alert("你的购物车为空");
			} else {
				var cartObj = convertCartStrToObj(cartStr);
//					console.log(cartStr);
//					console.log(cartObj)
				//遍历所有的商品生成html添加到购物车列表中去
				for(var id in cartObj) {
					//商品信息对象
					var good = cartObj[id];
					var str = '<li data-good-id="' + id + '"><p><input class="check" type="checkbox" checked="checked"/><img src="' + good.src + '" alt="" /><a href="javascript:;">' + good.name + '</a><span>默认</span><span>默认</span></p><p><input type="button" class="sb" value="-"/><input class="txt" type="text" value="' + good.num + '"/><input   type="button" class="ad" value="+"/></p><p class="p3"><i>单价：</i><span>' + good.price + '</span><a href="javascript:;">删除</a><span>小计：</span><span>' + good.num * good.price + '</span></p></li>';
//						<li><p><input type="checkbox" checked="checked"/><img src="../images/buy1.jpg" alt="" /><a href="javascript:;">尚品宅配功能环保鞋柜（提货券）</a><span>默认</span><span>默认</span></p><p><input type="button" value="-"/><input type="text" class="txt" value="1"/><input type="button" value="+"/></p><p><span>599.0</span><a href="javascript:;">删除</a><span></span></p></li>
					//将上面的结构添加到ul中去
					$(str).appendTo("#purchase .div1 ul");
					//大总价
					goodPrice += good.num * good.price;
				}
				//给checkBox添加点击事件
				var check = $("#purchase .div1 ul li .check");
//				var flag = true;
//				check.click(function(){
//					$(this).attr("flag") = trfa();
//					//从cookie中将获取
//					var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
//					var cartObj = convertCartStrToObj(cartStr);
//					if($(this).attr("flag")){
//						//在页面上将商品信息删除，并获取该商品id
//						var id = $(this).parents("li").attr("data-good-id");
//						//更新页面上的小计
//						goodPrice -= Number(cartObj[id].num * cartObj[id].price + "");
//						loadCart();
//					}else{
//						//在页面上将商品信息
//						var id = $(this).parents("li").attr("data-good-id");
//						//更新页面上的小计
//						goodPrice += Number(cartObj[id].num * cartObj[id].price + "");
//					}
//					loadCart();
//				})
//				var flag = false;
//				function trfa(){
//					flag = !flag;
//					return flag;
//				}
				
				//给每个商品添加从购物车删除的事件
				//获取a按钮
				var a = $("#purchase .div1 ul li a");
				a.click(function(){
					var index = $(this).index();
					if(index % 2 == 0){
					//在页面上将商品信息删除，并获取该商品id
						var id = $(this).parents("li").remove().attr("data-good-id");
						//从cookie中将该商品删除
						var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
						var cartObj = convertCartStrToObj(cartStr);
						//更新页面上的小计
						goodPrice -= Number(cartObj[id].num * cartObj[id].price + "");
						delete cartObj[id];
						//将新商品信息放回cookie
						$.cookie('cart',JSON.stringify(convertObjToCartObj(cartObj)),{expires : 7,path : "/"});
						loadCart();
					}
				})
//				//给增加按钮添加事件
				var btn = $("#purchase .div1 ul li p .ad");
				btn.click(function(){
					var id = $(this).parents("li").attr("data-good-id");
					var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
					var cartObj = convertCartStrToObj(cartStr);
					goodPrice += Number(1 * cartObj[id].price);
					cartObj[id].num = Number(cartObj[id].num) + 1;
					//将页面上的数量加1
					$(this).parent().children("input").eq(1).val(cartObj[id].num);
					//更新页面上的总价
					money = Number(cartObj[id].num * cartObj[id].price);
					//更新页面上的小计
					$(this).parent().siblings(".p3").children("span").eq(2).text(money);
					//更新右边固定栏的内容
					$("#fix .div2 span").text(Number(cartObj[id].num));
					//将信息放回cookie
					$.cookie('cart',JSON.stringify(cartObj),{expires : 7,path : "/"});
					loadCart();
				})
				//给减按钮添加点击事件
				var btn2 = $("#purchase .div1 ul li p .sb");
				btn2.click(function(){
					var id = $(this).parents("li").attr("data-good-id");
					var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
					var cartObj = convertCartStrToObj(cartStr);
					if(cartObj[id].num > 1){//商品数量减少不能少于1
						goodPrice -= Number(1 * cartObj[id].price + "");
						cartObj[id].num = Number(cartObj[id].num) - 1;
						//将页面上的数量减1
						$(this).parent().children("input").eq(1).val(cartObj[id].num);
						//更新页面上的总价
						money = Number(cartObj[id].num * cartObj[id].price + "");
						//更新页面上的小计
						$(this).parent().siblings(".p3").children("span").eq(2).text(money);
						//更新右边固定栏的内容
						$("#fix .div2 span").text(Number(cartObj[id].num));
						//将信息放回cookie
						$.cookie('cart',JSON.stringify(cartObj),{expires : 7, path : "/"});
						loadCart();
					}else{
						alert("数量不能小于1");
					}
				})
				//改数量的input绑定一个blur事件
				var inp = $("#purchase .div1 ul li .txt");
				inp.blur(function(){
					var id = $(this).parents("li").attr("data-good-id");
					var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
					var cartObj = convertCartStrToObj(cartStr);
					//判断用输入是否合法
					var pattern = /^\d+$/;
					if(!pattern.test($(this).val())){
						//修改一下数量
						goodPrice -= Number((cartObj[id].num - 1) * cartObj[id].price + "");
						cartObj[id].num = 1;
						$(this).val("1");
						//更新页面上的总价
						money = Number(cartObj[id].num * cartObj[id].price + "");
						//更新页面上的小计
						$(this).parent().siblings(".p3").children("span").eq(2).text(money);
						//更新右边固定栏的内容
						$("#fix .div2 span").text(Number(cartObj[id].num));
						//将信息放回cookie
						$.cookie('cart',JSON.stringify(cartObj),{expires : 7,path : "/"});
						loadCart();
					}else{
						//修改一下数量
						if(parseInt($(this).val() > cartObj[id].num)){
							goodPrice += Number(($(this).val() - cartObj[id].num) * cartObj[id].price);
						}else if(parseInt($(this).val() == cartObj[id].num)){
							
						}else{
							goodPrice -= Number((cartObj[id].num - $(this).val()) * cartObj[id].price + "");
						}
						cartObj[id].num = parseInt($(this).val());
						//更新页面上的总价
						money = Number(cartObj[id].num * cartObj[id].price + "");
						//更新页面上的小计
						$(this).parent().siblings(".p3").children("span").eq(2).text(money);
						//更新右边固定栏的内容
						$("#fix .div2 span").text(Number(cartObj[id].num));
						//将信息放回cookie
						$.cookie('cart',JSON.stringify(cartObj),{expires : 7,path : "/"});
						loadCart();
					}
				})
			}
			
			function convertCartStrToObj(cartStr) {
				//如果是空字符串，即没有购物车信息，那么购物车为空，直接返回一个空对象
				if(!cartStr){
					return {};
				}
				if(cartStr){
					return JSON.parse(cartStr);
				}
			}
//{"1":{"name":"尚品宅配功能环保鞋柜（提货券）","price":"599","num":"3","src":"../images/detail5.jpg"},"2":{"name":"Nasala精品不锈钢锅具套组","price":"299","num":"3","src":"../images/pot1.jpg"}}
//2,Nasala精品不锈钢锅具套组,299,3,../images/pot1.jpg
			function convertObjToCartObj(obj) {
//				var cartStr = "{";
//				var count = 0;
				for(var id in obj) {
//					if(cartStr) {
//						cartStr += ":";
//					}
//					cartStr += id + "," + obj[id].name + "," + obj[id].price + "," + obj[id].num + "," + obj[id].src;
//					count ++;
//					if(count == 2){
//						cartStr += ",";
//					}
//					cartStr += '"' + id + '":{' + '"name":"' + obj[id].name + '","price":"' + obj[id].price + '","num":"' + obj[id].num + '","src":"' + obj[id].src + '"}';
					obj[id] = {
						"name" : obj[id].name,
						"price" : obj[id].price,
						"num" : obj[id].num,
						"src" : obj[id].src
					};
				}
//				cartStr += "}";
//				return cartStr;
				return obj;
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
				//更新页面上的大总价
				ospan.text(goodPrice);
				//更新页面上的总价
//				money += Number(cartObj[id].num * cartObj[id].price + "");
//				totalMoney.text(money);
				
			}
			new loadCart();
		}
		new get();
		
		window.onscroll = function(){
			//滚动客服中心
			new service();
		}
	})
})
