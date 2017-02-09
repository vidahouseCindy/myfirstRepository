		
		$(document).ready(function() {
			function check() {
				var $input = $(".right").find("input");
				//console.log($input);
		
				//检测用户名的提示
				$input.eq(0).focus(function() {
					$(this).siblings("p").html("-请输入用户名");
				})
		
				$input.eq(0).blur(function() {
						var _val = $(this).val();
						//console.log(_val.length);
						if (_val.length >= 1 && _val.length < 2) {
		
							$(this).siblings("p").html("-用户名长度不能少于2个字符");
						} else if (!/^[u2E80-\u9FFF|\w]+$/.test(_val) && _val.length != 0) {
							$(this).siblings("p").html("-不能有特殊字符");
						} else if (_val.length == 0) {
							$(this).siblings("p").html("-请输入用户名");
						} else {
							$(this).siblings("p").html("");
							
						}
					})
				
					//邮箱提示
				$input.eq(1).focus(function() {
					$(this).siblings("p").html("-请输入邮箱");
				})
				$input.eq(1).blur(function() {
						var _val = $(this).val();
						if (!/^\w+@\w+(\.\w+)+$/.test(_val) && _val.length != 0) {
							$input.eq(1).siblings("p").html("邮件地址格式不合法");
						} else if (_val.length == 0) {
							$input.eq(1).siblings("p").html("-请输入邮箱");
						} else {
							$(this).siblings("p").html("");
						}
					})
				
					//密码提示
				$input.eq(2).focus(function() {
					$(this).siblings("p").html("-请输入密码");
				})
				$input.eq(2).blur(function() {
					var _val = $(this).val();
					if (!/^[\w-]{6,}$/.test(_val) && _val.length != 0) {
						$input.eq(2).siblings("p").html("密码不少于6位");
					} else if (_val.length == 0) {
						$input.eq(2).siblings("p").html("-请输入密码");
					} else {
						$(this).siblings("p").html("");
					}
				})
		
				// 确认密码提示
				$input.eq(3).focus(function() {
					$(this).siblings("p").html("-请再次输入密码");
				})
				$input.eq(3).blur(function() {
					var $psw = $("#psw").val();
					var $sure = $("#sure").val();
					//console.log($psw);
					//console.log($sure);
					if ($sure != $psw) {
						$input.eq(3).siblings("p").html("密码不一致");
					} else if ($sure.length == 0) {
						$(this).siblings("p").html("-请再次输入密码");
					} else {
						$(this).siblings("p").html("");
					}
				})
				return true;
			}
			
			check();
			
		   var id = $("#user").val(),
				name = $("#email").val(),
				pass = $("#psw").val(),
				surepsw = $("#sure").val();
		//	   console.log(id);
		//	   console.log(name);
		
		  // 检测是否注册
		  
			$(".sub").click(function() {
				var id = $("#user").val(),
				name = $("#email").val(),
				pass = $("#psw").val(),
				surepsw = $("#sure").val();
				if (check()) {
					$.post("/api/users/add", {
						id: id,
						pass: pass,
						name: name,
						age: surepsw
					}, function(result) {
						console.log(result.err)
						if (result.err == 101) {
							alert("该用户名已经注册,换一个试试")
						} else {
							alert("您已注册成功,登录属于你的买Yeah吧！！")
							window.location.href = "enter_success.html";
						}
					})
				}
		   })
		})