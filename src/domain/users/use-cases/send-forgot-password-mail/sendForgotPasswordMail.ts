import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';

import { env } from '@env';

import { ResourceNotFoundError } from '@shared/errors/resourceNotFoundError';
import { IDateProvider } from '@shared/providers/date-provider/IDateProvider';
import { IMailProvider } from '@shared/providers/mail-provider/IMailProvider';

import { IUsersRepository } from '@repositories/users/IUsersRepository';
import { IUserTokensRepository } from '@repositories/users/IUserTokensRepository';

interface IResponse {
  token: string;
}

export class SendForgotPasswordMailUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private userTokensRepository: IUserTokensRepository,
    private dateProvider: IDateProvider,
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ResourceNotFoundError();
    }

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

    const oldTokens = await this.userTokensRepository.findByUserId(user.id);

    if (oldTokens) {
      for (const token of oldTokens) {
        this.userTokensRepository.deleteById(token.id);
      }
    }

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
