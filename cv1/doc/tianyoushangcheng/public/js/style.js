// JavaScript Document
$(function(){
	//---顶部-天气预报---------------
	/*//自运行函数
	(function(){
		//2.获取下拉框的valu值
		var sel=$("#selectWh");
		var index=sel.val();
		//var texsel=sel.options[index].text;
		//console.log(typeof texsel);
		//1.定义天气数据接口
		/!*var url="http://wthrcdn.etouch.cn/weather_mini?city="+index;
		$.getJSON(url,function (data) {
			var countent="&nbsp"+data.data.forecast[0].low+"~"+data.data.forecast[0].high+"&nbsp";
			countent+="&nbspToday/"+"&nbsp"+data.data.forecast[0].date+"&nbsp";
			countent+="&nbsp/"+data.data.forecast[0].type;
			$("#tianqiyubao").html(countent);
		})*!/
	})();*/
	function getWeather(city){
		var url="http://wthrcdn.etouch.cn/weather_mini?city="+city;
		$.getJSON(url,function (data) {
			var countent="&nbsp"+data.data.forecast[0].low+"~"+data.data.forecast[0].high+"&nbsp";
			countent+="&nbspToday/"+"&nbsp"+data.data.forecast[0].date+"&nbsp";
			countent+="&nbsp/"+data.data.forecast[0].type;
			$("#tianqiyubao").html(countent);
		})
	};
	getWeather($("#selectWh").val());
	$("#selectWh").on('change',function(){
		getWeather($(this).val());
	})

	//<------轮播图---导航区域------------------
	/*function item1(){
		var banner_cont=document.getElementById("banner_cont");
		var aBtn=banner_cont.getElementsByTagName("ol")[0].children;
		var aUl=banner_cont.getElementsByTagName("ul")[0];
		var aLi=aUl.children;

		var iNow=0;
		//<-----------
		function change(){
			for(var j=0;j<aBtn.length;j++){

				aBtn[j].className="";
			}
			aBtn[iNow].className="ac";
		}
		var li_w=aLi[0].offsetWidth;//得到一个li的宽度

		aUl.style.width=li_w*aLi.length+"px";

		for(var i=0;i<aBtn.length;i++){
			aBtn[i].index=i;

			aBtn[i].onclick=function(){
				iNow=this.index;
				change();
				hxsd_tools.move(aUl,{"left":-li_w*iNow});
			}
		}
		//>0----------------------
		var prev=banner_cont.children[2];
		var next=banner_cont.children[3];

		prev.onclick=function(){
			iNow--;
			if(iNow<0){iNow=0;	}
			hxsd_tools.move(aUl,{"left":-li_w*iNow});
			change();
		}
		next.onclick=function(){
			iNow++;
			if(iNow>=aLi.length-1){iNow=aLi.length-1};
			change();
			hxsd_tools.move(aUl,{"left":-li_w*iNow});

		};
	}
	item1();*/
		//jquery:
		$("#banner232").carousel();
	//<------page---导航区域------------------
	/*function page(){
		var oLeft_t_nav=document.getElementById("left_t_nav");

		var Left_t_nav=oLeft_t_nav.children[0];//找到子级--就是第一个div

		var aUl=Left_t_nav.children[0];//找到子级，，第一个下面的ul
		var aLi=aUl.children;
		var oPopup=oLeft_t_nav.children[1];//表示的是  warp  下面的第二个元素

		var oSection=oPopup.children;//表示他下面的那些section，就是对应15个导航内容


		var live_menu=null;
		var n;

		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;

			aLi[i].onmouseenter=function(){//鼠标移入的时候让他显示出来
				oPopup.style.display="block";//让他displayblock

				for(var j=0;j<aLi.length;j++){//对应的ali的类名清空
					aLi[j].className="";
					oSection[j].style.display="none";//同时也隐藏
				}
				aLi[this.index].className="ac";
				oSection[this.index].style.display="block";//同时也隐藏

			}

			aLi[i].onmouseleave=function(){//鼠标移出的时候让他影藏
				for(var j=0;j<aLi.length;j++){
					oPopup.style.display="none";//让他displayblock
					aLi[this.index].className="";
					oSection[this.index].style.display="none";//同时也隐藏
				};
				n=this.index;
			}

		}
		oPopup.onmouseover=function(){
			oPopup.style.display="block";
			aLi[n].className="ac";
			oSection[n].style.display="block";
		}
		oPopup.onmouseout=function(){
			oPopup.style.display="none";
			aLi[n].className=" ";
			oSection[n].style.display="none";
		}

	}
	page();*/
		function pagechange() {
			$("#left_t_nav").hover(function () {
			}, function () {
				$("#popup").hide()
			})
			var nav = $("#left_t_nav .left_nav ul")
			//var nav=$("#left_t_nav .left_nav ul")
			var pupp = $("#popup");
			//pupp.hide();
			/*var timer;
			 function timer1(){
			 timer=setInterval(function(){
			 pupp.hide();
			 },3000);
			 }*/
			nav.find("li").hover(function () {
				$(this).addClass("ac").siblings().removeClass("ac");
				var index = $(this).index();
				pupp.show();
				pupp.find(".section1").eq(index).show().siblings(".section1").hide();
				pupp.find(".section1").eq(index).css("z-index", "40").siblings().css("z-index", "0");
				$("#banner232").css("display", "none");
			}, function () {
				//$(this).removeClass("ac");
				var index = $(this).index();
				pupp.find(".section1").eq(index).show().siblings(".section1").hide();
				//timer1();
				$("#banner232").css("display", "block");
				nav.find("li").removeClass("ac");
			})
			pupp.hover(function(){
				$("#banner-nav").css("display","none")
			},function(){
				$("#banner-nav").css("display","block")
			})
		}
		pagechange();
/*	var  timer;
	$("#left_t_nav>.left_nav li").each(function(index){

		$(this).hover(
			function(){
				//鼠标进入li时
				$(this).addClass("ac").siblings().removeClass("ac");
				$(this).find("a")
				$("#popup>div").eq(index).show().siblings().hide()
			},

			function(){
				//鼠标离开Li时
				var a=$("#popup>div");
				timer=setTimeout(function(){
					a.eq(index).hide()
					$("#left_t_nav>.left_nav li").removeClass("ac");
				},400)
			});

		$("#popup>div").on("mouseenter",function(){
			//当鼠标移入div,清除定时器
			clearTimeout(timer)
		})

		$("#popup>div").on("mouseleave",function(){
			//当鼠标移出时div 删除div
			$("#popup>div").eq(index).hide()

		})

	});*/
	//<---楼层跳转--------------
	/*function louchen(){
		var LocationFloorList=document.getElementsByClassName('LocationFloorList')[0];
		var aLi=LocationFloorList.getElementsByTagName('li');
		var	oLouchen=document.getElementById("louchench");
		var aFloor=oLouchen.getElementsByClassName('floortiao');


		var arr=[];

		for(var i=0; i<aFloor.length; i++){
			var json={};
			json.name=i;
			json.offsetTop=aFloor[i].offsetTop;
			arr.push(json);
		};

		console.log(arr);

		window.onscroll=function(){
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//滚动条  兼容ie方法
			if(scrollTop>800){
				LocationFloorList.style.display='block';
			}else{
				LocationFloorList.style.display='none';//当滚动条距离上方200的时候，显示出来
			}


			// 根据楼层滚动位置，定位编号------------------------------------------------
			var last_arr=[];
			for(var j=0; j<arr.length; j++){
				if(arr[j].offsetTop<scrollTop+500){//400为接近屏幕的敏感区
					last_arr.push(arr[j].name);
				}
			};

			//console.log(last_arr);
			var li_index=last_arr[last_arr.length-1];

			for(var l=0; l<aFloor.length; l++){
				aLi[l].className='';
			};
			//页面上部如果有内容，没有楼层会放入新数组，产生错误
			last_arr.length==0 ?aLi[0].className='ac':aLi[li_index].className='ac';

		}


		//点击编号，跳转到相对楼层-----------------------------------------------
		for(var i=0; i<aFloor.length; i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				var start=document.documentElement.scrollTop || document.body.scrollTop;
				var end=arr[this.index].offsetTop;
				move(start,end)
			}
		};
		//move-------------------------------------------------------
		var timer;
		function move(start,end){
			var dis=end-start;
			var count=parseInt(1500/30);
			var n=0;
			clearInterval(timer);
			timer=setInterval(function(){
				n++;
				var a=1-n/count;
				var step_dis=start+dis*(1-a*a*a*a);
				window.scrollTo(0,step_dis);
				if(n==count){
					clearInterval(timer);
				};
			},30)
		}
	}
	louchen();*/
		// 响应浏览器窗口的滚动事件
		$(window).on("scroll",function(){
			// 判断document滚动的距离，是否达到了导航栏的top值
			if($(document).scrollTop() >= $("#daohanghang").offset().top){
				// 说明导航栏已经滚动到了浏览器窗口顶部，要把它固定下来
				$(".LocationFloorList").css("display","block");

				$(".LocationFloorList").show()
			}else{
				$(".LocationFloorList").hide()
			}
		});
		//1.找到点击a按钮,
		$("a[href*='#']:not([href='#'])").on("click",function(){
			var id=this.hash;
			//console.log("id:"+id);
			$("html,body").animate({scrollTop:$(id).offset().top},1000)
		})
		//--登陆框------
	function  actionlogin(){
		var loginbox1=document.getElementById("loginbox22");

		loginbox1.onclick=function(){
			loginBox();
			this.blur(); //失去焦点命令  不是事件(区别于onblur)
		}
	}
	actionlogin();
	//---------全屏漂浮窗口--------------------------
})

