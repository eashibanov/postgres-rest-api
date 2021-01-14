Запуск DB Docker:
sh api-db.sh build
sh api-db start

Запуск сервера:
npm run dev

Routes: 

GET
/test - проверка сервера (возращает ping)
/users - перечисляет персон в списке
/users/id - возвращает персону с id = id

POST
/users (body запроса - JSON { "name": ..., "phone": "x-xxx-xxx-xx-xx" }) - добавляет ползователя

PUT 
/users/id, body аналогично прошлому, изменяет параметры пользователя с id = id

DELETE
/users/id - удаляет пользователя с id = id