Laborant frontend project
=========================

История дизайна: http://levon.kafedra.org/freelance/laborant/


Deploy
------

Установка системных пакетов

    $ sudo apt-get install nodejs
    $ sudo apt-get install curl

Установка зависимостей (npm packages, bower packages)

    $ npm install

Экспорт проекта в папку *./output*

    $ npm run makestatic

Обновление версии приложения с автоматическим коммитом и созданием тега

    $ ./node_modules/.bin/mversion <version> -m "Update to %s"


Запуск сервера для разработки
-----------------------------

    $ npm run http-server
    http://127.0.0.1:8083/


Структура проекта
-----------------

* __node_modules__ - папка, куда устанавливаются пакеты nodejs
* __output__ - папка, куда происходит выгрузка проекта
* __web__ - папка, где ведётся разработка
    * __bower_components__ - папка, куда устанавливаются пакеты bower
    * __css__ - папка со стилями, которые не требуют препроцессинга less
        * __ie8.css__ - стили для IE8
        * __sys.css__ - стили для системных страниц (напр. для *web/legacy.html*)
    * __fonts__ - папка со шрифтами
    * __img__ - папка с изображениями проекта
        * ...
    * __js__ - папка со скриптами
        * __app__ - папка с кастомными скриптами
            * __page1.js__ - js-модуль страницы
            * __page2.js__ - js-модуль страницы
            * ...
        * __bootstrap-helper.js__ - модуль для определения типов устройств
        * __logger.js__ - логгирование
    * __less__ - стили, требующие препроцесснг less
        * __bootstrapinfo.less__ - полезное Bootstrap
        * __layout.less__ - стили страниц проекта
        * __mixins.less__ - less mixins
        * __styles.less__ - имопрт стилевых зависимостей
        * __variables.less__ - настройки стилей
    * __legacy.html__ - системная страница
    * __page1.html__ - пример страницы
    * __page2.html__ - пример страницы
    * __page3.html__ - пример страницы
* __.bowerrc__ - файл локальной конфигурации bower
* __bower.json__ - конфигурация bower-пакета
* __Gruntfile.js__ - конфигурация сборщика проекта Grunt
* __package.json__ - конфигурация npm-пакета
* __README.md__ - файл документации по проекту


Nginx config example
--------------------

    server {
        listen *:80;
        server_name project.lo;

        root /path/to/project;

        index index.html;
        autoindex on;

        access_log /var/log/nginx/project.access.log;
        error_log /var/log/nginx/project.error.log;

        set_real_ip_from 127.0.0.1;
        real_ip_header X-Forwarded-For;

        location = /favicon.ico {
            log_not_found off;
            access_log off;
        }

        location ~* ^.+\.(html|css|less|js|txt|xml|ttf|svg|eot|woff|zip|tgz|gz|rar|bz2|doc|xls|exe|pdf|ppt|tar|wav|mp3|ogg|rtf)$ {
            access_log off;
            expires 1y;
        }

        location ~* ^.+\.(jpg|jpeg|gif|png|ico|bmp|swf|flv)$ {
            access_log off;
            expires 1y;
            add_header Cache-Control public;
        }
    }
