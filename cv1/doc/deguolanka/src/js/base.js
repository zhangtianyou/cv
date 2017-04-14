/**
 * Created by JOJO on 2017/2/26 0026.
 */
$(function () {
    $("#navbox").find("li").each(function (index) {
        $(this).on("click",function () {
            $(this).addClass("active").siblings().removeClass("active");
            $("#contbox").find(".cont_c_i").eq(index).addClass("show").siblings().removeClass("show");
            $("#titlebox").html($(this).find("p").html());
        })
    })
});