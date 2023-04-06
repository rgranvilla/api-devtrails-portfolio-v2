import { randomUUID } from 'node:crypto';
import { resolve } from 'path';

import { env } from '@config/env';

import { IDateProvider } from '@providers/date-provider/interface-date-provider';
import { IMailProvider } from '@providers/mail-provider/interface-mail-provider';

import { ResourceNotFoundError } from '@modules/users/errors/resource-not-found-error';
import { UserTokensRepository } from '@modules/users/repositories/user-tokens-repository';
import { UsersRepository } from '@modules/users/repositories/users-repository';

interface IResponse {
  token: string;
}

export class SendForgotPasswordMailUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private userTokensRepository: UserTokensRepository,
    private dateProvider: IDateProvider,
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    );

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const token = randomUUID();

    const expires_date = this.dateProvider.addMinutes(15);

    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      'Recuperação de Senha',
      variables,
      templatePath,
    );

    return {
      token,
    };
  }
}
