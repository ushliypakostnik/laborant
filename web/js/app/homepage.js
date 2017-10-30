'use strict';


var Homepage = (function($, Logger, BootstrapHelper) {
    var module = {};

    var settings = {
        moduleName: 'Homepage',
        debug: true
    };

    var ui = {
        rowOffer: '.row-offer',
        rowOfferBlocks: '.row-offer > div',
        offerButton: '#productsMore',

        slickCarousel: '#slick-slider-main',
        carouselHeightElements: '#slick-slider-main, #slick-slider-main .slick-slide, #slick-slider-main .style-image'
    };

    var logger;

    var offerOpen = false;

    // Основной пересчёт/перерисовка
    function redraw() {
        logger.log('redraw');


        // Поведение блока интересных предложений

        // Высота блоков предложений
        ui.rowOfferBlocks.innerHeight('auto');
        var maxItemHeight = 0;
        ui.rowOfferBlocks.each( function() {
            maxItemHeight = Math.max(maxItemHeight, $(this).innerHeight());
        });
        if (document.documentElement.clientWidth >= BootstrapHelper.screenXS) {
            ui.rowOfferBlocks.innerHeight(maxItemHeight);
        } else {
            ui.rowOfferBlocks.innerHeight('auto');
        }

        // Разное количество блоков одинаковой высоты в ряду на разных мобилах и десктопах
        if (document.documentElement.clientWidth < BootstrapHelper.screenSM - BootstrapHelper.getScrollbarWidth()
            && document.documentElement.clientWidth >= BootstrapHelper.screenXS - BootstrapHelper.getScrollbarWidth()) {
            ui.rowOfferBlocks.removeClass('col-xs-12');
            ui.rowOfferBlocks.addClass('col-xs-6');
        } else if (document.documentElement.clientWidth < BootstrapHelper.screenXS - BootstrapHelper.getScrollbarWidth()) {
            ui.rowOfferBlocks.removeClass('col-xs-6');
            ui.rowOfferBlocks.addClass('col-xs-12');
        } else if (document.documentElement.clientWidth >= BootstrapHelper.screenMG - BootstrapHelper.getScrollbarWidth()) {
            ui.rowOfferBlocks.removeClass('col-lg-4');
            ui.rowOfferBlocks.addClass('col-lg-3');
        } else {
            ui.rowOfferBlocks.removeClass('col-lg-3');
            ui.rowOfferBlocks.addClass('col-lg-4');
        }

        // Высота контейнера с предложниями
        if (!offerOpen) {
            if (document.documentElement.clientWidth < BootstrapHelper.screenSM - BootstrapHelper.getScrollbarWidth()
                && document.documentElement.clientWidth >= BootstrapHelper.screenXS - BootstrapHelper.getScrollbarWidth()) {
                ui.rowOffer.innerHeight(maxItemHeight * 3);
            } else if (document.documentElement.clientWidth >= BootstrapHelper.screenSM - BootstrapHelper.getScrollbarWidth()) {
                ui.rowOffer.innerHeight(maxItemHeight * 2);
            } else if (document.documentElement.clientWidth < BootstrapHelper.screenXS - BootstrapHelper.getScrollbarWidth()) {
                var height = 0;
                ui.rowOfferBlocks.each( function() {
                    if ($(this).index() < 6) {
                        height = height + $(this).innerHeight();
                    }
                });
                ui.rowOffer.innerHeight(height);
            }
        } else {
            ui.rowOffer.innerHeight('auto');
        }

        // Высота карусели
        var maxCarouselHeight;
        if (document.documentElement.clientWidth >= BootstrapHelper.screenSM - BootstrapHelper.getScrollbarWidth()) {
            maxCarouselHeight = 350;
        } else {
            maxCarouselHeight = 250;
        }
        if (ui.slickCarousel.parent().width() < maxCarouselHeight) {
            ui.carouselHeightElements.height( ui.slickCarousel.parent().width() );
        } else {
            ui.carouselHeightElements.height( maxCarouselHeight );
        }
    }

    function init() {
        $(document).ready(function() {
            logger.log('event: DOM ready');

            // prepare jquery ui objects
            for (var pr in ui) {
                ui[pr] = $(ui[pr]);
            }

            // Slick слайдшоу
            ui.slickCarousel.slick({
                dots: false,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 2000,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                infinite: true
            });

            // Кнопка блока предложений
            ui.offerButton.on('click', function(e) {
                e.preventDefault();

                if (!offerOpen) {
                    offerOpen = true;
                    $(this).html('Свернуть<i class="fa fa-angle-up"></i>');
                } else {
                    offerOpen = false;
                    $(this).html('Больше предложений<i class="fa fa-angle-down"></i>');
                }

                redraw();
            });

            redraw();
        });

        $(window).load(function() {
            logger.log('event: window load');

            redraw();
        });

        $(window).scroll(function() {
            logger.log('event: window scroll');

            // теоретически событие может наступить до того, как будет готова DOM модель,
            // поэтому, чтобы избежать ошибок, используем здесь $(ui.el) вместо ui.el
        });

        $(window).resize(function() {
            logger.log('event: window resize');

            redraw();

            window.setTimeout(function() {
                redraw();
            }, 0);
        });
    }

    module.init = function(_settings) {
        _settings = _settings || {};

        for (var pr in _settings) {
            settings[pr] = _settings[pr];
        }

        logger = new Logger(settings);

        init();

        logger.log('init');
    };

    return module;
}(jQuery, Logger, BootstrapHelper));
