import { CLIENT_RENEG_LIMIT } from "tls";
import { envs } from "./envs.plugin";

describe('envs.plugin', () => {

    const variablesEnv = envs;

    test('should return env option', () => {

        expect(variablesEnv).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'felipe.daniel.testing@gmail.com',
            MAILER_SECRET_KEY: 'iazonlfmjczjazml',
            MAILER_DESTINATARY: 'felipe.daniel.juegos@gmail.com',
            PROD: false,
            MONGO_URL: 'mongodb://felipetest:123456789@localhost:27017/',
            MONGO_DB_NAME: 'NOC-test',
            MONGO_USER: 'felipetest',
            MONGO_PASS: '123456789'
        })
    })


    test('should return error if an environment variable is not a strict type', async () => {

        jest.resetModules()
        process.env.PORT = 'ABC'

        try {
            await import('./envs.plugin');
        } catch (error) {
            // se escribe entre ${} el error porque sino escapa las " de port como \"
            expect(`${error}`).toBe(`EnvVarError: env-var: "PORT" should be a valid integer`)
        }
       
    })
})