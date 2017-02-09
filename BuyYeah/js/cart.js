//将商品详情添加到购物车中

$(function() {

	//将存入的商品详情取出来
	var data = localStorage.getItem("goodsMess");
	//console.log(typeof(data)); //string
	//将字符串的json转化成数组对象
	var json_data = JSON.parse(data);
	//	console.log(json_data); //object
	//	console.log(typeof(json_data));
	//	console.log(json_data.length);
	//	    console.log(json_data[0].name);
	//	    console.log(json_data[0].size);
	//	     console.log(json_data[0].price);
	//	     console.log(json_data[0].Price);
	//	     console.log(json_data[0].num);

	//分别取出数据
	var name = json_data[0].name;
	var size = json_data[0].size;
	var price = json_data[0].price;
	var Price = json_data[0].Price;
	var num = json_data[0].num;
	
	//购物车数量相应变化
	$(".logo_right #add").html('('+num+')');

	//创建表格, 将取到的数据添加到表格中
	var tab = $("#tab");
	var tr = $("<tr></tr>");
	tab.append(tr);
	var td = $("<td></td>")
	td.html('<img src="../img/cart01.jpg" height="55" width="55"/>');
	tr.append(td);

	var td = $("<td></td>")
	td.html(name);
	tr.append(td);

	var td = $("<td></td>");
	td.html(size);
	tr.append(td);

	// 装柜价
	var td = $("<td></td>");
	td.html(price);
	tr.append(td);

	//便宜价格
	var td = $("<td></td>");
	td.html(Price);
	tr.append(td);

	//数量栏
	var td = $("<td></td>");
	var input = $("<input type=text size=5 />");
	input.val(num);
	td.append(input);
	tr.append(td);

	// 计算总价一栏
	var td = $("<td></td>");
	var price = Price.substring(1, 6);
	console.log(price);
	td.html('￥' + price * num + '.00' + '元');
	tr.append(td);

	//删除栏
	var td = $("<td></td>");
	td.html("<a class='remove' href='#' style='color:#0000FF;text-decoration:underline'>删除</a>");
	tr.append(td);

	// 计算总价
	var tr = $("#tab").find("tr").not("#th_list");
	console.log(tr);
	var input = $("#tab").find("input");
	  input.blur(function() {
			var td6 = $(this).parents("tr").find("td").eq(6);
			var str = $(this).parents("tr").find("td").eq(4).html();
			var price = str.substring(1, 6);
			var _val = $(this).val();
			//console.log(_val);
			td6.html("￥" + _val * price + ".00" + "元");
		})
	  
	  //删除商品
	 $(".remove").click(function() {
	 	var that=$(this);
	 	$(".tip").css("display","block");
	 	$("#mask").css("opacity",0.5);
	 	$(".btn").click(function(){
	 		var id=$(this).attr("id");
	 		if(id=="certain"){
	 			that.parents("tr").remove();
			   localStorage.clear();
			   $(".tip").css("display","none");
			   $("#mask").css("opacity",1);
	 		}else{
	 			  $(".tip").css("display","none");
	 			   $("#mask").css("opacity",1);
	 		}
	 	})
   })
	 
	 
})


