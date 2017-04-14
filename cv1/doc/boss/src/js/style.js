//推荐薪资切换
$(function(){
    		
		$("#jobk_dropList>ul").find("li").removeClass();
		$("#jobk_dropList ul li").find("span").hide();
		
	$("#jobk_bbox>div").on("click",function(){
		$('#jobk_modal').show();
		$("#jobk_dropList>ul").hide();
		var index=$(this).index();
		
		$("#jobk_dropList>ul").eq(index).show();
	   
		$("#jobk_dropList>ul").eq(index).find("li").on("click",function(){
		 	$("#jobk_dropList>ul").eq(index).find("li").siblings().removeClass();
			$(this).addClass("jobk_active");
			$(this).siblings().find("span").hide();
			$(this).find("span").show();
		})
	})
	
	$('#jobk_modal').on('click',function(){
		$("#jobk_dropList>ul").hide()
		$(this).hide();
	})
	
	
	//我的页面初始状态的tab切换
	var jaba = $(".joba_me");
	var joba_list = $(".joba_list");
	jaba.find(".joba_list").each(function(i) {
		$(this).on("click", function() {
			var index = $(this).index();
			for(var i = 0; i < joba_list.length; i++) {
				jaba.find(".joba_one").each(function() {
					var index_ = $(this).index();
					if(index == index_) {
						$(this).show()
					}
					else {
						$(this).hide()
					}
				})
			}
		})
	})
	
	
	
})



$(function(){
	var city=[																								//准备地区数据
		{name:"北京",area:["朝阳区","东城区","西城区","海淀区","房山区","石景山区","昌平区","丰台区","宣武区","崇文区","全部"]},
		{name:"上海",area:["浦东新区","长宁区","宝山区","青浦区","黄浦区","普陀区","闵行区","奉贤区","卢湾区","闸北区"]},
		{name:"广州",area:["越秀区","天河区","白云区","荔湾区","萝岗区","黄埔区","海珠区","番禺区","花都区","南沙区"]},
		{name:"天津",area:["和平区","河东区","河西区","南开区","河北区","红桥区","塘沽区","汉沽区","大港区","东丽区"]},
		{name:"南京",area:["玄武区","白下区","秦淮区","建邺区","鼓楼区 ","下关区","浦口区","栖霞区","雨花台区","江宁区"]},
		{name:"深圳",area:["福田区","罗湖区","南山区","盐田区","宝安区","龙岗区"]},
		{name:"西安",area:["新城区","碑林区","莲湖区"]},
		{name:"重庆",area:["万州区","黔江区","涪陵区","渝中区","大渡口区","沙坪坝区","九龙坡区","南岸区","北碚区","渝北区"]},
		{name:"沈阳",area:["和平区","沈河区","大东区","皇姑区","铁西区","东陵区","于洪区 ","苏家屯区","浑南新区","沈北新区"]},
		{name:"大连",area:["浦东新区","长宁区","宝山区","青浦区","黄浦区","普陀区","闵行区","奉贤区","卢湾区","闸北区"]},
		{name:"成都",area:["浦东新区","长宁区","宝山区","青浦区","黄浦区","普陀区","闵行区","奉贤区","卢湾区","闸北区"]}
	];
//-----------------------------------------------生成城市列表-------------------------------
	for(var i=0;i<city.length;i++){									//循环数据库
		var li=null;												//声明一个li变量
		li=$("<li>"+city[i].name+"</li>");							//添加li变量的内容
		li.appendTo($(".jobc_city"));								//将得到的li插入到左边的盒子中
	}
//-----------------------------------------------生成城市列表-------------------------------
//-----------------------------------------------生成地区列表-------------------------------
	for(var j=0;j<city.length;j++) {								//循环数据库
		var aclass="city"+j;										//创建多个class名称
		$('<ul class='+aclass+'></ul>').appendTo($('.jobc_region'));//生成多个ul添加到大盒子中
		for (var k = 0; k < city[j].area.length; k++) {				//对得到的地区再次进行循环
			var aClass=$("."+aclass);
			$('<li>'+city[j].area[k]+'</li>').appendTo(aClass).parent(aClass).appendTo($(".area_box"));
		}															//创建多个li插入到之前创建的ul中，再将ul插入到area_box中
	}
//-----------------------------------------------生成地区列表-------------------------------
//-----------------------------------------------默认/选择样式-------------------------------
	$(function () {
		$(".jobc_city").find("li").each(function () {	//循环左边城市
			$(".jobc_city").find("li").eq(0).addClass("jobc_select");	//左边城市第一个默认被选中
			$(".area_box").find("ul").eq(0).addClass("jobc_dis");		//右边第一个地区默认display：block
			$(this).bind("click",function () {							//当左边某个城市点击的时候
				var index=$(this).index();								//保存当前点击的索引值
				$(".jobc_city").find("li").removeClass("jobc_select");	//城市移除被选中样式
				$(this).addClass("jobc_select");						//当前点击的城市加上被选中的样式
				var areaBox=$(".area_box");
				areaBox.find("ul").removeClass("jobc_dis");		//右边地区移除显示
				areaBox.find("ul").eq(index).addClass("jobc_dis"); //右边地区索引等于左边城市索引的ul显示出来
			})
		})
	});
			var ensure="<i>"+'√'+"</i>";//声明一个对号
			var areaBox=$(".area_box");
			areaBox.find("li").eq(0).addClass("area_select").append(ensure); //默认右边所有的li加上颜色和对号
			areaBox.find("li").bind("click",function () {					//右边li点击事件
			areaBox.find("li").find("i").remove();						//清空所有对号
			areaBox.find("li").removeClass("area_select");				//清空所有li的样式
			$(this).addClass("area_select");									//当前点击的地区加上样式
			$(this).append(ensure);												//当前点击的地区加上对号
		});
//-----------------------------------------------默认/选择样式-------------------------------



});
