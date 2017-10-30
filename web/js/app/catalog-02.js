'use strict';


var Catalog02 = (function($, Logger, BootstrapHelper) {
    var module = {};

    var settings = {
        moduleName: 'Catalog02',
        debug: true
    };

    var ui = {
        searchFormHiddenTrigger: '.search-form-hidden-trigger',
        searchAdditionalBlockTrigger: '.search-additional-block-trigger'
    };

    var logger;

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

            redraw();

            ui.searchFormHiddenTrigger.on('click', function(evt) {
                evt.preventDefault();

                if (!$(this).find('.caret').hasClass('up')) {
                    $(this).siblings('.form-style').css({'display': 'block'});
                } else {
                    $(this).siblings('.form-style').css({'display': ''});
                }
                $(this).find('.caret').toggleClass('up');
            });

            ui.searchAdditionalBlockTrigger.on('click', function(evt) {
                evt.preventDefault();

                if (!$(this).find('.caret').hasClass('up')) {
                    $(this).siblings('.search-additional-block-body').css({'display': 'block'});
                } else {
                    $(this).siblings('.search-additional-block-body').css({'display': ''});
                }
                $(this).find('.caret').toggleClass('up');
            });
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
