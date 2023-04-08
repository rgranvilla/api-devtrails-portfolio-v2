import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '@core/providers/mail-provider/IMailProvider';

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
      .catch((err) => console.error(err));
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

      console.info('Message sent: %s', message.messageId);
      console.info('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
  }
}
