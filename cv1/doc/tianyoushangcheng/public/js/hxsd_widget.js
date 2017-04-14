// JavaScript Document
//模态层
function modal(opacity){
	var oDiv=document.createElement("div");
	oDiv.className="modal";
	document.body.appendChild(oDiv);
	if(opacity){
			oDiv.style.background="none";//改变模态层颜色。
	};
	return oDiv;
	
};

//弹框
function loginBox(){
	//调用模态层
 	var my_lay=modal(true);	//判断模态层的色，给他一个ture
	
	var l_box=document.createElement("div");
	l_box.className="loginBox";
	l_box.innerHTML="<h4>请登录</h4>"+
	"<form>"+
    	'<p><label>用户名：<input type="text" class="text"><label></p>'+
    	'<p><label>密　码：<input type="password" class="text"><label></p>'+
    	'<p><button type="button" class="sub">提交</button></p>'+
    '</form>'+
    '<a href="javascript:;" class="closeBtn">×</a>';
	
	document.body.appendChild(l_box);//网页中插入——l——box
	
	//居中显示
	
	hxsd_tools.showCenter(l_box);
	//拖动标题
	var title=l_box.getElementsByTagName("h4")[0];
	hxsd_tools.drag(l_box,title);
	//------------------------------------------------------------
	var closeBtn=document.getElementsByClassName("closeBtn")[0];
	 var mo=document.getElementsByClassName('modal')[0];
	 
	 //小叉叉关闭box。跟modal
	 closeBtn.onclick=function(){
			document.body.removeChild(l_box);
			document.body.removeChild(mo);
	 };	
};