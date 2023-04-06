import { randomUUID } from 'crypto';

import { Replace } from '@helpers/replace';

interface IUserTokenProps {
  user_id: string;
  refresh_token: string;
  expires_date: Date;
  created_at: Date;
}

export class UserToken {
  private _id: string;
  private props: IUserTokenProps;

  constructor(
    props: Replace<
      IUserTokenProps,
      {
        created_at?: Date;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get user_id(): string {
    return this.props.user_id;
  }

  public set refresh_token(refreshToken: string) {
    this.props.refresh_token = refreshToken;
  }

  public get refresh_token(): string {
    return this.props.refresh_token;
  }

  public set expires_date(expiresDate: Date) {
    this.props.expires_date = expiresDate;
  }

  public get expires_date(): Date {
    return this.props.expires_date;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}
