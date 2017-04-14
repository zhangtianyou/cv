/**
 * Created by shihao on 2017/1/7.
 */
//使用node.js  +  express，实现某一大类商品页下的搜索功能。
$(function(){
    //1.为按钮绑定ajax事件处理函数
    $("#search_head").on("click",function(){
        //2.获取用户输入的关键字
        var keyWord=$('input[name="keyword"]').val();// console.log(keyWord);
        //3.构造请求数据的接口
        var url = "/doSearch?keyword=" + keyWord;// 以查询字符串参数的形式传参
        //4.发起ajax请求，处理服务器端给的数据（这个数据是客户端请求的）
        $.getJSON(url,function(data){

            for(var i= 0;i<data.length;i++){
            }
//                    alert(data[0].title + "," + data[0].price);
            var conunt;
            conunt=data[0].title + "," + data[0].price;
            //搭建结构处理好 从服务器拿来的数据
            // --------------------------
            $(".main_god .inner").html(conunt)
        });
    })
    //------------

})