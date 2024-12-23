## NOC APP

### Instrucciones de como montar esta aplicación:

1. Clonar el archivo .env.template o renombrarlo a .env
2. Configurar las siguientes variables de entorno:

- Generales:

  | Variable              | Ejemplo               | Descripción                                                                   |
  | --------------------- | --------------------- | ----------------------------------------------------------------------------- |
  | PORT                  | 3000                  | puerto donde se iniciara la aplicación                                        |
  | MAILER_SERVICE        | gmail                 | servicio de correo que se utilizara para mandar el correo                     |
  | MAILER_EMAIL          | testing@gmail.com     | el mail del destinatario                                                      |
  | MAILER_SECRET_KEY     | ivuonljmjcyjazll      | la llave generada (el metodo depende de cada servicio)                        |
  | MAILER_DESTINATARY    | testing2@gmail.com    | el mail al cual sera enviado el correo                                        |
  | PROD                  | false                 | si esta en producción o desarrollo (actualmente esta variable no se ocupa)    |

___

- Bases de datos:
  - MONGO

  | Variable              | Ejemplo                                   | Descripción                                   |
  | --------------------- | ----------------------------------------- | --------------------------------------------- |
  | MONGO_URL             | mongodb://felipe:123456@localhost:27017/  | URL de conexión a la base de datos MongoDB    |
  | MONGO_DB_NAME         | NOC                                       | Nombre de la base de datos                    |
  | MONGO_USER            | felipe                                    | Usuario de la base de datos                   |
  | MONGO_PASS            | 123456                                    | Contraseña del usuario de la base de datos    |

  - POSTGRE

   | Variable              | Ejemplo                                   | Descripción                                   |
   | --------------------- | ----------------------------------------- | --------------------------------------------- |
   | POSTGRE_URL           | postgres://felipe:123456@localhost:5432/  | URL de conexión a la base de datos PostgreSQL |
   | POSTGRE_DB_NAME       | NOC                                       | Nombre de la base de datos                    |
   | POSTGRE_USER          | felipe                                    | Usuario de la base de datos                   |
   | POSTGRE_PASS          | 123456                                    | Contraseña del usuario de la base de datos    |

3. Ejecutar los siguientes comandos:
- ``` npm install ```
- ``` docker compose up -d ```
5. Finalmente, con este comando se inicia la aplicación: ``` npm run dev ```

### Obtener Key para gmail:
[Google App Password](https://myaccount.google.com/u/0/apppasswords)