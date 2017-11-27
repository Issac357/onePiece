
	var str = location.search
	
	str=str.substr(1)
	str=decodeURI(str)

	var arr = str.split("&")
	var arr1 = arr[0].split("=")
	var arr2 = arr[1].split("=")
	console.log(arr1[1])
	$("#nav-hot-a").html(arr2[1])
	$("title").html(arr2[1])
	var page = 1
	var maxPage = 0
	showShop(page)
	
	function showShop(page){
		var url = "http://h6.duchengjiu.top/shop/api_goods.php"
		var data = {"cat_id":arr1[1],"page":page,"pagesize":8}
		$.get(url,data,function(obj){
			console.log(obj)
			maxPage = obj.page.page_count
//			$(".paging-ul").css("width",maxPage*50)
			var arr = obj.data
			var h = ""
			for(var i = 0;i<arr.length;i++){
//				$(".goods").append('<div class="col-sm-6 col-md-4 col-lg-3"><div class="thumbnail goods_img"><img class="" src="'+arr[i].goods_thumb+'" alt="..."><div class="caption"><h3 class="h3-nowrap">'+ arr[i].goods_name +'</h3><p>￥'+ arr[i].price +'</p><p><a href="goods.html?goods_id='+ arr[i].goods_id +'" class="btn btn-primary" role="button">购买</a><a href="#" class="btn-shop btn btn-primary" role="button">加入购物车</a></p> </div></div></div>')       
				h+='<div class="col-sm-6 col-md-4 col-lg-3"><div class="thumbnail goods_img"><img src="'+arr[i].goods_thumb+'" alt="..."><div class="caption"><h3 class="h3-nowrap">'+ arr[i].goods_name +'</h3><p>￥'+ arr[i].price +'</p><p><a href="goods.html?goods_id='+ arr[i].goods_id +'" class="btn btn-primary" role="button">购买</a><a href="#" class="btn-shop btn btn-primary  cart-btn" role="button">加入购物车</a></p> </div></div></div>'
			}
			
			$(".goods").html(h)
//			var w = $(".goods img").eq(0).width()
//			var h = $(".goods img").eq(0).height()
//			$(".goods img").css({"width":w,"height":h})
//		console.log(w,h)
		
		
			//分页
			
			for(var j=0;j<obj.page.page_count;j++){
				if(j==page-1){
					console.log(j)
					$(".paging-ul").append($('<li class="paging paging-color"><a href="javascript:">'+(j+1)+'</a></li>'))
					continue
				}
				$(".paging-ul").append($('<li class="paging"><a href="javascript:">'+(j+1)+'</a></li>'))	
			}
			
			
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

		})
	}
	
			

	
			$(".paging-ul").click(function(event){
				event = event || window.event;
				var target = event.target || event.srcElement;
				console.log(target.nodeName)
				if( target.nodeName == "A" ){
					
					page = target.innerText
					console.log(page)
					$(".goods").html("");
					$(".paging-ul").html('');
					showShop(page);

					
				}
				
				
				
			})
		

	