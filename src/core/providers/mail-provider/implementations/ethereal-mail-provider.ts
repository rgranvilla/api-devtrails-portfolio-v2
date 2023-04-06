import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '../interface-mail-provider';

export class EtherealMailProvider implements IMailProvider {
  private client: Transporter | undefined;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.log(err));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    if (this.client) {
      const templateFileContent = fs.readFileSync(path).toString('utf-8');

      const templateParse = handlebars.compile(templateFileContent);

      const templateHTML = templateParse(variables);

      const message = await this.client.sendMail({
        to,
        from: 'Devtrails <noreplay@devtrails.com>',
        subject,
        html: templateHTML,
      });

      console.log('Message sent: %s', message.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
  }
}
