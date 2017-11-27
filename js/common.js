//搜索
			$("#btn-search").click(function(){
				var str = $("#btn-value").val()
				window.location.href = "goods_search.html?search="+str
			})
			
			$("#btn-value").focus(function(){
				$(this).keydown(function(e){
					console.log(e)
					if(e.keyCode==13){
						var str = $("#btn-value").val()
						
						window.location.href = "goods_search.html?search="+str
						
					}else{
						return
					}
				})
			})


//返回顶部
//back
			$(".back").click(function(){
				$("body,html").animate({scrollTop:0},function(){
					$(".header-s").animate({"top":0},100)
				})
			})
			
			$(document).scroll(function(){
				var top = $(document).scrollTop()				
				if(top>500){
					$(".back").fadeIn()
				}else{
					$(".back").fadeOut()	
				}
			})
			
	//获取导航部分商品分类
	$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(obj){
		console.log(obj)
		var arr = obj.data
		var h = ""
		for(var i = 0;i<arr.length;i++){
			h+='<li><a href="goods_class.html?cat_id='+ arr[i].cat_id +'&cat_name='+ arr[i].cat_name +'">'+arr[i].cat_name+'</a></li>'
		}
		$("#goods_class").html(h)
		
	})
	
//获取本地的token
if( localStorage.getItem("token") ){
	var token = localStorage.getItem("token")
	var username = localStorage.getItem("username")
	console.log(username)
	$(".login").html("<a href='javascript:'>"+ username +"</a>")
	$(".register").html("<a class='cancel' href='#'>注销</a>")
	$(".cancel").click(function(){
		localStorage.clear()
		window.location.href = "index.html"
	})
	
	showCart()
	
}
$("#nav-cart-updata").click(function(){
	if( !localStorage.getItem("token") ){
		return
	}
	showCart()
})


function showCart(){
	$.get("http://h6.duchengjiu.top/shop/api_cart.php?token="+token,function(obj){
		var arr = obj.data
		console.log(obj)
		var h =""
		if (obj.message=="购物车数据为空") {
			$(".cart-mess").html("<li><a>购物车空空如也</a></li>")
		} else{
			
		
		for(var i = 0 ; i<arr.length;i++){
			
			
			h+='<li><a href="cart.html?goods_id='+ arr[i].goods_id +'"><img src="'+ arr[i].goods_thumb +'"/><span>'+ arr[i].goods_name +'<sub style="color:#ff4400">x'+ arr[i].goods_number +'</sub></span></a></li>'
		}
		
		$(".cart-mess").html(h)
		$(".cart-mess").css({"height":250,"overflow-y":"scroll"})
		$(".cart-mess img").css("width",50)
		
		}
	})
}

//键盘事件
$(document).keydown(function(){
	$("#btn-value").focus()
})


