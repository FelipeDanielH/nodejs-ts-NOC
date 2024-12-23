## NOC APP

### Instrucciones de como montar esta aplicación:

1. Clonar el archivo .env.template o renombrarlo a .env
2. Configurar las siguientes variables de entorno:


| Variable              | Ejemplo               | Descripción                                                                   |
| --------------------- | --------------------- | ----------------------------------------------------------------------------- |
| PORT                  | 3000                  | puerto donde se iniciara la aplicación                                        |
| MAILER_SERVICE        | gmail                 | servicio de correo que se utilizara para mandar el correo                     |
| MAILER_EMAIL          | testing@gmail.com     | el mail del destinatario                                                      |
| MAILER_SECRET_KEY     | ivuonljmjcyjazll      | la llave generada (el metodo depende de cada servicio)                        |
| MAILER_DESTINATARY    | testing2@gmail.com    | el mail al cual sera enviado el correo                                        |
| PROD                  | false                 | si esta en producción o desarrollo (actualmente esta variable no se ocupa)    |

3. Ejecutar el comando ``` npm install ```
4. Ejecutar ``` npm run dev ```

### Obtener Key para gmail:
[Google App Password](https://myaccount.google.com/u/0/apppasswords)