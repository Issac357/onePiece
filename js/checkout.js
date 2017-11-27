
	
	var str = location.search
	str = str.substr(1)
	console.log(str)
	var arr = str.split("&")
	console.log(arr)
	var arr1 = arr[0].split("=")
	
	var arr2 = arr[1].split("cart_id=")
	console.log(arr1)
	console.log(arr2)
	var sum = arr1[1]
	console.log(sum)
	$(".sum").html("总价："+sum)
	
	$.get("http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,function(obj){
		console.log(obj)
		var arr3 = obj.data
		var h=""
		for(var i=0;i<arr3.length;i++){
//			console.log(arr3[i].cart_id)
			
			for(var j=1;j<arr2.length;j++){
				if(arr3[i].cart_id == arr2[j]){
					console.log(arr3[i].cart_id)
					h += `<div class="row newGoods">
						
						<div class="message col-lg-4  col-md-4 col-sm-4 col-xs-6">
							<img src="${arr3[i].goods_thumb}" alt="${arr3[i].goods_name}"/>
							<span class="goods-name" title="${arr3[i].goods_name}">${arr3[i].goods_name}</span>
						</div>
						<div class="price col-lg-2  col-md-2 col-sm-2 col-xs-2">单价:${arr3[i].goods_price}</div>
						<div class="numb col-lg-2  col-md-2 col-sm-2 col-xs-2">
							
							数量：${arr3[i].goods_number}
							
						</div>
						<div class="sumb col-lg-2  col-md-2 col-sm-2 col-xs-2">总价:${arr3[i].goods_price*arr3[i].goods_number}</div>
												
					</div>`
				}
			}
			
		}$(".goods-mess").append(h)
	})
	
	$(".address-btn").click(function(){
		var h = $(document).height()
	
		$(".cover").css({"height":h})
		$(".cover").show()
		$(document).unbind("keydown")
	})
	//点击关闭
	$(".cover-close").click(function(){
		$(".cover").hide()
	})
	showAddress()
	function showAddress(){
	$.get("http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.token,function(obj){
		console.log(obj)
		var arr = obj.data
		var h =""
		if(arr.length==0){
			h+='<div class="col-lg-11 col-md-11 col-sm-11 col-xs-9 address-show">未添加地址</div>'
			h+='<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"><a class="btn btn-primary address-btn">添加新地址</a></div>'
			
			
		}else{
		
			for(var i = 0;i<arr.length;i++){
				
				if(i==0){
					h+='<div class="col-lg-11 col-md-11 col-sm-11 col-xs-9 address-show" address_id="'+arr[i].address_id+'">'
					+'<input type="radio" name="address" class="add-input" address_id="'+arr[i].address_id+'" >'
					+'收货人：'
					 +  arr[i].address_name 
					 +  '　省份：' + arr[i].province
					 +  '　市：' + arr[i].city
					 +  '　区：' + arr[i].district
					 +  '　街道：' + arr[i].address
					 +  '　手机号：' + arr[i].mobile
					 +  '<span class="btn btn-primary add-remove" address_id="'+ arr[i].address_id +'">删除</span></div>'
					 +'<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"><a class="btn btn-primary address-btn">添加新地址</a></div>'
					
				}else{
					
				
				
				h+='<div class="col-lg-11 col-md-11 col-sm-11 col-xs-9 address-show" address_id="'+arr[i].address_id+'">'
				+'<input type="radio" name="address" class="add-input" address_id="'+arr[i].address_id+'" >'
				+'收货人：'
				 +  arr[i].address_name 
				 +  '　省份：' + arr[i].province
				 +  '　市：' + arr[i].city
				 +  '　区：' + arr[i].district
				 +  '　街道：' + arr[i].address
				 +  '　手机号：' + arr[i].mobile
				 +  '<a class="btn btn-primary add-remove" address_id="'+arr[i].address_id+'" >删除</a></div>'
				}
			}
		}
		console.log(h)
		$(".address").html(h)
		$(".address-btn").unbind("click")
		$(".address-btn").click(function(){
			var h = $(document).height()
		
			$(".cover").css({"height":h})
			$(".cover").show()
			$(document).unbind("keydown")
		})
		$(".cover-close").unbind("click")
		$(".cover-close").click(function(){
			$(".cover").hide()
			$(document).keydown(function(){
				$("#btn-value").focus()
			})
		})
		//删除地址
		$(".add-remove").click(function(){
			var remmoveDiv = this.parentNode;
			remmoveDiv.parentNode.removeChild(remmoveDiv)
			addRemove($(this))

		})
		
		
			
			
				
				
//				$(this).attr("checked","checked")
			
			
		
		
	})
	}
		//添加收获地址的点击事件
		$("#add-address-btn").click(function(){
			var data = $("form").serialize();
			console.log(data);
			$.ajax({
					"url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.token + "&status=add",
					"type":"POST",
					"dataType": "json",
					"data": data,
					"success": function(obj){
						
						if(obj.code === 0){
//							
							$(".cover").hide();
							showAddress();
						}
						
						
					}
				});

		})
	
	function addRemove(obj){
				//获取地址的id
				console.log( $(obj).attr("address_id") );
				var address_id = $(obj).attr("address_id");
				
				$.ajax({
					"url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.token + "&status=delete&address_id="+ address_id,
					"type":"GET",
					"dataType": "json",
					"success": function(obj){
						console.log(obj);
						if(obj.message == "收货地址删除成功"){
							showAddress();
						}
					}
				});
			}

	
	$(".btn-order").click(function(){
		if(!$(".add-input").is(":checked")){
			alert("请选择地址")
		}else{
			var address_id = $(".add-input:checked").attr("address_id")
			console.log(address_id)
			$.ajax({
					"url":"http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.token + "&status=add",
					"type":"POST",
					"dataType": "json",
					"data": {
						"address_id": address_id,
						"total_prices": sum
					},
					"success": function(obj){
						console.log(obj);
						if(obj.code === 0){
							alert("提交订单成功！");
							//跳转到查询订单页面
							location.href = "order.html";
						}
					}
				});

		}
	})
	