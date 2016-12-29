var appSite = {
	init:function(){
		appSite.bindOpenMap();
		appSite.bind2gisMap();
		appSite.bindOffers();
		appSite.bindFeedback();
		appSite.bindSeoCardSlider();
		appSite.bindOpenForm('[data-form-type]');
		appSite.bindFormSteps();
	},
	initReady:function(){
		$(window).load(function(){
			appSite.init();
		});
	},
	bindFormStepWait:function(rStep){
		var sAttr = 'data-form-step-wait';
		var sWait = rStep.next().attr(sAttr);
		if (sWait) {
			var rStepW = $('['+sAttr+']');
			var rWaitTm = setTimeout(function(){
				rStepW.addClass('invisible');
				rStepW.next().removeClass('invisible');
			},2000);
		}

	},
	bindFormSteps:function(){

		var rButtonNext = $('[data-form-step-next]');
		var rButtonPrev = $('[data-form-step-prev]');

		rButtonNext.unbind('submit');
		rButtonNext.click(function(){
			var rThis = $(this);
			var rStep = rThis.parents('[data-form-step]');
			rStep.addClass('invisible');
			rStep.next().removeClass('invisible');
			appSite.bindFormStepWait(rStep);
			return false;
		});

		rButtonPrev.unbind('submit');
		rButtonPrev.click(function(){
			var rThis = $(this);
			var rStep = rThis.parents('[data-form-step]');
			rStep.addClass('invisible');
			rStep.prev().removeClass('invisible');
			return false;
		});

	},
	bindOpenForm:function(sEl){
		var rScreenCover = $('.screen-cover');
		var rElement = $(sEl);
		rElement.click(function(){
			var rThis = $(this);
			var formtype = rThis.attr("data-form-type");
			$(formtype).fadeIn(200);
			rScreenCover.fadeIn(200);
			return false;
		});
		$('.form__close').click(function(){
			$(this).parents('[data-modal-form]').css('display','none');
			rScreenCover.css('display','none');
			return false;
		});
	},
	bind2gisMap:function(){
		var map;
			DG.then(function () {
				map = DG.map('map', {
					center: [54.98, 82.89],
					zoom: 13,
					scrollWheelZoom: false
				});
			});

	},
	bindSeoCardSlider:function(){
		  $('.seo-cards__slider').slick({
				infinite: false,
			  	adaptiveHeight: true,
				prevArrow: '.seo-cards-prev',
			  	nextArrow: '.seo-cards-next',
			});
	},
	bindFeedback:function(){
		  $('.feedback-carousel').slick({
				infinite: false,
			  	adaptiveHeight: true,
				prevArrow: '.feedback-prev',
			  	nextArrow: '.feedback-next',
			});
	},
	bindOffers:function(){
		  $('.offers-carousel').slick({
				infinite: false,
				slidesToShow: 4,
				slidesToScroll: 4,
			  	adaptiveHeight: true,
			  	prevArrow: '.offers-prev',
			  	nextArrow: '.offers-next',
			});
	},
	bindOpenMap:function(){
		var rMap = $('[data-open-map]');
		rMap.click(function(){
			console.log("click");
			var rThis = $(this);
			appSite.openMapBlock(rThis);
		});
	},
	openMapBlock:function(rThis) {
		var sUri = rThis.attr('href');
		var aCoord = rThis.attr("data-open-map").split(",");
						console.log("fancy");
        try {
            $.fancybox({
                "padding": 0,
				'scrolling': 'no',
                "centerOnScroll": true,
                "autoDimensions": true,
                "titlePosition": "inside",
                "autoResize": true,
                "href": sUri,
                'beforeShow': function() {
					appSite.openMap(aCoord, sUri);
                }
            });
        } catch(e) {
				console.log("fancyerror");
			}
	},
	openMap:function(aMapCoord, sUri){

                    try {

                        ymaps.ready(function () {
                            var rMapSite = $(sUri);
                            if ( rMapSite.is('div') ) {
								rMapSite.empty();
                                var iMapZoom = 17;
                                var sMapCoordAttr = $.trim( rMapSite.data('map-coords') );
                                if (sMapCoordAttr !== '') {
                                    var aMapCoordAttr = sMapCoordAttr.split(',');
                                    if (aMapCoordAttr[0] && aMapCoordAttr[1]) {
                                        aMapCoord = [aMapCoordAttr[0], aMapCoordAttr[1]];
                                    }
                                }
                                var sMapZoomAttr = parseInt(rMapSite.data('map-zoom'));
                                if (sMapZoomAttr) {
                                    iMapZoom = sMapZoomAttr;
                                }
                                var myMap = new ymaps.Map('houses-modal-map', {
                                    center: aMapCoord,
                                    zoom: iMapZoom,
                                    type: 'yandex#satellite',
                                }, {
                                    //searchControlProvider: 'yandex#satellite',
                                }),

                                myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                                    hintContent: rMapSite.data('map-title'),
                                    balloonContent: rMapSite.data('map-descr')
                                }, {
                                    // Опции.
                                    // Необходимо указать данный тип макета.
                                    iconLayout: 'default#image',
                                    // Своё изображение иконки метки.
                                    iconImageHref: '/img/ava.png',
                                    // Размеры метки.
                                    iconImageSize: [50, 50],
                                    // Смещение левого верхнего угла иконки относительно
                                    // её "ножки" (точки привязки).
                                    iconImageOffset: [-25, -70]
                                });

                                myMap.geoObjects.add(myPlacemark);
                                myMap.controls.add(new ymaps.control.SmallZoomControl () );
                                myMap.behaviors.disable('drag');

                            }
                        });
                    } catch(e) {

                    }

                            //map.setCenter(new YMaps.GeoPoint(9.19484,45.46844), 17);
                            //s.iconStyle.href = "/img/404.png";



	}
};
appSite.initReady();
