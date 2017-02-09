		
		// JavaScript Document
		//检测是否登录
		
		$(function(){
			$.post("/api/users/check_login_state",{},
				function(result){
					//console.log(result);
					//console.log(result.data.name);
					if (result.err == 0) {
					$("#hello").html('您好!'+ result.data.name );
					$("#a1").html("退出");
					$("#clear").html("|");
					$("#a2").html("我的订单");
					}
			});
		})
		
		
		  //检测是否退出
			$(function(){
				$("#a1").click(function(){
					$.post("/api/users/logout",{},
					function(result){
						if(result.err == 0){
						$("#hello").html("欢迎光临香港.买Yeah网!" );
						$("#a1").html("登录");
						$("#a2").html("注册");
						}
				 })
			  })
		})
			
		
		// 购物车出现
		$(document).ready(function() {
			var $cart_index = $(".logo_right").find("p");
			//console.log( $cart_index);
			$cart_index.mouseover(function() {
				var $cart = $(".cart");
				$(".cart").show();
			})
			$(".cart").hover(function() {
				$(".cart").show();
			}, function() {
				$(".cart").hide();
			})
		})
		
		//滚动，左边固定导航出现及右边栏出现
		 $(document).ready(function() {
			$(document).scroll(function() {
				var this_top = $(this).scrollTop();
				if (this_top > 50) {
					$(".fixed_nav").fadeIn();
					$(".scroll_right").fadeIn();
				} else {
					$(".fixed_nav").fadeOut();
					$(".fixed_nav").fadeOut();
				}
			 })
			
			//划入左边栏的事件
			var $fixed_nav = $(".fixed_nav").find("dl");
			//console.log($fixed_nav);
			$fixed_nav.mouseover(function() {
				$(this).siblings("dl").css("background", "white").css("color", "black");
				$(this).css("background", "black").css("color", "white");
			})
		 })
		
		//划入 滚动出现右边栏的事件
		$(function(){
			var scroll_li=$(".scroll_right").find("li");
			scroll_li.hover(function(){
				$(this).siblings().find("span").css("display","none");
				$(this).children("span").css("display","block");
				},function(){
					$(this).find("span").css("display","none");
				})
		})
		
		
		//回到顶部
		$(function(){
			$("#gotoTop").click(function(){
				$("body,html").animate(
					{scrollTop:0,
					  speed:300
					})
				})
		})
		
		
		
		//导航栏右边部分的划入划出
		$(document).ready(function(){
			var arr=["正品保证","免关税","香港直邮"];
			var $new_span=$(".nav .right").find("li");
			//console.log($new_span);
			$new_span.hover(function(){
				var $index=$(this).index();
				var span=$('<span></span>');
				span.html(arr[$index]);
			   span.css("color","white").css("margin-top","-16px").css("margin-left","5px");
				 $(this).append(span);
		    },function(){
				$(this).find("span").remove();
			})
		})
		
		
		//banner图左边导航,划入出现列表，划出消失
		$(document).ready(function() {
			var li_list = $(".index_left ul").find("li").not(".last");
			
			$(li_list).hover(function(){
				$(this).css("background", "white");
				var $index = $(this).index();
				$(".index_list div").eq($index).show();
			}, function() {
				var $index = $(this).index();
				$(".index_list div").eq($index).hide();
				$(this).css("background", "#f3f5f4");
			})
		
			$(".index_list div").hover(function() {
				$(this).show();
			}, function() {
				$(this).hide();
			})
		})
		
		  // 轮播
		$(document).ready(function() {
			var index = 0;
			var imgs = $(".banner #img_show").find("li");
			var img_index = $(".index_icon a");
			var duration = 1000;
			var timer = null;
		
		 //划入圆点切换图片，停止轮播，划出圆点继续轮播
			for (var i = 0; i < img_index.length; i++) {
				(function(current) {
					$(img_index[i]).hover(function() {
						if (timer) {
							clearInterval(timer);
						}
						img_index.removeClass("active");
						$(this).addClass("active");
						index = current;
						$(imgs).hide();
						$(imgs[index]).show();
					}, function() {
						timer = setInterval(show, 3000);
					})
				})(i)
			}
			
		//图片自动出现消失
			timer = setInterval(show, 3000);
		   function show() {
				$(imgs[index]).fadeOut(duration / 2, function() {
					$(img_index[index]).removeClass("active");
					index++;
					if (index > 2) {
						index = 0;
					}
				})
				var nextIdx = index + 1;
				if (nextIdx > 2) {
					nextIdx = 0;
				}
				// console.log(nextIdx);
				$(imgs[nextIdx]).fadeIn(duration / 2, function() {
					$(img_index[nextIdx]).addClass("active");
				})
			}
		
			//滑到图片，透明度变化，轮播停止
			imgs.hover(function() {
					if (timer) {
						clearInterval(timer);
					}
					$(this).animate({
						"opacity": 0.5
					})
				},
				function() {
					$(this).animate({
						"opacity": 1.0
					});
					timer = setInterval(show, 3000);
				})
			})
		
		
		//content_top图片的划入划出事件
			$(document).ready(function(){
				$(".content_top").find("img").hover(function(){
					$(this).animate({
							"opacity": 0.6
						})
					},function(){
					$(this).animate({
							"opacity": 1.0
						})
					})
			})
		
		// 点击按钮，下期商品出现，再点击，关闭
			$(document).ready(function() {
			    var $open = $(".open_tip").find("p");
				var clickNum = 0;
				//console.log( $open);
				$open.click(function() {
					clickNum++;
					if (clickNum % 2 == 1) {
						$(".open").html("关闭下期预告");
						$(".expect_content ").show();
					} else {
						$(".open").html("查看下期预告");
						$(".expect_content ").hide();
					}
				})
			
			})
		
		//热门品牌的导航划入事件
			$(document).ready(function() {
				var $span_list = $(".hot_bands .span_list").find("span");
				//console.log($span_list);
				$span_list.mouseover(function() {
					var $index = $(this).index();
					$(".detail_img").css("display", "none");
					$(".detail_img").eq($index).css("display", "block");
				})
			})
			
			//美妆的导航划入事件
			$(document).ready(function() {
				var $span_list = $(".top_mz .span_list").find("span");
				//console.log($span_list);
				$span_list.mouseover(function() {
					var $index = $(this).index();
					$(".detail_content").css("display", "none");
					$(".detail_content").eq($index).css("display", "block");
				})
			})
			
			
			//热门品牌每张图片划入划出事件
			$(document).ready(function(){
				var $img_list=$(".hot_bands").find("img").not("#icon");
				//console.log($img_list);
				$img_list.hover(function(){
					$(this).animate({
						"opacity":0.6
					})
				},function(){
					$(this).animate({
						"opacity":1.0,
						})
			      })
			})
			
			
			//人气推荐每张图片划入划出事件
			$(document).ready(function(){
				var $img_list=$(".recommend").find("img");
				//console.log($img_list);
				$img_list.hover(function(){
					$(this).animate({
						"opacity":0.7
					})
				},function(){
					$(this).animate({
						"opacity":1.0,
						})
			      })
			})
			
			//时尚资讯图标的划入划出事件
			$(document).ready(function(){
				var icon_list=$(".fashion_news .middle").find("img");
				//console.log(icon_list);
				icon_list.hover(function(){
					$index=$(this).index();
					//console.log($index);
					var $next=$(this).parent().next("div").find("img");
					console.log($next);
					$next.css("paddingTop","5px");
					},function(){
					$(this).parent().next("div").find("img").css("paddingTop",0);	
				})
			})
			
			
		
		
		
		
		
		
		
		
		
		
		
		
