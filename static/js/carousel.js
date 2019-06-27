;(function ($) {
    var carousel_function = function () {
        var self = this;
        this.carousel_ul_object = document.getElementById("carousel_radius");
        this.carousel_li_arr = self.carousel_ul_object.getElementsByTagName("li");
        this.arr_radius = 0;
        this.time_check = true;
        this.tmp_arr = 0;

        this.carousel_width = parseInt($(".carousel").css("width"));
        $(".carousel_img").css("width", self.carousel_width * 7 + "px");
        $(".carousel_img").css("left", -self.carousel_width + "px");
        $(".carousel_img_auto").css("width", self.carousel_width + "px");

        setTimeout(function () {
            self.run_carousel();
        }, 3000);
        this.body = $(document.body);
        this.body.delegate(".carousel", "mouseover", function () {
            self.time_check = false;
        });
        this.body.delegate(".carousel", "mouseout", function () {
            self.time_check = true;
        });
        this.carousel_check = true;//检查动画是否完成，
        /*
        this.body.delegate(".btn_next","click",function(){
            if(self.carousel_check){
                self.carousel_check=false;
                self.btn_next();
            }
        });
        this.body.delegate(".btn_pre","click",function(){
            if(self.carousel_check){
                self.carousel_check=false;
                self.btn_pre();
            }
        });
        */
        this.body.delegate("#data-click", "click", function () {
            self.carousel_radius_click($(this));
        });
    };
    carousel_function.prototype = {
        btn_next: function () {//本质：对div元素的移动过程
            var self = this;
            self.carousel_width = parseInt($(".carousel").css("width"));
            var carousel_left = -parseInt($(".carousel_img").css("left")) - self.carousel_width;
            var arr = carousel_left / self.carousel_width;
            $(".carousel_img").animate({"left": parseInt($(".carousel_img").css("left")) - self.carousel_width + "px"}, function () {
                self.carousel_check = true;
                if (parseInt($(".carousel_img").css("left")) < -self.carousel_width * 5) {
                    $(".carousel_img").css({
                        "left": -self.carousel_width + "px"
                    });
                }
            });
            if (arr == 4) {
                self.carousel_li_arr[4].setAttribute("class", "");
                arr = 0;
                self.carousel_li_arr[0].setAttribute("class", "carousel_active");
                self.arr_radius = arr;
            } else {
                self.carousel_li_arr[arr].setAttribute("class", "");
                self.carousel_li_arr[arr + 1].setAttribute("class", "carousel_active");
                self.arr_radius = arr + 1;
            }
        },
        btn_pre: function () {//本质：对div元素的移动过程
            var self = this;
            self.carousel_width = parseInt($(".carousel").css("width"));
            var carousel_left = -parseInt($(".carousel_img").css("left")) - self.carousel_width;
            self.carousel_width = parseInt($(".carousel").css("width"));
            var arr = carousel_left / self.carousel_width;
            $(".carousel_img").animate({"left": parseInt($(".carousel_img").css("left")) + self.carousel_width + "px"}, function () {
                self.carousel_check = true;
                if (parseInt($(".carousel_img").css("left")) > -self.carousel_width) {
                    $(".carousel_img").css({
                        "left": -self.carousel_width * 5 + "px"
                    });
                }
            });

            if (arr == 0) {
                self.carousel_li_arr[0].setAttribute("class", "");
                arr = 4;
                self.carousel_li_arr[4].setAttribute("class", "carousel_active");
                self.arr_radius = arr;
            } else {
                self.carousel_li_arr[arr].setAttribute("class", "");
                self.carousel_li_arr[arr - 1].setAttribute("class", "carousel_active");
                self.arr_radius = arr - 1;
            }

        },
        carousel_radius_click: function (data) {
            var self = this;
            var id = data.attr("data-radius");
            self.carousel_width = parseInt($(".carousel").css("width"));
            $(".carousel_img").css("width", self.carousel_width * 7 + "px");
            $(".carousel_img_auto").css("width", self.carousel_width + "px");
            self.carousel_li_arr[self.arr_radius].setAttribute("class", "");
            data.addClass("carousel_active");
            self.arr_radius = id - 1;
            $(".carousel_img").animate({"left": -id * self.carousel_width + "px"});
        },
        run_carousel: function () {
            var self = this;
            if (self.time_check) {
                self.btn_next();
                self.carousel_check = false;
            }
            setTimeout(function () {
                self.run_carousel();
            }, 3000);
        }
    }
    window['carousel_function'] = carousel_function;
})(jQuery);

// $(function(){
// 	var carousel=new carousel_function();
// });