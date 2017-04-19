var slider = function(obj){
	this.el = obj.el;
	this.isdebug = obj.isdebug;
	this.speed = obj.speed;
	this.triggerdis = obj.triggerdis;
	this.timecell = obj.timecell;
	this.init();
}

slider.prototype={
	init:function(){
		var self = this;
		$(self.el).height($(window).height());
		$(self.el).find(".pagebox").height($(window).height());
		//初始化第一屏动画

		self.animate(1);
		self.lazyLoad({
			container: $(self.el).eq(1)
		});
		self.moveEvent();
		//清除时间间隔缓存
		if(localStorage.timecell){
			localStorage.timecell = 0;
		}
	},
	log:function(a){
		var self = this;
		if (self.isdebug) {
            console.log(a);
            $(".show").html(a);
        }
	},
	//执行动画,传入index
	animate:function(index){
		var self = this;
		//先移除所有动画样式，再给每一屏加进去，有几屏动画就有几个case，注意动画的class要先移除
		(function () {
			$(".box_con").removeClass("fadeInLeft fadeInRight animated fadeInRotate fadeInScale fadeInFlicker fadeInTurn fadeInLtxz fadeInUpDown fadeInSkew delay3 delay6 delay9 delay12 delay15 delay18");
		})();
		// console.log(index);
		switch (index) {
			case 1:
			    $(".box_con11").addClass("fadeInLeft animated");
			    $(".box_con12").addClass("fadeInRight animated delay3");
			    $(".box_con13").addClass("fadeInLeft animated delay6");
			    $(".box_con14").addClass("fadeInRight animated delay9");
			    $(".box_con15").addClass("fadeInLeft animated delay12");
			    $(".box_con16").addClass("fadeInRight animated delay15");
			    $(".box_con17").addClass("fadeInLeft animated delay18");
			    $('.page'+index).find('.box_con').show();
			break;
			case 2:
			    $(".box_con21").addClass("fadeInRotate animated");
			    $(".box_con22").addClass("fadeInRotate animated delay3");
			    $(".box_con23").addClass("fadeInRotate animated delay6");
			    $(".box_con24").addClass("fadeInRotate animated delay9");
			    $(".box_con25").addClass("fadeInRotate animated delay12");
			    $('.page'+index).find('.box_con').show();
			break;
			case 3:
			    $(".box_con31").addClass("fadeInScale animated");
			    $(".box_con32").addClass("fadeInScale animated delay3");
			    $(".box_con33").addClass("fadeInScale animated delay6");
			    $(".box_con34").addClass("fadeInScale animated delay9");
			    $(".box_con35").addClass("fadeInScale animated delay12");
			    $('.page'+index).find('.box_con').show();
			break;
			case 4:
			    $(".box_con41").addClass("fadeInFlicker animated");
			    $(".box_con42").addClass("fadeInFlicker animated delay3");
			    $(".box_con43").addClass("fadeInFlicker animated delay6");
			    $(".box_con44").addClass("fadeInFlicker animated delay9");
			    $(".box_con45").addClass("fadeInFlicker animated delay12");
			    $('.page'+index).find('.box_con').show();
			break;
			case 5:
			    $(".box_con51").addClass("fadeInTurn animated");
			    $(".box_con52").addClass("fadeInTurn animated delay3");
			    $(".box_con53").addClass("fadeInTurn animated delay6");
			    $(".box_con54").addClass("fadeInTurn animated delay9");
			    $(".box_con55").addClass("fadeInTurn animated delay12");
			    $('.page'+index).find('.box_con').show();
			break;
			case 6:
			    $(".box_con61").addClass("fadeInLtxz animated");
			    $(".box_con62").addClass("fadeInLtxz animated delay3");
			    $(".box_con63").addClass("fadeInLtxz animated delay6");
			    $(".box_con64").addClass("fadeInLtxz animated delay9");
			    $(".box_con65").addClass("fadeInLtxz animated delay12");
			    $('.page'+index).find('.box_con').show();
			break;
			case 7:
			    $(".box_con71").addClass("fadeInUpDown animated");
			    $(".box_con72").addClass("fadeInUpDown animated delay3");
			    $(".box_con73").addClass("fadeInUpDown animated delay6");
			    $(".box_con74").addClass("fadeInUpDown animated delay9");
			    $(".box_con75").addClass("fadeInUpDown animated delay12");
			    $('.page'+index).find('.box_con').show();
			break;
			case 8:
			    $(".box_con81").addClass("fadeInSkew animated");
			    $(".box_con82").addClass("fadeInSkew animated delay3");
			    $(".box_con83").addClass("fadeInSkew animated delay6");
			    $(".box_con84").addClass("fadeInSkew animated delay9");
			    $(".box_con85").addClass("fadeInSkew animated delay12");
			    $('.page'+index).find('.box_con').show();
			break;
		}
	},
	//判断滑动方向及滑动距离
	moveEvent:function(){
		var self = this;
		//定义一个存储滑动状态信息的对象
		var _move = {
	        dis: 0, //触摸的方向，大于0为向上
	        dir: 0, //手指划过的距离
	        touchtime: 0, //触摸的次数，避免多指触摸
	        index: 0, //当前滚屏的索引值
	        per: 0, //滚动时候改变高度的百分比
	        timecell:0  //滑动操作的时间间隔
	    };

	    var _touch = {
	    	touch:function(cla,index){
	    		var y1 = 0,y2 = 0;
	    		//触摸开始监听事件
	    		console.log($(cla));
	    		$(cla)[0].addEventListener('touchstart', function (e) {
	    			console.log(e);
	    			//如果按下的触摸对象是带链接的元素，则不执行滑动事件
		            if(e.targetTouches[0].target.className.indexOf("url-div")>-1){
		                return false;
		            }
		            if(!localStorage.timecell){
		            	localStorage.timecell = (new Date()).getTime();
		            }else{
		            	_move.timecell = (new Date()).getTime() - localStorage.timecell;
		            	localStorage.timecell = (new Date()).getTime();
		            	console.log(_move.timecell);
		            	if(_move.timecell<self.timecell){
		            		return false;
		            	}
		            }
		            _move.index = index; //按下的时候记录索引值，阻止默认事件
		            e.preventDefault();
		            y1 = e.targetTouches[0].pageY;
		            _move.dis = 0;
		            _move.dir = 0;
		            _move.touchtime += 1;
		            //触摸开始时懒加载,提前两屏

                });
                
                ////触摸结束监听事件
                $(cla)[0].addEventListener('touchend', function (e) {
		            if(e.changedTouches[0].target.className.indexOf("url-div")>-1){
		                return false;
		            }
		            if(_move.timecell<self.timecell){
		            	return false;
		            }
	                y2 = e.changedTouches[0].pageY;
	           		 _move.dis = y2 - y1;
	            	$(cla).next(self.el) ? self.lazyLoad({
	              		container: $(cla).next(self.el).next(self.el)
	           		 }) : "";
	            	// 判断几个点触摸，大于2个的时候不执行后续操作
		            if (_move.touchtime >= 2) {
		                _move.touchtime = 0;
		                return false;
		            }
	                //e.preventDefault();
	                _move.touchtime = 0;
	                console.log(_move);
	                if(Math.abs(_move.dis)<self.triggerdis){
	                	//点击翻页
	                	if(e.changedTouches[0].target.className.indexOf("pagecode")>-1){
	                		if(_move.index<$(self.el).length){
	                			$(cla).removeClass("fadeInDown animated").addClass("fadeOutUp animated");
	                			setTimeout(function () {
			                  		self.animate(index+1);
			                  		$(cla).find('.box_con').hide();
			                	}, 1000);
	                		}else if(_move.index==$(self.el).length){
	                			$(cla).css('z-index','99');
								setTimeout(function(){
									$(cla).css('z-index','11');
									$(cla).removeClass("fadeOutUp animated");
								},1000);
								$(self.el).removeClass("fadeOutUp animated");
							    $(cla).removeClass("fadeInDown animated").addClass("fadeOutUp animated");
							    setTimeout(function () {
			                  		self.animate(1);
			                  		$(cla).find('.box_con').hide();
			                	}, 1000);
	                		}
	                	}else{
	                		return false;
	                	}
	                }
		            if (_move.dis < 0) {
						//向上滑，滚至下一张
						if ($(cla).next(self.el).length > 0) {
						    $(cla).removeClass("fadeInDown animated").addClass("fadeOutUp animated");
						    setTimeout(function () {
		                  		self.animate(index+1);
		                  		$(cla).find('.box_con').hide();
		                	}, 1000);
						}
						if ($(cla).next(self.el).length <= 0) {
							$(cla).css('z-index','99');
							setTimeout(function(){
								$(cla).css('z-index','11');
								$(cla).removeClass("fadeOutUp animated");
							},1000);
							$(self.el).removeClass("fadeOutUp animated");
						    $(cla).removeClass("fadeInDown animated").addClass("fadeOutUp animated");
						    setTimeout(function () {
		                  		self.animate(1);
		                  		$(cla).find('.box_con').hide();
		                	}, 1000);
						}
						
		            } else if (_move.dis > 0) {
		                //向下滑
		                if ($(cla).prev(self.el).length > 0) {
		                	$(cla).prev(self.el).removeClass("fadeOutUp").addClass("fadeInDown animated");
		                	setTimeout(function () {
		                  		self.animate(index-1);
		                  		$(cla).find('.box_con').hide();
		                	}, 1000);
		                }
		            }
	            });

	     		//正在触摸的期间，触摸多少距离，容器的高度就减小多少距离，高度按百分比来计算
				$(cla)[0].addEventListener('touchmove', function (e) {
					e.preventDefault();
					if(e.targetTouches[0].target.className.indexOf("url-div")>-1){
				  		return false;
					}
					if (_move.touchtime >= 2) {
					  return false;
					}
				}); 
	    	},
	    	init:function(){
	    		//通过循环给每一屏绑定触摸事件,注意节点的角标序号
				for (var i = 1; i <= $(self.el).length; i++) {
					this.touch(".page" + i, i);
				}

				// $(".to_link").on("tap", function () {
				// 	var url = $(this).attr("href");
				// 	location.href = url;
				// });
				// $(".movie_icon").on("tap", function () {
				// 	var url = $(this).attr("href");
				// 	location.href = url;
				// });
	    	}
	    };

	    _touch.init();

	},
	lazyLoad:function(obj){
		var self = this;
		var lazyload = function (obj) {
		    this.con = obj.container || $("body");
		    this.nodename = obj.node || ".lazyload";
		    this.init = function () {
				var _self = this;
				//懒加载背景图
				//懒加载img图
				this.con.find(_self.nodename).each(function () {
				var src = $(this).attr("data-src");
				var bg = $(this).attr("data-bg");
				self.log(bg);
				bg ? $(this).css("background-image", "url(" + bg + ")") : "";
				src ? $(this).attr('src', src) : "";
				});
				delete this;
		    }
		    this.init();
		};
		new lazyload(obj);
	}

}

//console.log(slider());
new slider({
	el: ".page", //每一屏节点的容器名
    isdebug: false, //开启debug模式
    speed: 0.5, //滑屏动画的时间
    triggerdis: 50, //滑屏多少像素后有效，小于这个值将回退到初始状态
    timecell: 50//滑屏间隔时间，小于该时间不执行操作
});