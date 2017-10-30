'use strict';


var Basic = (function($, Logger, BootstrapHelper) {
    var module = {};

    var settings = {
        moduleName: 'Basic',
        debug: true
    };

    var ui = {
        // main elements
        page: '.page',
        contentHeader: '.content-body .main-content h1',
        aside: '.content-body aside'
    };

    var logger;

    var scrollbarWidth;

    var breakpoint;

    // Основной пересчёт/перерисовка
    function redraw() {
        logger.log('redraw');

        if (document.documentElement.clientWidth >= breakpoint - scrollbarWidth) {
            ui.aside.css('padding-top', ui.contentHeader.innerHeight() + parseFloat(ui.contentHeader.css('margin-top'), 10));
        } else {
            ui.aside.css('padding-top', '');
        }
    }

    function init() {
        $(document).ready(function() {
            logger.log('event: DOM ready');

            // prepare jquery ui objects
            for (var pr in ui) {
                ui[pr] = $(ui[pr]);
            }

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

        if ($(ui.page).hasClass('product')) {
            breakpoint = BootstrapHelper.screenMD;
        } else {
            breakpoint = BootstrapHelper.screenSM;
        }
    };

    return module;
}(jQuery, Logger, BootstrapHelper));
