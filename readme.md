В проекті виконано три способи зберігання даних:

в файлі userTasks.json;
в базі даних MongoDB (або локально в MongoDB Compass, або на сайті);
в базі даних з використанням SQL (в файлі config.ts є налаштування для локальної БД в MySQL Workbench).
Відповідно є три роути, контроллери та моделі.

Обрати спосіб зберігання даних можна в методі startWork() в головному файлі app.ts, розкоментувавши потрібне.

В класі AutorizationControllerSQL я спробувала реалізувати патерн проектування Одинак "Singleton.

Використано фронт як static на тому ж порту 3005, тому cors закоментовано. Для виконання завдання 15 "Удалите блок конфигурации АПИ-точки со статической страницы чтобы ваша страница выглядела меньше как специальная учебная, и больше как реальная страница туду-сервиса" використано папку Index-8080. Треба запустити ran і відкрити http://localhost:8080. В такому випадку розкоментувати cors.


Образ docker, змонтований для mongoDB, на https://hub.docker.com/ 
- docker pull irynakos/image-level2.4:latest

- docker run -p 3005:3005 image-id 


