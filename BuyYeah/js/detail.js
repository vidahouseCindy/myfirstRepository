

//改变购买数量，显示相应的价格
$(function() {
	$("#count input").blur(function() {
		//获取价格
		var this_price = $("#this_price").text();
		//获取数量输入框的内容
		var _val = $("#count input").val();
		//alert();
		//console.log(this_price);
		if (_val > 1) {
			$(this).siblings("i").css("display", "block");
			$(this).siblings("i").html("商品总价：" + "￥" + this_price * _val).css("color", "#fe9900").css("font-size", "18px");
			$(this).siblings("strong").css("display", "block");
		} else {
			$("#count input").val(1);
			$(this).siblings("i").css("display", "none");
			$(this).siblings("strong").css("display", "none");
		}
	})
	

  //获取商品的名称、规格、价格、数量等
	function cart(){
		$(".add_cart").find("img").click(function() {
		var goods_name = $(".right_detail").find("h2").text();
		var goods_size = $("#size").text();
		var goods_price = $("em span").text();
		var Yeah_price = $(".price").children("span").text();
		var goods_num =parseInt($("#count input").val() );
		console.log(goods_num);
		
		var lst=localStorage['goodsMess'];
			if(lst){
				lst=JSON.parse(lst);
			}else{
				lst=[];
			}
			var item=null;
			for(var i=0;i<lst.length;i++){
				var t=lst[i];
				if(t.name==goods_name);
				item=t;
				break;
			}
			if(item){
				item.num+=goods_num;
			}else{
				lst.push({
					"name": goods_name,
					"size": goods_size,
					"price": goods_price,
					"Price": Yeah_price,
					"num": goods_num
				})
			}
		
//		console.log(goods_num);
//	    var arr = [{
//				"name": goods_name,
//				"size": goods_size,
//				"price": goods_price,
//				"Price": Yeah_price,
//				"num": goods_num
//			}];
//			console.log(arr); //object
        //JSON.stringify:将json对象转化成字符串
		var Data = JSON.stringify(lst);
		console.log(Data);
		console.log(typeof(Data)) //string
			//console.log(typeof(Data) );
			//将Data存入服务器中，localStorage.setItem不能存对象，能存字符串
		   localStorage.setItem("goodsMess", Data);
		})
    }
	cart();
})
	
	