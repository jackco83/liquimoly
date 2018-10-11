jQuery(document).ready(function(){

  var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  if(isMobile.any()) {
    // accordion home-productos movil
    jQuery('.home-productos .row > div > h3').on("click", function() {
      jQuery(this).toggleClass("activo").next('ul').slideToggle();
    });

    // accordion lista-submenu movil
    jQuery('.menu-main .lista-submenu > ul > li > a').on("click", function() {
      jQuery(this).toggleClass("activo").next('.lista-submenu2').slideToggle();
    });

    // menu-movil
    jQuery('.menu-movil').on('click', function(e){
      e.preventDefault();
      jQuery(this).toggleClass('activo');
      jQuery('.menu-main').toggleClass('activo');
      jQuery('.submenu').removeClass('activo');
    });

    // submenu
    jQuery('.submenu').on('click', function(e){
      e.preventDefault();
      jQuery(this).addClass('activo');
    });

    // reg-menu
    jQuery(document).on('click', '.reg-menu', function(e){
      e.preventDefault();
      jQuery('.submenu').removeClass('activo');
    });

    // filtrar
    jQuery('.filtrar').on('click', function(e){
      e.preventDefault();
      jQuery('.filtro-mov').addClass('activo');
    });

    // filtrar-estable
    jQuery('.filtrar-estable').on('click', function(e){
      e.preventDefault();
      jQuery('.filtro-mov').removeClass('activo');
    });
  }

  // slider main
  if(jQuery('.slider-main').is('*')){
    jQuery('.slider-main').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: '<a href="#" class="slick-prev"><span class="fas fa-chevron-left" aria-hidden="true"></span></a>',
      nextArrow: '<a href="#" class="slick-next"><span class="fas fa-chevron-right" aria-hidden="true"></span></a>',
      dots: true
    });
  }

  // ticker
  if(jQuery('.texto-noti').is('*')){
    var block_arr = jQuery('.ticker a').map(function() { return $(this).get(0);}).toArray();
    
    var ticker_item = jQuery(block_arr[0]);
    jQuery(".ticker").html(ticker_item);
    var ticker_width = jQuery(".ticker").width();
    var text_x = ticker_width;

    scroll_ticker = function(){    
      text_x--;
      ticker_item.css("left", text_x);
      if (text_x < -1 * ticker_item.width()){
        ticker_item = $(block_arr[(block_arr.indexOf(ticker_item.get(0)) + 1 == block_arr.length) ? 0 : block_arr.indexOf(ticker_item.get(0)) + 1]);
        ticker_item.css("left", text_x);
        jQuery(".ticker").html(ticker_item);
        text_x = ticker_width;
      }
    }
    setInterval(scroll_ticker, 7);
  }

  // isotope noticias
  if(jQuery('.noticias').is('*')){
    var $grid = jQuery('.grid-noti').isotope({
      itemSelector: '.element-item',
      layoutMode: 'fitRows'
    });

    jQuery('.filter-button-group').on( 'click', 'button', function() {
      var filterValue = jQuery(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    });

    jQuery('.button-group').each( function( i, buttonGroup ) {
      var $buttonGroup = jQuery(buttonGroup);
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        jQuery(this).addClass('is-checked');
      });
    });
  }

  // listado soluciones
  if(jQuery('.accordion-solu').is('*')){
    jQuery(".accordion-solu").mCustomScrollbar({
      theme:"minimal-dark"
    });
  }

  // listado establecimientos
  if(jQuery('.lista-estable').is('*')){
    jQuery(".scrollbar-lista").mCustomScrollbar({
      theme:"minimal-dark"
    });
  }

  // map donde comprar
  if(jQuery('.map').is('*')){
    google.maps.event.addDomListener(window, 'load', initialize);
  }

  // despliegue buscador
  jQuery(".buscar input").on('keyup', function(){
    jQuery('.ctbuscar').fadeIn();
    
    if((jQuery('.buscar input').val()) == ''){
      jQuery('.ctbuscar').fadeOut();
    }
  });

  // accordion prod
  jQuery(".accordion-prod").on("click", ".accordion-header", function() {
    jQuery(this).toggleClass("activo").next().slideToggle();
  });

  // accordion solu
  jQuery(".accordion-solu").on("click", ".accordion-header a", function(e) {
    e.preventDefault();

    var valor = jQuery(this).parent().attr('id');

    jQuery('.vehiculo .point.' + valor).toggleClass('activo');

    var href = $(this).attr("href"), target = $('.accordion-solu'); 
    if(target.length){
      e.preventDefault();
      target.mCustomScrollbar("scrollTo",href);
    }

    setTimeout(function(){
        jQuery('.accordion-solu #' + valor).toggleClass("activo").next().slideToggle();
    }, 1000);

  });

  // vehiculo point
  jQuery('.vehiculo').on('click', '.point', function(e){
    e.preventDefault();

    var valor2 = jQuery(this).text();

    jQuery(this).toggleClass('activo');

    var href = $(this).attr("href"), target = $('.accordion-solu'); 
    if(target.length){
      e.preventDefault();
      target.mCustomScrollbar("scrollTo",href);
    }

    setTimeout(function(){
        jQuery('.accordion-solu #p' + valor2).toggleClass("activo").next().slideToggle();
    }, 1000);

  });

  // cabecera detalle producto
  var imgsrc;
  jQuery('.btn-lt a').on('click', function(e){
    e.preventDefault();
    jQuery('.btn-lt a').removeClass('activo');
    jQuery(this).addClass('activo');
    imgsrc = jQuery(this).attr('data-img');

    jQuery(".cab-prod .img-lt img").fadeOut(300, function() {
      jQuery(".cab-prod .img-lt img").attr("src","images/" + imgsrc);
    }.bind(this)).fadeIn(300);
  });

  // gotop
  jQuery(document).on('click','.gotop',function(e){
	jQuery('html, body').animate({ scrollTop: 0 }, 700);
  	return false;
  });

  // wrap-select
  jQuery('.wrap-select').on('click',function(){
    if(jQuery(this).hasClass('active')){
        jQuery(this).find('ul').slideUp();
        jQuery(this).removeClass('active');
    }else{
        jQuery(this).find('ul').slideDown();
        jQuery(this).addClass('active');
    }
  });
  jQuery('.wrap-select ul li').on( 'click', function(e) {
    e.stopPropagation();
    var filterText = jQuery(this).text();
    jQuery(this).parent().parent().find('.option-selected').text(filterText);
    jQuery(this).parent().parent().removeClass('active');
    jQuery(this).parent().slideUp();
  });

  // mostrar ver-video
  jQuery('.accordion-solu .ver-video, .lydetalle .ver-video').on('click', function(e){
    e.preventDefault();

    jQuery('.lyvideo').addClass('activo');
  });

  // cerrar lyvideo
  jQuery('.lyvideo .cerrar, .lyvideo').on('click', function(e){
    e.preventDefault();

    jQuery('.lyvideo').removeClass('activo');
  });

  // keyup escape
  jQuery(document).on('keyup', function(e) {
    if (e.keyCode == 27) {
        jQuery('.lyvideo').removeClass('activo');
    }
  });

  // tabs soluciones-movil
  jQuery('ul.tabs li').on('click', function() {
    var tab = $(this).data('tab');

    jQuery('.tab-container').removeClass('current');
    jQuery('ul.tabs li').removeClass('current');

    jQuery(this).addClass('current');
    jQuery("#" + tab).addClass('current');
  });

  // mostrar lydetalle
  jQuery('.soluciones-movil .tab-container .point').on('click', function(e){
    e.preventDefault();

    var valorid = jQuery(this).text();
    jQuery(this).addClass('activo');
    jQuery('.lydetalle#p' + valorid).addClass('activo');
  });

  // cerrar lydetalle
  jQuery('.lydetalle .regresar').on('click', function(e){
    e.preventDefault();

    jQuery(this).parent().removeClass('activo');
    jQuery('.soluciones-movil .tab-container .point').removeClass('activo');
  });

  // map donde comprar
  function initialize() {

    var image = 'images/point-map.png';

    var airports = [
      { 
        title: 'Daily Record Building', 
        position: { 
          lat: 55.861136, 
          lng: -4.257803 },
        content: '<h1>Daily Record Building</h1>'
      },
      { 
        title: 'The Glasgow School of Art', 
        position: { 
          lat: 55.865958, 
          lng: -4.263405 }, 
        content: '<h1>The Glasgow School of Art</h1>'
      },
      { 
        title: 'Belfast Airport', 
        position: { 
          lat: 56.017421, 
          lng: -4.729455 }, 
        content: '<h1>Belfast Airport</h1>'
      },
      { 
        title: 'Edinburgh Airport', 
        position: { 
          lat: 55.847325, 
          lng: -4.313746 }, 
        content: '<h1>Edinburgh Airport</h1>'
      },
      { 
        title: 'Cardiff Airport', 
        position: { 
          lat: 55.871751, 
          lng: -4.288360 }, 	
        content: '<h1>Cardiff Airport</h1>'
      }
    ];
    
    var styles = [
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                }
            ]
        }
    ];
    
    var mapOptions = {
      center: new google.maps.LatLng(55.869998, -4.263405),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: true,
      styles: styles
    };
    
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    InfoWindows = new google.maps.InfoWindow({});
    
    airports.forEach(function(airport) {	
      var marker = new google.maps.Marker({
        position: { lat: airport.position.lat, lng: airport.position.lng },
        map: map,
        icon: image,
        title: airport.title
      });
      marker.addListener('click', function() {
        InfoWindows.open(map, this);
        InfoWindows.setContent(airport.content);
      });
    });

    google.maps.event.addListener(map, 'click', function() {
      InfoWindows.close();
    });
  

    
    }
    

});