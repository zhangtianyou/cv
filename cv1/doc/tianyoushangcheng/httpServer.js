/**
 * Created by hxsd on 2016/11/11.
 */
var http = require("http");
var path = require("path");
var express = require("express");
//----------------
var fs=require("fs");
var products=require("./fake").createProducts();
var Pets=require("./fake").createPets();


//----------
var app = express();

// 处理对静态资源的请求
app.use(express.static(path.resolve(__dirname,"public")));  // 使用中间件
//----------------
app.get("/watch",function(request,response){
    response.sendFile(__dirname+"/public/watch.html");
    response.json(products); // 将js数组转为json字符串，发送
})
app.get("/doSearch",function(request,response){
    var keyword=request.query.keyword;
    var result=Pets[keyword];
    response.json(result);
    //alert(response.json(result));
});
//---------------
var httpServer = http.createServer(app);
// 运行Socket Server
require("./socketServer")(httpServer);
httpServer.listen(1993,function(){
    console.log("服务器正运行在1993端口...");
});

