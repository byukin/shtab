var appSite = {
	init:function(){
		appSite.bindOpenMap();
		appSite.bind2gisMap();
	},
	initReady:function(){
		$(window).load(function(){
			appSite.init();
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
