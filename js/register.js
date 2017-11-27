			var a=0
			var d= 0
			var b = 0
			$("#phone").keyup(function(){
				
				var username = $('#phone').val();
				
				console.log(username);
				
				$.ajax({
					"url":"http://h6.duchengjiu.top/shop/api_user.php",
					"type":"POST",
					"dataType": "json",
					"data": {
						"status": "check",
						"username": username
					},
					"success": function(response){
						console.log(response);
						
						if(response.code === 0){
							//成功后
							$(".success").show();
							$(".error").hide();
						}else if(response.code === 2001){
							//失败后
							$(".error").show();
							$(".success").hide();
						}
						
						
					}
				
				});
				
			})
			
			$("#phone").blur(function(){
				
				var username = $('#phone').val();
				
				console.log(username);
				
				$.ajax({
					"url":"http://h6.duchengjiu.top/shop/api_user.php",
					"type":"POST",
					"dataType": "json",
					"data": {
						"status": "check",
						"username": username
					},
					"success": function(response){
						console.log(response);
						
						if(response.code === 0){
							//成功后
							a=1
						}else if(response.code === 2001){
							//失败后
							a=0
						}
						
						
					}
				
				});
				
			})
			
			
			$("#password").blur(function(){
				var password = $('#password').val();
				if(password==""){
					b=0
					return
				}else{
					if(password.length < 6 || password.length > 20){
						b=0
						alert("密码长度应该是6-20位之内！");
						return;
					}else{
						b=1
					}
				}
				
				
			})
			
//			注册验证
			$("#register").click(function(){
				register()
				
			})
			$("#re-password").keydown(function(e){
				if(e.keyCode==13){
					register()
				}
			})
			
			function register(){
					
				
					if(a==0){
						alert("用户名不对")
						return
					}else if(b==0){
						alert("密码长度不够")
						return
						
					}else if(d==0){
						alert("两次密码不一样")
						return
						
					}else{
						var username = $('#phone').val();
						var password = $('#password').val();
						
		
						$.ajax({
							"url":"http://h6.duchengjiu.top/shop/api_user.php",
							"type":"POST",
							"dataType": "json",
							"data": {
								"status":"register",
								"username":username,
								"password": password
							},
							"success": function(response){
								console.log(response);
								
								if(response.code === 0){
									alert(response.message);
									window.location.href = "login.html";
								}
								 
							}
						});
					}
				
				}
			
			
			$("#re-password").blur(function(){
				
				if($(this).val() == $("#password").val() ){
					d=1
				}else{
					
					d=0
				}
				
			})