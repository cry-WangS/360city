$(function() {
	//登录界面
	$(".welcome").click(function() {
		$("#DL").css("display", "block");
		$("#register").css("display", "block");
	});
	//点击X号关闭登录
	$("#register_X").click(function() {
		$("#DL").css("display", "none");
		$("#register").css("display", "none");
	});
	
	//城市切换
	$("#handcity").click(function() {
		$("#city1").show(1000);
		return false;
	});
	$("#city1_a").click(function() {
		$("#city1").hide(1000);
		return false;
	});
	$(".hot_city").click(function() {
		$("#Bcity").text($(this).text());
		$("#city").text($(this).text());
		$("#city1").hide(1000);;
	});
	
	//下方切换城市
	$("#btn1").click(function(){
		$("#city2").show(1000);
	});
	$("#city2_a").click(function() {
		$("#city2").hide(1000);
	});
	$(".hot_city2").click(function() {
		$("#Bcity").text($(this).text());
		$("#city").text($(this).text());
		$("#city2").hide(1000);
	});
	
	//登录界面
	$("#register_input1").blur(function() {
		if(this.value == "") {
			$("#empty").text("账号不能为空");
		} else {
			$("#empty").text("");
		}
	});
	$("#register_input3").blur(function() {
		if(this.value == "") {
			$("#empty").text("密码不能为空");
		} else {
			$("#empty").text("");
		}
	});
	$("#login_login").click(function() {
		if(!($("#register_input1").val() == "" || $("#register_input3").val() == "")) {
			var username = $("#register_input1").val();
			var password = $("#register_input3").val();
			$.ajax({
			    type:"post",
		        url:"http://10.2.153.121:8888/login",
		        data:{"username":username,"password":password},
		        
		        success: function(data){
		        //接受返回的数据，前端判断采取的动作 
	               if(data == false){
	                   $("#empty").text("密码或者账号错误，请重新输入");
	                   $("#register_input1").val("");
	                   $("#register_input3").val("");
	               }else{
		               alert('登陆成功');
		               $("#DL").css("display", "none");
					   $("#register").css("display", "none");
					   $("#z_none").html("欢迎您,"+username);
					   $(".trL4").css("display","none");
	               }
		        },
		        error:function(){
		        	console.log('err');
		        }
		    });
		}else{
			$("#empty").text("请输入账号密码");
		}
	});
	//hfl
	
	$('.carousel').carousel({
		interval: 2500
	});

	$('input').blur(function() {
		$('input').css("background", "");
	})

	$("#signa").click(function() {
		$("#backcolor").css("display", "block")
		$("#sign").css("display", "block")
		$("#sign_input1").val("");
		$("#pass").val("");
		$("#sign_input3").val("");
	})
	$("#sign_X").click(function() {
		$("#sign").css("display", "none")
		$("#backcolor").css("display", "none")
	})

	$('#sign_div1 input:first').focus(function() {
		$(this).css("background", "#E1EDF7")

	})

	$('#sign_div1 input:first').blur(function() {
		if(this.value == "") {
			$(".name2").css("display", "block")
		} else {
			$(".name2").css("display", "none")
			$(".name5").css("display", "block")
		}
	})

	$('#sign_div1 input:eq(1)').focus(function() {
		$(this).css("background", "#E1EDF7")

	})

	$('#sign_div1 input:eq(1)').blur(function() {
		if(this.value == "") {
			$(".pass11").css("display", "block")
		} else {
			$(".pass11").css("display", "none")
		}
	})

	$('#sign_div1 input:last').focus(function() {
		$(this).css("background", "#E1EDF7")
	})

	$('.btn').click(function() {
		var name = $("input[name='name']").val();
		var pass = $("input[name='pass']").val();
		var passa = $("input[name='passa']").val();

		if(pass != passa || pass == "" || name == "" || passa == "") {
			alert("注册失败，原因：\n1.两次密码输入不一致\n2.用户名和密码不能为空")
			$("input[name='pass']").val("");
			$("input[name='passa']").val("");

		} else {                                   
			 $.ajax({
		        type: "post",
		        url: "http://10.2.153.121:8888/register",
		        data:{"username":name,"password":pass},
		        success: function(data){
		        //接受返回的数据，前端判断采取的动作 
	               if(data == false){
	                    alert('注册失败,已经有此账号');
	                 
	               }else{
		                alert('注册成功,请登录');
		                $("#sign").css("display", "none");
						$("#backcolor").css("display", "none");
	               }
		        },
		        error:function(){
		        	console.log('err');
		        }
			});
		}
	})
	//分页
	var allcounts;
		$.ajax({
			type:"get",
			url:"http://10.2.153.121:8888/counts",
			async:false,
			success:function(data){
				allcounts = data.totalNum;
			}
		});
		function request(num){
			var uri = "http://10.2.153.121:8888/fenye"+num;
			$.ajax({
				type:"get",
				url:uri,
				async:true,
				success:function(data){
					for(i in data){
						$("#jingtai").append(
									"<div class='forxuan'>" + "<img src= " + data[i].shop_ico + " style='width:90px;height:90px'>"
									+ "<div class='forxuanl' style='float: left;'>" + "<a href='' class='for_a' >" + data[i].shop_name + "</a>" + "<p class='for_p'>主营：" + data[i].main + "</p>" + "<p class='for_p'>地址：" + data[i].addr + "</p>"
									+ "</div>" + "<div class='forxuanr'>" + "<ul>" + "<li><img src='img/dao.png'/>先行赔付</li>" + "<li><img src='img/vip.png'/>同城帮认证</li>" + "<li>人气:" + data[i].shop_visit + "</li>" + "</ul>" + "</div>" + "<a href='javascript:;' class='inshop'>进入店铺</a>"
									+ "</div>"
						);
					}
				}
			});
		}

		if($("#jingtai")) {
			request(1);
			var pagecount = allcounts; //多少条信息
			var pagesize = 5; //每页多少条
			var currentpage = 1; //当前页码
			function pages(pagecount, pagesize, currentpage) {
				var counts, pagehtml = "";
				counts = Math.ceil(pagecount / pagesize);
				if(pagecount <= pagesize) { //只有一页内容  
					pagehtml = "";
				}

				//大于一页内容  
				if(pagecount > pagesize) {
					if(currentpage > 1) {
						pagehtml += '<li id="pageup"><a href="javascript:;" class>上一页</a></li>';
					}
					for(var i = 0; i < counts; i++) {
						if(i >= (currentpage - 4) && i < (currentpage + 3)) {
							if(i == currentpage - 1) {
								pagehtml += '<li class="active"><a href="javascript:;" class="pages">' + (i + 1) + '</a></li>';
							} else {
								pagehtml += '<li><a href="javascript:;" class="pages">' + (i + 1) + '</a></li>';
							}
						}
					}
					if(currentpage < counts) {
						pagehtml += '<li class="pagedown"><a href="javascript:;">下一页</a></li>';
					}

				}
				$("#yema").empty();
				$("#yema").html(pagehtml);
				$(".pagedown").click(function() {
					$("#jingtai").empty();
					currentpage++;
					pages(pagecount, pagesize, currentpage);
					request(currentpage);
				});
				$("#pageup").click(function() {
					$("#jingtai").empty();
					currentpage--;
					pages(pagecount, pagesize, currentpage);
					request(currentpage);
				})
				for( m in $(".pages")){
					$(".pages:eq("+m+")").click(function(){
						$("#jingtai").empty();
						currentpage = parseInt($(this).html());
						pages(pagecount, pagesize, currentpage);
						request(currentpage);
					});
				}
			}
			pages(pagecount, pagesize, currentpage);

		}
});