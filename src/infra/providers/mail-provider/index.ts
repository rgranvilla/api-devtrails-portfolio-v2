import { env } from '@env';

import { IMailProvider } from '@core/providers/mail-provider/IMailProvider';

import { EtherealMailProvider } from './implementations/etherealMailProvider';
import { SESMailProvider } from './implementations/sesMailProvider';

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
