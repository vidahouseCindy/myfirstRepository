	
	//检测登录
	
	$(function(){
		$("#login_btn").click(function(){
			   var name =  $("#user_name").val(),
				pass = $("#password").val();
				//console.log(name);
				//console.log(pass);
		$.post("/api/users/login",{name:name,pass:pass},
				function(result){
	                   if(result.err == 0){
					  // console.log(result.err);
					  // console.log(name);
					   window.location.href = "../html/welcome.html";
					 }
					if(result.err == 400){
						alert("用户名或密码错误,请重新输入!!");
						$("#user_name").val("");
						$("#password").val("");
					 }
			});
		});
	   });
