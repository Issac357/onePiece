console.log(location.search)
var goods_id = location.search
goods_id = parseInt(goods_id.substr(10))
console.log(goods_id)
$.get("http://h6.duchengjiu.top/shop/api_goods.php",{"goods_id":goods_id},function(obj){
	console.log(obj)
	$("title").html(obj.data[0].goods_name)
	
	$("#goods-left").append("<img src="+ obj.data[0].goods_thumb +" />")
	$("#goods-left img").css({"width":"100%","height":"100%"})
	$("#goods-right").append("<p>"+ obj.data[0].goods_name +"</p>")
	$("#goods-right").append("<p class='p1'>"+ obj.data[0].goods_desc +"</p>")
	$("#goods-right").append("<a class='btn btn-primary cart-btn' goods_id='"+ obj.data[0].goods_id +"' >加入购物车</a>")
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
		
		
		
		
		
			var sDiv = document.getElementById("sDiv")
			var bDiv = document.getElementById("bDiv")
			
			bDiv.style.background = "url("+obj.data[0].goods_thumb+") no-repeat"
			bDiv.style.backgroundSize = "810px 900px"
			var oDiv = document.getElementById("goods-left")
			var oDivLeft = parseInt($("#goods-left").offset().left)
			var oDivTop = parseInt($("#goods-left").offset().top)
			var oDivWidth = parseInt(oDiv.offsetWidth)
			var oDivHeight = parseInt(oDiv.offsetHeight)
		
			oDiv.onmouseenter = function(){
				sDiv.style.display = "block"
				bDiv.style.display = "block"
				var sDivWidth = parseInt(sDiv.offsetWidth)
				var sDivHeight = parseInt(sDiv.offsetHeight)
				oDiv.onmousemove= function(e){
					if (e.clientX-oDivLeft-sDivWidth/2<0) {
						sDiv.style.left = 0 +"px"
						bDiv.style.backgroundPositionX = 0 +"px" 
					}else if (e.clientX-oDivLeft-sDivWidth/2>oDivWidth-sDivWidth) {
						sDiv.style.left = oDivWidth-sDivWidth +"px"
						bDiv.style.backgroundPositionX = -(oDivWidth-sDivWidth)*1.7+"px" 
					}else{
						sDiv.style.left = e.clientX-oDivLeft-sDivWidth/2+"px"
						bDiv.style.backgroundPositionX = -(e.clientX-oDivLeft-sDivWidth/2) * 1.7 +"px"
					}
					
					if (e.clientY-oDivTop-sDivHeight/2<0) {
						sDiv.style.top = 0 +"px"
						bDiv.style.backgroundPositionY = 0 +"px" 
					}else if(e.clientY-oDivTop-sDivHeight/2>oDivHeight-sDivHeight){
						sDiv.style.top = oDivHeight-sDivHeight +"px"
						bDiv.style.backgroundPositionY = -(oDivHeight-sDivHeight)*1.7 +"px" 
					}else{
						sDiv.style.top = e.clientY-oDivTop-sDivHeight/2+"px"
						bDiv.style.backgroundPositionY =  -(e.clientY-oDivTop-sDivHeight/2) * 1.7+ "px"
					}	
					console.log(oDivTop,oDivLeft)
				}
				
				oDiv.onmouseleave = function(){
					sDiv.style.display = "none"
					bDiv.style.display = "none"
				}
			
			}
			
		
	
	

})



