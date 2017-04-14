window.onload=function(){
	//设置动态获取屏幕宽度，实现响应的rem
	var html=document.documentElement;
    var hW=html.getBoundingClientRect().width;
           html.style.fontSize=hW/18+'px';
            //1rem=40px
//  mengqiannan        
	var Olist=document.getElementById('jobb_list')
	var mainBox=document.getElementsByClassName('jobb_wrap')[0];//声明主要wrap盒————————————————————————————杨
	var detail=document.getElementsByClassName('jobd-detail')[0];//声明详情页wrap盒————————————————————————————杨
//	获取数据————————————————————————————杨
	var data=[];
	$.ajaxSettings.async=false;
	$.ajax({url: "data.json",type:"GET",success: function(listData){
			data=listData.data;
			user=listData.user;
		}
	});
//	获取数据————————————————————————————杨——闭合

	//循环显示列表
	var list_num=6;//每页最多显示六条信息
	var show_now=[];
	var page_num=1;
	show_now=data.slice(0,list_num);

	
	
	var brecm_imgSrc="images/icon_06.png";
	var jobb_heartSrc="images/icon_03.png";
	function add_to_lists(){
		Olist.innerHTML="";
		for(var i=0;i<show_now.length;i++){      
		
			var brecm_img=(data[i].brecm_img)? '<i class="fl"><img src='+brecm_imgSrc+'/></i>' : '';
			var jobb_heart=(data[i].jobb_heart)? '<i class="fl"><img src='+jobb_heartSrc+'/></i>' :'';
			
			var Odiv='<div class="jobb_item" ids='+data[i].id+'>'+
		                '<div class="jobb_title clearfix">'+
	                        '<a href="jobd-detail.html"><h1 class="fl">'+data[i].jobb_post+'</h1></a>'+
	                        brecm_img+
	                        jobb_heart+
	                        '<span class="fr jobb_money">'+data[i].jobb_money+'</span>'+
		                '</div>'+
		                '<div class="jobb_desc clearfix">'+
	                        '<p>'+data[i].jobb_desc+'</p>'+
	                        '<div class="jobb_city clearfix">'+
	                        '<i class="fl"><img src="images/adds_03.png"/></i>'+
	                        '<span class="fl">'+data[i].citys+'</span>'+
	                        '<span class="fl">'+data[i].areas+'</span>'+
	                        '<span class="fl">'+data[i].village+'</span>'+
	                        '<i class="fl jobb_experience"><img src="images/guan_03.png"/></i>'+
	                        '<span class="fl">'+data[i].experience+'</span>'+
		                '</div>'+
		                    '<a href="#" class="jobb_attent">关注</a>'+
		                '</div>'+
		                '<div class="jobb_new"><img src="'+data[i].newIcon+'"/></div>'+
		             '</div>';
			//添加到内容的列表盒子里
			Olist.innerHTML+=Odiv;
		}
		if(page_num*list_num>=data.length){
			var pull_up_to_more='<div id="pullUp"><span class="pullUpLabel">已经是最后一页了...</span></div>';
			Olist.innerHTML+=pull_up_to_more;
		}else{
			var pull_up_to_more='<div id="pullUp"><span class="pullUpLabel">上拉加载更多...</span></div>';
			Olist.innerHTML+=pull_up_to_more;}
		
	}
	add_to_lists();
	
	 //如果点击关注显示心形图标，new图标消失
   
    var clicks=false;
    var eyesHeart=document.getElementsByClassName('jobb_attent');
    var jobb_new=document.getElementsByClassName('jobb_new');
    
    var clicktoggle=false;
    
    for(var c=0;c<data.length;c++){
    	eyesHeart[c].index=c;//发牌照
		eyesHeart[c].onclick=function(){
			//所有的li去掉ac
			for(var j=0; j<data.length; j++){
				if(clicktoggle==false){
					this.className='jobb_attention';
					this.innerHTML='取消关注'
					jobb_new[this.index].style.display='none';
				}else{
					this.className='jobb_attent';
					this.innerHTML='关注'
				}
				clicktoggle=!clicktoggle;
			};
		}; 
   }
   
   //----------------上划加载事件开始！！！------------------------------------
		var myScroll,
			pullUpEl, pullUpOffset,
			generatedCount = 0;
		//上划事件完成后执行的函数
		function pullUpAction() {
			setTimeout(function() {
				page_num++;
				
				show_now = data.slice(0, page_num * list_num);
				add_to_lists();
				myScroll.refresh();

			}, 1000);
		}

		//------事件函数
		function loaded() {

			pullUpEl = document.getElementById('pullUp');
			pullUpOffset = pullUpEl.offsetHeight;

			myScroll = new iScroll('wrapper', {
				scrollbarClass: 'myScrollbar',
				useTransition: false,
				onRefresh: function() {
					if(pullUpEl.className.match('loading')) {
						pullUpEl.className = '';
						if(page_num*list_num>=data.length){
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '已经是最后一页了...';
						}else{
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
						}		
					}
				},
				onScrollMove: function() {
					if(this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
						pullUpEl.className = 'flip';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
						this.maxScrollY = this.maxScrollY;
					} else if(this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
						pullUpEl.className = '';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
						this.maxScrollY = pullUpOffset;
					}
				},
				onScrollEnd: function() {
					if(pullUpEl.className.match('flip')) {
						pullUpEl.className = 'loading';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
						pullUpAction(); // Execute custom function (ajax call?)
					}
				}
			});
			setTimeout(function() {
				document.getElementById('wrapper').style.left = '0';
			}, 800);
		}
		//初始化绑定iScroll控件 
		document.addEventListener('touchmove', function(e) {
			e.preventDefault();
		}, false);
		document.addEventListener('DOMContentLoaded', loaded, false);
		//----------------上划加载事件结束！！！------------------------------------
   
   
   	//————————————————————————————杨
    //点击进入详情页
    var items=Olist.getElementsByClassName('jobb_item');
    for(var i=0;i<items.length;i++){
    	items[i].onclick=function(){
    		var isid=this.getAttribute('ids')//获取对应的信息id
    		dataRun(runIds(isid));
		    mainBox.style.display="none";
		    detail.style.display="block";
    	}
    }
    
    //根据id寻找索引
    function runIds(n){
		for(var i=0;i<data.length;i++){
	    	if(n==data[i].id){
	    		return i;
	    	}
	    }
	}
	
    //详情页面JS代码
    var d_back=document.getElementById('d_back');
    d_back.onclick=function(){
    	mainBox.style.display="block";
		detail.style.display="none";
		d_midList.innerHTML="";
		d_botList.innerHTML="";
	//window.history.back(-1);
    }

	var d_inset=detail.getElementsByClassName('inset')[0];//公司详情按钮
	var d_inpage=detail.getElementsByClassName('jobg_explain')[0];//公司详情页面
	var d_close=d_inpage.getElementsByClassName("close")[0];//公司详情页面按钮
	
	var d_top=detail.getElementsByClassName('top')[0];//详情页top
	var d_mid=detail.getElementsByClassName('mid')[0];//详情页主体
	var d_midList=d_mid.getElementsByClassName('list')[0];//要求列表
	var d_bot=detail.getElementsByClassName('bot')[0];//公司版面
	var d_botList=d_bot.getElementsByClassName('list')[0];//公司概况列表
	
	//数据应用事件
	function dataRun(n){
		d_top.getElementsByClassName('major')[0].innerHTML=data[n].jobb_post;
		d_top.getElementsByClassName('pay')[0].innerHTML=data[n].jobb_money;
		d_top.getElementsByClassName('subtitle')[0].innerHTML=data[n].jobb_desc;
		d_top.getElementsByClassName('point')[0].innerHTML=data[n].citys+' '+data[n].areas+' '+data[n].village;
		d_top.getElementsByClassName('bag')[0].innerHTML=data[n].experience;
				
		//数据应用事件_bot
		d_bot.getElementsByClassName('company')[0].innerHTML=data[n].bot.company.name;
		d_bot.getElementsByClassName('picImg')[0].setAttribute('src',data[n].bot.company.imgurl);
		d_bot.getElementsByClassName('insize')[0].innerHTML=data[n].bot.company.desc.type+' '+data[n].bot.company.desc.mold+' '+data[n].bot.company.desc.size;
		
		//要求循环生成要求
		for(var i=0;i<data[n].mid.length;i++){
			var cont='<p>'+(i+1)+'.'+data[n].mid[i]+'</p>';
			d_midList.innerHTML+=cont;
		}
		//公司简介循环生成
		for(var i=0;i<data[n].bot.need.length;i++){
			var cont='<p>'+(i+1)+'.'+data[n].bot.need[i]+'</p>';
			d_botList.innerHTML+=cont;
		}
	}
	
	//预约判断事件
	var order=document.getElementById('order');
	
	//判断重复投递
	var selNum=0;//投递次数变量
	for(var i=0;i<user.jump.length;i++){
		if(data[0].id==user.jump[i].id){
			selNum=user.jump[i].number;//得到已经保存的投递次数
		}
	}
	
	if(user.days<user.ends){
		order.innerHTML='无法预约（毕业前一周即可预约）';
		order.className='error';
	}
	else if(user.mark<80){
		order.innerHTML='无法预约（你的素质分不达标）'
		order.className='error';
	}
	else if(selNum>=3){
		order.innerHTML='无法预约（重复投递，请3日后再试）'
		order.className='error';
	}else{
		order.className='right';
		order.onclick=function(){
			if(data[0].goodjob==false || user.jumpSum>7){
				var check=document.getElementsByClassName('jobh_chance')[0];
				check.style.display='block';
				var continues=document.getElementsByClassName('button2')[0];
				continues.onclick=function(){
					jobb_Send();
					check.style.display='none';
				}
			}else{
				//alert('开始预约');
				jobb_Send();
			}
		}
	}
			
	//公司详情页事件
	d_inset.onclick=function(){d_inpage.style.display='block'}
	d_close.onclick=function(){d_inpage.style.display='none'}
	//————————————————————————————杨——闭合
	
	
	//点击预约的发送状态
	function jobb_Send(){
		 //获取三个页面
		var sendMedal=document.getElementById('jobe-modal');
		var show=sendMedal.getElementsByClassName("show");
		var wait=sendMedal.getElementsByClassName("waiting")[0];
		var success=sendMedal.getElementsByClassName("success")[0];
		var wrong=sendMedal.getElementsByClassName("wrong")[0];
		var modalLayal=null;
		var m=0;
   		//点击关闭按钮
   		this.blur();
		order.style.opacity="0.2";	   			
		show[m].style.display="block";
		sendMedal.className='modal'
   		var close=sendMedal.getElementsByClassName("close");
   		for(var n in close){
   			html.onclick=function(ev){
   				var ev=ev||window.event;
   				var elm=ev.target||ev.srcElement;
   				if(elm==this){return}
   				if(elm.className=="close"){
   					hide();
   					m++;
   					if(m>=3){
   						hide();
   						order.style.opacity="1";
   						order.focus();
   						var sendMedal=jobe.getElementById('jobe-modal')
   			            sendMedal.className='modal_none'
   					}else{
   						show[m].style.display="block";
   					}
   				}
   			}	
   		}
   		//隐藏所有页面
   		function hide(){
   			for(var i=0;i<show.length;i++){
				if(show[i].style.display=="block"){
					show[i].style.display="none";	
				}
			}
   		}
   		//模态层modal_layal--------暂未使用
		function modal_layal(){
			var modal=document.createElement('div');
			modal.className='modal';
			jobe.body.appendChild(modal);
			return modal;
			window.onresize=function(){
				modal_layal();	
			};	
		};	
		
	}
}