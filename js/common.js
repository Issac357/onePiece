//搜索
			$("#btn-search").click(function(){
				var str = $("#btn-value").val()
				window.location.href = "goods_search.html?search="+str
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
	
