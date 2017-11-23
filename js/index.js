var page = 1
showShop(page);
function showShop(page){
	var url = "http://h6.duchengjiu.top/shop/api_goods.php"
	var data = {"page":page,"pagesize":8}
	$.get(url,data,function(obj){
		console.log(obj)
		var arr = obj.data
//		var h = ""
		for(var i = 0;i<arr.length;i++){
			$(".goods").append('<div class="col-sm-6 col-md-4 col-lg-3"><div class="thumbnail goods_img"><img class="" src="'+arr[i].goods_thumb+'" alt="..."><div class="caption"><h3 class="h3-nowrap">'+ arr[i].goods_name +'</h3><p>￥'+ arr[i].price +'</p><p><a href="goods.html?goods_id='+ arr[i].goods_id +'" class="btn btn-primary" role="button">购买</a><a href="#" class="btn-shop btn btn-primary" role="button">加入购物车</a></p> </div></div></div>')       
//			h+='<div  class="col-sm-6 col-md-4 col-lg-3"><a href="#" class="thumbnail"><img style="width:100%;" src="'+arr[i].goods_thumb+'" /></a></div>'
		}
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
			

			
			
