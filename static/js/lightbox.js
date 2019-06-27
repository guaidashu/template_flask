;(function ($) {
    var Lightbox = function () {
        var self = this;
        //遮罩和弹出框
        this.mask = $('<div id="lightbox_mask">');
        this.envelop = $('<div id="lightbox_envelop">');
        this.groupName = null;
        this.groupData = [];
        this.body = $(document.body);
        //渲染剩余的Dom插入到body对象
        this.render();
        this.picViewArea = this.envelop.find("div.lightbox_picture");//图片预览区域
        this.popupPic = this.envelop.find("img.lightbox_image");//图片
        this.picCaptionArea = this.envelop.find("div.lightbox_caption_area");

        this.nextBtn = this.envelop.find("span.lightbox_next_btn");
        this.preBtn = this.envelop.find("span.lightbox_pre_btn");
        this.caption_text = this.envelop.find("p.lightbox_pic_desc");
        this.caption_Index = this.envelop.find("span.lightbox_of_index");
        this.closeBtn = this.envelop.find("span.lightbox_caption_close");


        this.body.delegate(".js-lightbox,*[data-role=lightbox]", "click", function (e) {
            e.stopPropagation();
            var crrentGroupName = $(this).attr("data-group");
            if (crrentGroupName != self.groupName) {
                self.groupName = crrentGroupName;
                self.getGroup();

            }
            self.initenvelop($(this));//初始化弹框

        });
        //关闭弹出框
        self.mask.click(function () {
            $(this).fadeOut();
            self.envelop.fadeOut();
        });
        self.closeBtn.click(function () {
            self.mask.fadeOut();
            self.envelop.fadeOut();
        });
        //绑定上下切换按钮事件
        this.flag = true;
        self.nextBtn.hover(function () {
            if (!$(this).hasClass("disabled") && self.groupData.length > 1) {
                $(this).addClass("lightbox_next_btn_show");
                $(".lightbox_next_btn_show").css("background", "url(/images/next.png) no-repeat right center");
            }
            ;

        }, function () {
            if (!$(this).hasClass("disabled") && self.groupData.length > 1) {
                $(this).removeClass("lightbox_next_btn_show");
                $(".lightbox_next_btn").css("background", "");
            }
        }).click(function (e) {

            if (!$(this).hasClass("disabled") && self.flag) {
                self.flag = false;
                e.stopPropagation();
                self.goto_1("next");//上下切换图片
                $(".lightbox_next_btn").css("background", "");
            }
        });


        self.preBtn.hover(function () {
            if (!$(this).hasClass("disabled") && self.groupData.length > 1) {
                $(this).addClass("lightbox_pre_btn_show");
                $(".lightbox_pre_btn_show").css("background", "url(/images/prev.png) no-repeat left center");
            }
            ;

        }, function () {
            if (!$(this).hasClass("disabled") && self.groupData.length > 1) {
                $(this).removeClass("lightbox_pre_btn_show");
                $(".lightbox_pre_btn").css("background", "");
            }
        }).click(function (e) {
            if (!$(this).hasClass("disabled") && self.flag) {
                self.flag = false;
                e.stopPropagation();
                self.goto_1("pre");
                $(".lightbox_pre_btn").css("background", "");
            }
        });
    };


    Lightbox.prototype =
        {
            goto_1: function (dir) {
                var self = this;
                if (dir == "next") {
                    this.index++;
                    if (this.index >= this.groupData.length - 1) {
                        this.nextBtn.addClass("disabled").removeClass("lightbox_next_btn_show");

                    }
                    ;
                    if (this.index != 0) {
                        this.preBtn.removeClass("disabled");
                    }
                    ;
                    var src = this.groupData[this.index].src;//获取图片名称和地址
                    this.loadPicSize(src);//此方法用来传递原图地址
                }
                else if (dir === "pre") {
                    this.index--;
                    if (this.index <= 0) {
                        this.preBtn.addClass("disabled").removeClass("lightbox_pre_btn_show");
                    }
                    ;
                    if (this.index != this.groupData.length - 1) {
                        this.nextBtn.removeClass("disabled");

                    }
                    ;
                    var src = this.groupData[this.index].src;//获取图片名称和地址
                    this.loadPicSize(src);//此方法用来传递原图地址
                }
                ;
            },
            initenvelop: function (curentObj) {
                var self = this,
                    sourceSrc = curentObj.attr("data-source"),
                    currentId = curentObj.attr("data-id");

                this.showMaskAndEnvelop(sourceSrc, currentId);

            },
            getIndexOf: function (currentId) {
                var self = this;
                var index = 0;
                $(self.groupData).each(function (i) {

                    index = i;
                    if (this.id === currentId) {
                        return false;
                    }
                    ;
                });

                return index;
            },


            showMaskAndEnvelop: function (sourceSrc, currentId) {
                var self = this;
                $(".lightbox_image").hide();
                $(".lightbox_caption_area").hide();

                this.mask.fadeIn();
                this.envelop.fadeIn();


                var winWidth = $(document).width();//保存宽度
                // var winHeight=$(document).height();//保存高度
                var winHeight = window.innerHeight;
                // yy_init(winHeight);
                // 弹出框动画出现效果
                this.picViewArea.css({
                    width: winWidth / 2,
                    height: winHeight / 2
                });

                var viewHeight = winHeight / 2 + 20;

                this.envelop.css({
                    width: winWidth / 2 + 10,
                    height: winHeight / 2 + 10,
                    marginLeft: -(winWidth / 2 + 10) / 2,
                    top: -viewHeight
                }).animate({
                    top: (winHeight - viewHeight) / 2
                }, function () {
                    //获取图片
                    self.loadPicSize(sourceSrc);
                });
                //弹出框动画出现效果end
                //根据当前点击的元素id获取当前组别离的索引
                this.index = this.getIndexOf(currentId);
                //索引获取end
                var groupDataLength = this.groupData.length;
                if (groupDataLength > 1) {
                    if (this.index === 0) {
                        this.preBtn.addClass("disabled");
                        this.nextBtn.removeClass("disabled");
                    } else if (this.index === groupDataLength - 1) {
                        this.preBtn.removeClass("disabled");
                        this.nextBtn.addClass("disabled");
                    }
                    else {
                        this.preBtn.removeClass("disabled");
                        this.nextBtn.removeClass("disabled");
                    }
                    ;

                }
                ;

            },//函数结束
            //获取图片函数
            loadPicSize: function (sourceSrc) {
                var self = this;
                self.popupPic.css({
                    width: "auto", height: "auto"
                }).hide();
                this.preLoadImg(sourceSrc, function () {
                    self.popupPic.attr("src", sourceSrc);
                    var picWidth = self.popupPic.width(),
                        picHeight = self.popupPic.height();
                    self.changePic(picWidth, picHeight);
                });
            },


            changePic: function (width, height) {
                var self = this,
                    winWidth = $(document).width(),
                    winHeight = window.innerHeight;
                //如果图片宽高大禹浏览器视口的宽高比例,是否溢出
                var scale = Math.min(winWidth / (width + 10), winHeight / (height + 10), 1);
                width = width * scale;
                height = height * scale;
                this.picViewArea.animate({
                    width: width - 10,
                    height: height - 10
                });

                this.envelop.animate({
                    width: width,
                    height: height,
                    marginLeft: -(width / 2),
                    top: (winHeight - height) / 2
                }, function () {//给图片设置高度宽度
                    self.popupPic.css({
                        width: width - 10,
                        height: height - 10,
                    }).fadeIn();
                    self.picCaptionArea.fadeIn();
                    self.flag = true;
                });
                //设置当前文字和索引
                // self.caption_text.text(this.groupData[this.index].caption);
                // self.caption_Index.text("当前索引: " + (this.index + 1) + " of " + this.groupData.length);
            },
            preLoadImg: function (src, callback) {
                var img = new Image();
                if (!!window.ActioveObject) {
                    img.onreadystatechange = function () {
                        if (this.readyState == "complete") {
                            callback();
                        }
                        ;
                    };
                }
                else {
                    img.onload = function () {
                        callback();
                    };
                }
                ;
                img.src = src;

            },
            getGroup: function () {
                var self = this;
                var groupList = this.body.find("*[data-group=" + this.groupName + "]");


                self.groupData.length = 0;

                //遍历数组获取所有元素
                groupList.each(function () {

                    self.groupData.push({
                        src: $(this).attr("data-source"),
                        id: $(this).attr("data-id"),
                        caption: $(this).attr("data-caption")
                    });

                });


            },


            render: function () {//显示遮罩层和弹出框
                var str_1 = '<div class="lightbox_picture">' +
                    '<span class="lightbox_btn lightbox_pre_btn"></span>' +
                    '<img src="" class="lightbox_image">' +
                    '<span class="lightbox_btn lightbox_next_btn"></span>' +
                    '</div>' +
                    '<div class="lightbox_caption">' +
                    '<div class="lightbox_caption_area">' +
                    // '<p class="lightbox_pic_desc"> 图片标题</p>' +
                    // '<span class="lightbox_of_index">当前索引1 of 4</span>' +
                    '</div>' +
                    '<span class="lightbox_caption_close">' +
                    '<img src="/images/close.png">' +
                    '</span>' +
                    '</div>';
                this.envelop.html(str_1);
                this.body.append(this.mask, this.envelop);

                $(".lightbox_picture").css("background", "url(/images/loading.gif) no-repeat center center");

            },
        };
    window["Lightbox"] = Lightbox;

})(jQuery);
$(function () {
    var example = new Lightbox();
});