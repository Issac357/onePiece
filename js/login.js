
var str = location.search
str = str.substr(10)
console.log(str)

if( localStorage.getItem("token") ){
				$("body").html("<h1>" + localStorage.getItem("username") + "您已经登录成功了！</h1>")
				
				setTimeout(function(){
					location.href = "index.html";
				},2000);
}
			$("#loginin").click(function(){
				login()
			})
			
			$("#password").keydown(function(e){
				
				if(e.keyCode == 13){
					
					login()
				}
			})
			
	function login(){
				var username = $('#username').val();
				var password = $('#password').val();
				$.ajax({
					"url":"http://h6.duchengjiu.top/shop/api_user.php",
					"type":"POST",
					"dataType": "json",
					"data": {
						"status": "login",
						"username": username,
						"password": password
					},
					"success": function(response){
						console.log(response);
						if(response.code === 0){
							var data = response.data;
							for( property in data){
								if(data.hasOwnProperty(property)){
									localStorage.setItem(property,data[property]);
								}
								
								
							}
							
							
							
							alert(response.message);
//							var callbackURL = location.hash.substr(10);
//							console.log(callbackURL)
							if( str ){
								window.location.href = "goods.html?goods_id="+str;
							}else{
								window.location.href = "index.html";
							}
							
							
						}
						else if(response.code === 1001){
							alert("密码错误")
						}else if(response.code === 2002){
							alert("用户名不存在")
						}
					}
				});
			}