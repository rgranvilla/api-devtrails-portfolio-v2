import { UserToken } from '../entities/user-token';

export interface IUserTokenProps {
  id: string;
  user_id: string;
  refresh_token: string;
  expires_date: Date;
  created_at: Date;
}

export class UserTokenMapper {
  static toDatabase(userToken: UserToken) {
    return {
      id: userToken.id,
      user_id: userToken.user_id,
      refresh_token: userToken.refresh_token,
      expires_date: userToken.expires_date,
      created_at: userToken.created_at,
    };
  }

  static toHttp(userToken: UserToken) {
    return {
      id: userToken.id,
      user_id: userToken.user_id,
      refresh_token: userToken.refresh_token,
      expires_date: userToken.expires_date,
      created_at: userToken.created_at,
    };
  }

  static toDomain(raw: IUserTokenProps) {
    return new UserToken(
      {
        user_id: raw.user_id,
        refresh_token: raw.refresh_token,
        expires_date: raw.expires_date,
        created_at: raw.created_at,
      },
      raw.id,
    );
  }
}
