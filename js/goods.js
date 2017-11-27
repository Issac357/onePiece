console.log(location.search)
var goods_id = location.search
goods_id = parseInt(goods_id.substr(10))
console.log(goods_id)
$.get("http://h6.duchengjiu.top/shop/api_goods.php",{"goods_id":goods_id},function(obj){
	console.log(obj)
	$("title").html(obj.data[0].goods_name)
	
	$("#goods-left").html("<img src="+ obj.data[0].goods_thumb +" />")
	$("#goods-left img").css({"width":"100%","height":"100%"})
	$("#goods-right").append("<p>"+ obj.data[0].goods_name +"</p>")
	$("#goods-right").append("<p class='p1'>"+ obj.data[0].goods_desc +"</p>")
	$("#goods-right").append("<a class='btn btn-primary'>购买</a><a class='btn btn-primary cart-btn'>加入购物车</a>")
	
		$(".cart-btn").click(function(e){
			e.preventDefault()
//			var goods_id = $(this).attr("goods_id")
//			console.log(goods_id)
			$.get("http://h6.duchengjiu.top/shop/api_cart.php?token="+token,function(obj){
				console.log(obj)
				var number = 0
				if(obj.code===1002){
					alert("登录失效请重新登录")
					window.location.href="login.html?goods_id="+goods_id;
				}else{
					if(obj.data.length===0){
						number+=1
						$.post("http://h6.duchengjiu.top/shop/api_cart.php?token="+token,{"goods_id":goods_id,"number":number},function(obj){
							console.log(1,obj)
							if(obj.code===0){
									alert("添加购物车成功")
							}
						})
					}else{
						var arr = obj.data
						//计数器
						var num = 0
						for(var i = 0;i<arr.length;i++){
							if(goods_id == arr[i].goods_id){
								number = parseInt(arr[i].goods_number)+1
								$.post("http://h6.duchengjiu.top/shop/api_cart.php?token="+token,{"goods_id":goods_id,"number":number},function(obj){
									console.log(2,obj)
									if(obj.code===0){
									alert("添加购物车成功")
									}
								})
							}else{
								num++
								
							}
							
						}
						
						if(num==arr.length){
							number+=1
							$.post("http://h6.duchengjiu.top/shop/api_cart.php?token="+token,{"goods_id":goods_id,"number":number},function(obj){
								console.log(3,obj,number)
								if(obj.code===0){
									alert("添加购物车成功")
								}
							})
						}
					}
				}
				
			})
			
			
		})
		
})