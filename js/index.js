var page = 1
showShop(page);

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
			
			
			h+='<li><a href="goods.html?goods_id='+ arr[i].goods_id +'"><img src="'+ arr[i].goods_thumb +'"/><span>'+ arr[i].goods_name +'<sub style="color:#ff4400">x'+ arr[i].goods_number +'</sub></span></a></li>'
		}
		
		$(".cart-mess").html(h)
		$(".cart-mess").css({"height":250,"overflow-y":"scroll"})
		$(".cart-mess img").css("width",50)
		
		}
	})
}



//console.log(token)
function showShop(page){
	var url = "http://h6.duchengjiu.top/shop/api_goods.php"
	var data = {"page":page,"pagesize":8}
	$.get(url,data,function(obj){
		console.log(obj)
		var arr = obj.data
//		var h = ""
		for(var i = 0;i<arr.length;i++){
			$(".goods").append('<div class="col-sm-6 col-md-4 col-lg-3"><div class="thumbnail goods_img"><img class="" src="'+arr[i].goods_thumb+'" alt="..."><div class="caption"><h3 class="h3-nowrap">'+ arr[i].goods_name +'</h3><p>￥'+ arr[i].price +'</p><p><a href="goods.html?goods_id='+ arr[i].goods_id +'" class="btn btn-primary" role="button">购买</a><a href="javascript:" class="btn-shop btn btn-primary cart-btn" goods_id="'+ arr[i].goods_id +'" role="button">加入购物车</a></p> </div></div></div>')       
//			h+='<div  class="col-sm-6 col-md-4 col-lg-3"><a href="#" class="thumbnail"><img style="width:100%;" src="'+arr[i].goods_thumb+'" /></a></div>'
		}
		var w = $(".goods img").eq(0).width()
		var h = $(".goods img").eq(0).height()
//		console.log(w,h)
		$(".goods img").css({"width":w,"height":h})
		$(".cart-btn").unbind("click")
		$(".cart-btn").click(function(e){
			e.preventDefault()
			var goods_id = $(this).attr("goods_id")
			console.log(goods_id)
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
//		$(".goods").html(h)
	
		lock = true;
		
	})
	}

	
			var lock = true;
			//窗口的卷动事件监听，一定要函数截流，因为这个事儿很“敏感”
			$(window).scroll(function(){

				//函数截流
				if(!lock) return;
				
				var A = $(window).scrollTop();
				var B = $(window).height();
				var C = $(document).height();
				
				var rate = A / ( C - B );

				if(rate >= 0.7){
					page++;
					showShop(page);
					lock = false;
				}
			})
			

			
			
