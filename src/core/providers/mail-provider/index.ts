import { env } from '@config/env';

import { EtherealMailProvider } from './implementations/ethereal-mail-provider';
import { SESMailProvider } from './implementations/ses-mail-provider';
import { IMailProvider } from './interface-mail-provider';

export function MailProvider(): IMailProvider {
  const mailProviderType = env.MAIL_PROVIDER;

  switch (mailProviderType) {
    case 'ethereal':
      return new EtherealMailProvider();
    case 'ses':
      return new SESMailProvider();
    default:
      throw new Error(`Invalid mail provider: ${mailProviderType}`);
  }
}
