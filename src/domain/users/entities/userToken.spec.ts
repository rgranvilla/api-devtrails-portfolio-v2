import { randomUUID } from 'node:crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { IDateProvider } from '@core/providers/date-provider/IDateProvider';

import { DateProvider } from '@providers/date-provider';

import { UserToken } from './userToken';

let userId: string;
let refreshToken: string;
let dateProvider: IDateProvider;
let expiresDate: Date;

describe('User Token Entity', () => {
  beforeEach(() => {
    userId = randomUUID();
    refreshToken = randomUUID();
    dateProvider = DateProvider();
    expiresDate = dateProvider.addMinutes(15);
  });

  it('should be able to create a new user token', async () => {
    const { id, user_id, refresh_token, expires_date, created_at } =
      new UserToken({
        user_id: userId,
        refresh_token: refreshToken,
        expires_date: expiresDate,
      });

    expect(id).toBeTruthy();
    expect(user_id).toBe(userId);
    expect(refresh_token).toBe(refreshToken);
    expect(expires_date).toEqual(expect.any(Date));
    expect(created_at).toEqual(expect.any(Date));
  });

  it('should be able to set user values directly', async () => {
    const userToken = new UserToken({
      user_id: userId,
      refresh_token: refreshToken,
      expires_date: expiresDate,
    });

    userToken.refresh_token = randomUUID();
    userToken.expires_date = dateProvider.addMinutes(30);

    const isChangedToAnotherToken = refreshToken !== userToken.refresh_token;
    const isChangedToAnotherExpiresDate =
      expiresDate !== userToken.expires_date;

    expect(isChangedToAnotherToken).toBeTruthy();
    expect(isChangedToAnotherExpiresDate).toBeTruthy();
  });
});
