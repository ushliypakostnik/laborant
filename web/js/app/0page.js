'use strict';


var Page = (function($, BootstrapHelper) {
    var module = {};

    // Перемотка до елемента
    module.scrollToBlock = function($el, offsetTop) {
        $('body, html').animate({
            scrollTop: $el.offset().top - offsetTop
        }, getAnimationSpeed());
    }

    // Скорость анимации
    function getAnimationSpeed() {
        return 100;
    }
    module.getAnimationSpeed = getAnimationSpeed;

    // Отступ от края экрана до края контейнера
    module.getContainerPosition = function($el) {
        return BootstrapHelper.getCoords($el.get(0)).left + parseFloat($el.css('padding-left'), 10);
    }

    return module;
}(jQuery, BootstrapHelper));
