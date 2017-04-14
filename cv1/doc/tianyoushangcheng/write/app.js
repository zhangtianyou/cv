/**
 * Created by hxsd on 2017/1/3.
 */

/*//1.在地址栏输入地址能访问到相应的地址
var http=require("http");//1）引入http
var fs=require("fs");
var express=require("express");
var app=express();

var products=require("./fake").createProducts();
var Pets=require("./fake").createPets();

app.use(express.static("public"));//请求静态的


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
http.createServer(app).listen(1993,function(){// 1.3）指定运行在什么端口
    console.log("服务器正在运行在1993端口...")
})*/
/*//1.在地址栏输入地址能访问到相应的地址
 var http=require("http");//1）引入http
 var url=require("url");//2)引入url
 var path=require("path");//3)引入path
 var fs=require("fs");
 //var filePath="http://localhost:1993/index.html";
 //1.2）建立web服务器,相应客户端的请求
 var express=require("express");
 var app=express();
 app.use(express.static("public"));//请求静态的

 var mime = require("./mime");
 var fake=require("./fake").createProducts();

 http.createServer(function(request,response){
 var reqUrl=request.url;//获取地址
 var pathname = url.parse(reqUrl).pathname;//获取的是地址栏的后面那路径

 if(pathname=="/search"){
 // 说明是搜索请求
 // 将商品信息(js数组)转换为json数组，发送回客户端
 response.writeHead(200, {"Content-Type":mime[".json"]});
 response.write(JSON.stringify(fake)); // 将js数组转为json字符串，发送
 response.end();
 return;
 }
 if( pathname =="/"){
 pathname="/index.html";
 }
 var file = "public"+ pathname;
 if(!fs.existsSync(file)){
 console.log("您要读取的文件不存在："+file);
 return;
 }
 fs.readFile(file,function(err,data){
 if(err){
 console.log("读取文件时出现错误")
 return;
 }
 var ext=path.parse(url.parse(file).pathname).ext;//获取资源路径的名
 // 将读取的文件内容发送给客户端
 response.writeHead(200,{"Content-Type":mime[ext]});
 response.write(data);
 response.end();
 })
 }).listen(1993,function(){// 1.3）指定运行在什么端口
 console.log("服务器正在运行在1993端口...")
 })*/