/**
 * JQuery content slider
 * @author Pecina Ondřej <pecina.ondrej@gmail.com>
 * @param options - settigns for slider
 * @version 0.5
 * @copyright All rights reserved 2012
 */
$.fn.contentSlider = function( options ) {
    var settings = {
        speed: 200,
        paginator: true,
        controls: true,
        autoplay: true,
        pause:  3000000
    };

    $.extend(settings, options);
    // slider
    var slider = this;
    // count slides
    var itemsCount = $('.items > div', slider).size();
    // timer
    var timer = null;

    // prepare state
    $('.items > div', slider).hide();
    $('.items > div:first-child', slider).show().addClass('active');

    /**
     * Change frame
     * @param frame - actual frame
     */
    var changeFrame = function(frame) {
        $('.items .active', slider).fadeOut(settings.speed, function() {
            $(this).removeClass('active');
            $('.items > div', slider)
                .eq(frame)
                .addClass('active')
                .fadeIn(settings.speed);
            // set active paginator
            if(settings.paginator == true) {
                $('.sliderPaginator a').removeClass('active');
                $('.sliderPaginator a').eq(frame).addClass('active');
            }
        });
    }

    /**
     *  Get timer object
     * @return timer
     */
    var getTimer = function() {
        return setInterval(function(){
            var activeSlide = $('.items .active', slider).index() * 1;
            activeSlide++;
            if(activeSlide > (itemsCount - 1)) {
                activeSlide = 0;
            }
            changeFrame(activeSlide);

        }, settings.pause);
    }

    // enable slider for 1 and more slides
    if( itemsCount > 1) {



        // autoplay
        if(settings.autoplay == true) {
            timer = getTimer();
        }


        // paginator
        if(settings.paginator == true) {
            // add paginator
            var html = '<div class="sliderPaginator">';

            for(i = 0; i < itemsCount; i++ ) {
                html += '<a rel="' + i + '" href="#">' + i + '</a>';
            }

            html += "</div>";

            $(html).appendTo(this);


            $('.sliderPaginator a', this).click(function(e) {
                e.preventDefault();
                var frame = $(this).attr('rel');
                changeFrame(frame);
                if(timer != null) {
                    clearInterval(timer);
                    timer = getTimer();
                }
            });

            $('.sliderPaginator a', this).eq(0).addClass('active');

        }

        // controls
        if(settings.controls == true) {
            // add controls
            $('<a href="#" class="navigation hide-bg prev"><span></span></a><a href="#" class="navigation next"><span></span></a>')
                .appendTo(this);

            $('.navigation', this).click(function(e) {
                e.preventDefault();
                var activeSlide = $('.items .active', slider).index() * 1;
                if($(this).hasClass('next')) {
                    activeSlide++;
                }
                else {
                    activeSlide = activeSlide - 1;
                }

                if(activeSlide > (itemsCount - 1)) {
                    activeSlide = 0;
                }
                else if(activeSlide < 0) {
                    activeSlide = (itemsCount - 1);
                }
                // change frame
                changeFrame(activeSlide);
                if(timer != null) {
                    clearInterval(timer);
                    timer = getTimer();
                }
            });
        }


    }
}