'use strict';


var Product02 = (function($, Logger, BootstrapHelper) {
    var module = {};

    var settings = {
        moduleName: 'Product02',
        debug: true
    };

    var ui = {
    };

    var logger;

    var scrollbarWidth;

    // Основной пересчёт/перерисовка
    function redraw() {
        logger.log('redraw');
    }

    function init() {
        $(document).ready(function() {
            logger.log('event: DOM ready');

            // prepare jquery ui objects
            for (var pr in ui) {
                ui[pr] = $(ui[pr]);
            }

            $('a[data-rel^=lightcase]').lightcase();

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

        scrollbarWidth = BootstrapHelper.getScrollbarWidth();
    };

    return module;
}(jQuery, Logger, BootstrapHelper));
