/**弹幕**/
(function($) {
	//定义Tablesort的构造函数
	var Barrage = function(ele, opt) {
			this.$element = ele,
				this.defaults = {
					'message': '', //信息
					'verticalSpacing': 50, //行间距
					'top':0//离顶部距离
				},
				this.options = $.extend({}, this.defaults, opt)
		}
		//定义Tablesort的方法
	Barrage.prototype = {
		init:function(){
			var $this = this;
			$this.prin();
		},
		prin: function() {
			var DIV = this.$element;
			var $this = this; 
			var messageDiv = $("<div></div>");
			messageDiv.addClass("b-message").text($this.options.message);
			DIV.append(messageDiv);
			
			var divWidth = DIV.width();
			var divHeight = DIV.height();
			var messageWidth = messageDiv.width();
			var messageHeight = messageDiv.height();
			
			var top =$this.options.top+$this.options.verticalSpacing;
			if(top+messageHeight>divHeight){top=50}
			
			$this.options.top=top;
			
			var color = $this.getRandomColor();
			messageDiv.css("left",(divWidth-messageWidth)+"px");
			messageDiv.css("top",top+"px");
			messageDiv.css("color",color);
			
			messageDiv.animate({left:-messageWidth+"px"},6000,function(){
				messageDiv.remove();
			});
		},
		add:function(option){
			var $this = this;
			var opt = this.options;
			this.options = $.extend({}, opt, option);
			$this.prin();
		},
		getRandomColor:function(){
			return '#' + (function(h) {
				return new Array(7 - h.length).join("0") + h
			})((Math.random() * 0x1000000 << 0).toString(16));
		},
		clear:function(){
			console.log("clear");
			this.$element.html('');
		}
	

	}

	$.fn.barrage = function(options) {
		var barrage = new Barrage(this, options);
		barrage.init();
		return barrage;
	}
})(jQuery);