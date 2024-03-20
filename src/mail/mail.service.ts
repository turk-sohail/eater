import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailService: MailerService) { }

    async sendEmail() {
        await this.mailService
            .sendMail({
                to: 'test@nestjs.com', // list of receivers
                from: 'noreply@nestjs.com', // sender address
                subject: 'Testing Nest MailerModule ✔', // Subject line
                text: 'welcome', // plaintext body
                html: '<b>julnain o</b>', // HTML body content
            })
        return "email send";
    }


}
