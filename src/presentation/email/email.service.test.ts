import { EmailService } from "./email.service"
import nodemailer from 'nodemailer'

describe('email.service', () => {

    const mockSendMail = jest.fn();
    const mockTransporter = { sendMail: mockSendMail };
    nodemailer.createTransport = jest.fn().mockReturnValue(mockTransporter);

    const emailService = new EmailService

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should send an email', async () => {

        const options = {
            to: 'test.email@email.com',
            subject: 'test subject',
            htmlBody: '<h1> test html </h1>'
        }

        const emailSended = await emailService.sendEmail(options);

        expect(emailSended).toBe(true);
        expect(mockSendMail).toHaveBeenCalledWith({
            to: 'test.email@email.com',
            subject: 'test subject',
            html: '<h1> test html </h1>'
        });
    })

    test('should send an email with atachment', async () => {

        const to: string = 'test.email@email.com'

        const emailSended = await emailService.sendEmailWithFileSystemLogs(to);

        expect(emailSended).toBe(true);
        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: expect.any(String),
            subject: "Logs del servidor",
            to: "test.email@email.com",
        });
    })
})