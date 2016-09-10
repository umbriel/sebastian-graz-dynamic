var app = {};

;(function($) {

  var $doc = $(document);

  /** [1] */
  $.readyFn = {
    list: [],
    register: function(fn) {
      console.log('Module Registered');

      $.readyFn.list.push(fn);
    },
    execute: function() {
      console.log('Modules Executing');

      for (var i = 0; i < $.readyFn.list.length; i++) {
        try {
          $.readyFn.list[i].apply(document, [$]);
        } catch (e) {
          throw e;
        }
      };
    }
  };

  /** [2] */
  app = {
    initSmoothState: function () {
      console.log('Module Executed: Smooth State');

      var $page = $('#main'),
      options = {
        debug: true,
        prefetch: true,
        cacheLength: 4,
        onStart: {
          duration: 500,
          render: function($container) {
            // Add your CSS animation reversing class
            $container.addClass('is-exiting');
            // Restart your animation
            app.smoothState.restartCSSAnimations();
          }
        },
        onReady: {
          duration: 0,
          render: function($container, $newContent) {
            // Remove your CSS animation reversing class
            $container.removeClass('is-exiting');
            // Inject the new content
            $container.html($newContent);
            $('html, body').animate({ scrollTop: 0 }, 0);
          }
        },
        onAfter: function($container, $newContent) {
          $.readyFn.execute();
        }
      };

      this.smoothState = $page.smoothState(options).data('smoothState');
    },
    initImagesLoaded: function () {
      $('#main').imagesLoaded()
      .always( function( instance ) {
        console.log('all images loaded');
      })
      .done( function( instance, image ) {
        console.log('all images successfully loaded');
        // $('img.loadme').each( function(){
        //   $(this).addClass('image-loaded');
        // });
        var $logo = $('#logo');
        $logo.removeClass('is-loading');
      })
      .fail( function() {
        var $logo = $('#logo');
        console.log('all images loaded, at least one is broken');
        $logo.removeClass('is-loading');
      })
      .progress( function( instance, image ) {
        var result = image.isLoaded ? 'loaded' : 'broken';

        //Add .is-broken class if image is broke
        image.img.parentNode.className += image.isLoaded ? '' : ' is-broken';

        console.log( 'image is ' + result + ' for ' + image.img.src );
        $(image.img).parent().addClass('image-loaded');
        var $logo = $('#logo');
        $logo.addClass('is-loading');
      });
    },
    parallax: function () {
      $(window).scroll(function(){

        if($(this).scrollTop() < $(this).height()) {
          var x = $(this).scrollTop(),
          transY = (x * 0.15),
          transform = 'translateY('+ -transY+'px)';
          $('.hero-phone img').css({
            transition: 'none',
            transform: transform
          });
        }
      });
    },
    caseArray: function () {
      $(".case-array-content-item").on({
        mouseenter: function () {
          var color = $(this).data('color');
          var caseArray = $(this).parents('.case-array')
          $(caseArray).css({
            'background-color': color
          })
        }
      });
    },
    blogPreview: function () {
      $(".blog-case h3 a").on("mouseenter", function () {
        var attachedContainer = $(this).data('id');
        var color = $(this).data('color');
        $('.blog-image-container').removeClass('active');
        $("." + attachedContainer).addClass('active');
        $('.blog-image').css({
          'background-color': color
        })
      });
    },
    weather: function () {
      function getWeather(callback) {
        $.ajax({
          type: 'GET',
          dataType: 'jsonp',
          url: 'http://api.openweathermap.org/data/2.5/forecast',
          data: {
            q: 'London', //london
            units: 'metric',
            appid: '58b6f7c78582bffab3936dac99c31b25'
          },
          success: callback
        });
      }
      getWeather(function (data) {
 // https://github.com/AryanJ-NYC/local-weather/blob/gh-pages/weather.js#L6
      const DARKSKY_APIKEY = '42c0b99f752f85b715fe11d76658f0e4';
      const LATITUDE = '51.52';
      const LONGITUDE = '0.08';
      const DARKSKY_URL = `https://api.forecast.io/forecast/${DARKSKY_APIKEY}/${LATITUDE},${LONGITUDE}`;

      $.get(DARKSKY_URL, function(response) {
        var weatherIcon = $('span.weather').hide().fadeIn();
        switch (response.currently.icon) {
            case 'clear-day':
                $(weatherIcon).html('☀️');
                break;
            case 'partly-cloudy-day':
                $(weatherIcon).html('⛅');
                break;
            case 'cloudy':
                $(weatherIcon).html('☁️');
                break;
            case 'snow':
                $(weatherIcon).html('🌨');
                break;
            case 'clear-night':
            case 'partly-cloudy-night':
                $(weatherIcon).html('🌙');
                break;
            case 'rain':
            default:
                $(weatherIcon).html('☔');
        }
      }, "jsonp");
      });

    }
  };

  /** [3] */
  $doc.ready(function() {
    console.log('Initial Document Ready');
    app.initSmoothState();
    $.readyFn.execute();
  });

  /** [4] */
  $.fn.ready = $.readyFn.register;

  $(function() {
    app.initImagesLoaded();
    app.parallax();
    app.caseArray();
    app.blogPreview();
    app.weather();
  });

})(jQuery);
