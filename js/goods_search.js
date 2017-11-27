var str = location.search
	
	str=str.substr(8)
	str=decodeURI(str)
	
	console.log(str)
	$("#nav-hot-a").html(str)
	$("title").html(str)
	var page = 1
	var lock = true;
	showShop(page);
	function showShop(page){
		var url = "http://h6.duchengjiu.top/shop/api_goods.php"
		var data = {"search_text":str,"page":page,"pagesize":8}
		$.get(url,data,function(obj){
			
			console.log(obj)
			if(obj.message=="商品搜索数据为空"&&page==1){
				$(".goods").html("<h1>搜索物品不存在</h1>")
				return
			}
			
			var arr = obj.data
//			var h = ""

			for(var i = 0;i<arr.length;i++){
				$(".goods").append('<div class="col-sm-6 col-md-4 col-lg-3"><div class="thumbnail goods_img"><a href="goods.html?goods_id='+ arr[i].goods_id +'"><img class="" src="'+arr[i].goods_thumb+'" alt="..."></a><div class="caption"><h3 class="h3-nowrap">'+ arr[i].goods_name +'</h3><p>￥'+ arr[i].price +'</p><p><a href="goods.html?goods_id='+ arr[i].goods_id +'" class="btn btn-primary" role="button">购买</a><a href="javascript:" class="btn-shop btn btn-primary cart-btn" goods_id="'+ arr[i].goods_id +'" role="button">加入购物车</a></p> </div></div></div>')       
			//			h+='<div  class="col-sm-6 col-md-4 col-lg-3"><a href="#" class="thumbnail"><img style="width:100%;" src="'+arr[i].goods_thumb+'" /></a></div>'
			}
//				var w = $(".goods img").eq(0).width()
//				var h = $(".goods img").eq(0).height()
//				console.log(w,h)
//				$(".goods img").css({"width":w,"height":h})
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
			
			
			
			
			lock = true;
		})
	}
	
	
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
	