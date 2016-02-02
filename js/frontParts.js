/**
 * SP front parts
 **/
;(function($){

	// tab
	if($(".tab--js").length > 0){
		$(".tab--js a").on("click",function(e){
			e.preventDefault();
			if($(this).parent().hasClass("tabs--list2") || $(this).parent().hasClass("tabs--list3")){
				var li = $(this).parent();
				var parent = $(this).parent().parent();
				var name = li.attr("class");
				var index = parent.find("li").index(li);
				parent.find("li").removeClass(name +'--active');
				parent.find("li").addClass(name);
				
				li.removeClass(name).addClass(name +'--active');
				parent.next().children().hide();
				parent.next().children().eq(index).show();
			}
		});
	}

	// switcher
	if($(".switcher--js").length > 0){
		var $swtclass,$swtid;
		// init
		$(".switcher--js li").addClass("on");
		$(".switcher--js li").eq(0).removeClass("on").addClass('off');
		$swtclass = $(".switcher--js li").eq(0).find('a').data('switcher-class');
		$swtid = $(".switcher--js li").eq(0).find('a').data('switcher-id');
		$("."+$swtclass).css({display: "none"});
		$("#"+$swtid).css({display: "block"});
		
		$(".switcher--js a").on("click",function(e){
			e.preventDefault();
			$(this).parent().parent().find("li").removeClass('off').addClass("on");
			$(this).parent().removeClass("on").addClass('off');

			$swtclass = $(this).data('switcher-class');
			$swtid = $(this).data('switcher-id');
			$("."+$swtclass).css({display: "none"});
			$("#"+$swtid).css({display: "block"});
		});
	}

	// banner slider
	if($('.banner__swipe__list').length > 1){
		$('.banner').addClass("swiper-container");
		$('.banner__swipe').addClass("swiper-wrapper");
		$('.banner__swipe__list').addClass("swiper-slide");
		$('.banner').append('<div class="swiper-pagination"></div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
		var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			slidesPerView: 1,
			paginationClickable: true,
			spaceBetween: 30,
			loop: true
		});
	}

	// checkbox
	if($('.checkbox').length > 0){
		$('.checkbox input:checked').parent().addClass("checkbox--colorRed");
		$('.checkbox input').on('change',function(e){
			if(!$(this).parent().hasClass('checkbox--colorRed')){
				$(this).parent().addClass("checkbox--colorRed");
				
				// select all
				if($(this).hasClass('checkbox--all--js')){
					$('.checkboxs--js , .checkbox--all--js').each(function(key,value){
						$(value).prop('checked','checked');
						$(value).parent().addClass("checkbox--colorRed");
					});
					$('.checkbox--all--js__check').css({display: "none"});
					$('.checkbox--all--js__out').css({display: "block"});
				}
			}else{
				$(this).parent().removeClass("checkbox--colorRed");

				// select all
				if($(this).hasClass('checkbox--all--js')){
					$('.checkboxs--js , .checkbox--all--js').each(function(key,value){
						$(value).prop('checked','');
						$(value).parent().removeClass("checkbox--colorRed");
					});
					$('.checkbox--all--js__check').css({display: "block"});
					$('.checkbox--all--js__out').css({display: "none"});
				}
			}
		});
	}

	// over layer
	if($('.overlayer').length > 0){
		var	$overlayerNoId		= $('.overlayer:not([id])');
		var	$overlayerbg	= $overlayerNoId.find('.overlayer__bg');
		var	$overlayerframe	= $overlayerNoId.find('.overlayer__frame');
		var $overlayerW = window.innerWidth ? window.innerWidth : $(window).width();
		var $overlayerH = $('body').height();

		var $overlayerJs = $(".overlayer--js");
		$overlayerJs.each(function(){
			var dataName = $(this).attr('data-name');

			// if use id
			if(dataName){
				// show object id in data-name
				var $target = $('#' + dataName);
				var $childOverlayer = $target;
				var $childOverlayerbg = $target.find('.overlayer__bg');
				var $childOverlayerframe = $target.find('.overlayer__frame');
				var isPositionAbs = $childOverlayerframe.hasClass('overlayer__frame--abs');


				$(this).on('click',function(e){
					e.preventDefault();
					var bgheight = $overlayerH;
					var frameTopDistance = 21;
					var frameBottomMargin = 10;
					var topPos = frameTopDistance;
					var scrollTop = $(window).scrollTop();

					if(isPositionAbs) {
						topPos = (scrollTop + frameTopDistance);
					}

					$childOverlayerbg.width($('body').width()).height($overlayerH);
					$childOverlayerbg.css({display: "block"});
					$childOverlayerframe.css({top: topPos});
					$childOverlayerframe.animate({scale: 1},{duration: 150, easing: 'ease-out', delay: 200,complete: function(){
						if(isPositionAbs) {
							var frameHeight = $childOverlayerframe.height();
							if(scrollTop + frameHeight + frameTopDistance + frameBottomMargin > $overlayerH){
								bgheight = scrollTop + frameHeight + frameTopDistance + frameBottomMargin;
								$childOverlayerbg.height(bgheight);
							}
						}
					}});
					$childOverlayer.addClass('open');

					registerCloseButton({
						$bg : $childOverlayerbg,
						$frame : $childOverlayerframe,
						$overlayer : $childOverlayer
					});
				});
			} else {
				// if not use id data-name, show set data
				$(this).on('click',function(e){
					e.preventDefault();
					$overlayerW = window.innerWidth ? window.innerWidth : $(window).width();
					$overlayerH = $('body').height();

					$overlayerbg.width($overlayerW).height($overlayerH);
					// check set data
					if($(this).find('[data-content]').length > 0){
						setDataOverlayer($(this).find('[data-content]').children());
					}

					$overlayerbg.css({display: "block"});
					$overlayerframe.animate({scale: 1},{duration: 150, easing: 'ease-out', delay: 200});
					$overlayerNoId.addClass('open');
				});

				registerCloseButton({
					$bg : $overlayerbg,
					$frame : $overlayerframe,
					$overlayer : $overlayerNoId
				});
			}
		});


		// hide
		function registerCloseButton(obj) {
			var $clickTarget = obj.$overlayer.find('.overlayer__frame__close , .overlayer__bg');
			$clickTarget.on('click', function (e) {
				e.preventDefault();
				obj.$bg.css({display: "none"});
				obj.$frame.animate({scale: 0}, {duration: 200, easing: 'ease-out'});
				obj.$overlayer.removeClass('open');
			});
		}

		// set data in over layer
		function setDataOverlayer(values){
			$.each(values ,function(key,value){
				if($(value).hasClass('text')){
					$overlayerNoId.find('[data-name="'+$(value).data('name')+'"]').html($(value).text())
				}
				if($(value).hasClass('class')){
					$overlayerNoId.find('[data-name="'+$(value).data('name')+'"]').attr({'class': $(value).data('class')})
				}
				if($(value).hasClass('img')){
					var img = '<img src="'+$(value).text()+'" width="'+$(value).data('width')+'" height="'+$(value).data('height')+'">';
					$overlayerNoId.find('[data-name="'+$(value).data('name')+'"]').html(img);
				}
				if($(value).hasClass('link')){
					$overlayerNoId.find('[data-name="'+$(value).data('name')+'"]').attr({href: $(value).text()})
				}
			});
		}

		// init over layer
		if($overlayerNoId.hasClass('initOpen')){
			setTimeout(function(){
				$overlayerW = window.innerWidth ? window.innerWidth : $(window).width();
				$overlayerH = $('body').height();
				$overlayerbg.width($overlayerW).height($overlayerH);
				$overlayerbg.css({display: "block"});
				$overlayerframe.animate({scale: 1},{duration: 150, easing: 'ease-out', delay: 200});
				$overlayerNoId.addClass('open');
			},200);
		}
	}

	// sound play
	if($('[data-audio]').length > 0){
		var $bgm = new Audio();

		$('[data-audio]').each(function(key,value){
			$(value).on('click',function(e){
				e.preventDefault();
				$bgm.src = $(value).data('audio');
				$bgm.pause();
//				$bgm.currentTime = 0;
				$bgm.play();
			});
		});
	}

	// toggel
	if($('.toggle--js').length > 0){
		$('.toggle--js').on('click' , function(e){
			e.preventDefault();
			if($(this).hasClass('open')){
				$(this).removeClass("open");
//				$("." + $(this).data('toggle-class')).toggle();
			}else{
				$(this).addClass("open");
				$(this).data('toggle-class');
			}
				$("." + $(this).data('toggle-class')).toggle();
		});
	}

	// banner slider
	if($('.buttonScroll').length > 0){
		var swiper = new Swiper('.buttonScroll__inner', {
			direction: 'vertical',
			slidesPerView: 3
		});
	}

	// count down
	if($('.countDown--js').length > 0){
		// create countDown class
		var countDown = function(elements){
			this.elements = elements;
			this.count= 0;
			if(this.elements.fromdate.length > 0){
				this.objfrom = new Date(this.elements.fromdate);
			}else{
				this.objfrom = new Date();
			}
			this.objto = new Date(this.elements.todate);

			// exe count down
			this.countStart = function(){
				var text	=	'';
				var day		= Math.floor((this.objto-this.objfrom-this.count)/(24*60*60*1000));
				var hour	= Math.floor(((this.objto-this.objfrom-this.count)%(24*60*60*1000))/(60*60*1000));
				var min		= Math.floor(((this.objto-this.objfrom-this.count)%(24*60*60*1000))/(60*1000))%60;
				var sec		= Math.floor(((this.objto-this.objfrom-this.count)%(24*60*60*1000))/1000)%60%60;
				var milli	= Math.floor(((this.objto-this.objfrom-this.count)%(24*60*60*1000))/10)%100;
				var $_this	= this;

				if((this.objto-this.objfrom-this.count) > 0){
					if(day) text += day+'日';
					if(hour) text += hour+'時間';
					if(min) text += this.formatZero(min)+'分';
					text += this.formatZero(sec)+'秒';
					text = this.elements.format.replace("time",text);
					this.elements.target.html(text);

					setTimeout(function(){
						$_this.count += 1000;
						$_this.countStart();
					},1000);
				}else{
					this.elements.target.html(this.elements.message);
					return;
				}
			}
			this.formatZero = function(num){
				return ('0'+num).slice(-2);
			}
		}

		// create object
		$('.countDown--js').each(function(){
			var elem = {};
			elem.format		= $(this).data('ctd-format');
			elem.fromdate	= $(this).data('ctd-fromdate');
			elem.todate	= $(this).data('ctd-todate');
			elem.message	= $(this).data('ctd-message');
			elem.target		= $(this);
			var objCtd = new countDown(elem);
			objCtd.countStart();
		});
	}

	// accordion
	(function(){
		$accordion = $('.accordion');
		if($accordion.length === 0) return;

		var buttonOpenClass = 'accordion__button--open';
		var contentsHideClass = 'accordion__contents--hidden';

		$accordion.find('.accordion__button').each(function(){
			$this = $(this);
			$this.on('click',function(e){
				e.preventDefault();
				var $next = $(this).next();
				$(this).toggleClass(buttonOpenClass);

				if(!$next.hasClass(contentsHideClass)){
					// hide
					$next.velocity({
						height: 0
					},250,'swing',function(){
						$next.removeAttr('style');
						$next.toggleClass(contentsHideClass);
					});
				} else {
					// show
					$next.toggleClass(contentsHideClass);
					var height = $next.height();
					$next.css({
						height: 0
					});

					$next.velocity({
						height: height
					},250,'swing',function(){
						$next.removeAttr('style');
					});
				}

			})
		});

	})();
})(Zepto);