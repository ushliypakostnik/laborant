'use strict';


var PageTemplate = (function($, Logger, BootstrapHelper) {
    var module = {};

    var settings = {
        moduleName: 'PageTemplate',
        debug: true
    };

    var ui = {
        // main elements
        header: 'header',
        pageBody: '.page-body',
        dropdowns: '.dropdown-menu',

        // mobile dropdown in header
        menuMobileDropdown: 'header nav .dropdown',
        menuMobileButton: 'header nav .dropdown .dropdown-toggle'
    };

    var logger;

    var scrollbarWidth;
    var scrollValue;

    function setHeaderFromScroll() {
        var scroll = $(window).scrollTop();

        if (document.documentElement.clientWidth < BootstrapHelper.screenSM - scrollbarWidth) {
            scrollValue = 90;
        } else {
            scrollValue = 65;
        }

        if (scroll > scrollValue) {
            ui.header.addClass('scroll');
            if (document.documentElement.clientWidth < BootstrapHelper.screenSM - scrollbarWidth) {
                ui.pageBody.css('margin-top', 156);
            } else {
                ui.pageBody.css('margin-top', 85);
            }
        } else {
            ui.header.removeClass('scroll');
            ui.pageBody.css('margin-top', '');
        }
    }

    // Основной пересчёт/перерисовка
    function redraw() {
        logger.log('redraw');

        // Поведение хедера - отступ сверху
        setHeaderFromScroll();

        // Ширина дропдауна мобильного меню в хедере
        ui.menuMobileDropdown.children('.dropdown-menu').width(document.documentElement.clientWidth);
    }

    function init() {
        $(document).ready(function() {
            logger.log('event: DOM ready');

            // prepare jquery ui objects
            for (var pr in ui) {
                ui[pr] = $(ui[pr]);
            }

            redraw();

            // Запрет закрытия дропдаунов при клике на них
            ui.dropdowns.on('click', function (e) {
                e.stopPropagation();
            });

            // Меняем иконку в кнопке мобильного меню в хедере при нажатии
            ui.menuMobileButton.on('click', function(){
                var $this = $(this);
                if ($this.parent('.btn-group').hasClass('open')) {
                    $this.html('<i class="fa fa-navicon"></i>');
                } else {
                    $this.html('<i class="fa fa-close"></i>');
                }
            });
            // При клике в любом месте приводящем к закрытию дропдауна - тоже меняем иконку в кнопке
            ui.menuMobileDropdown.on('hide.bs.dropdown', function(){
                ui.menuMobileButton.html('<i class="fa fa-navicon"></i>');
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

            setHeaderFromScroll();
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
