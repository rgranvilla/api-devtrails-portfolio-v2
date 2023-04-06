import { randomUUID } from 'crypto';

import { Replace } from '@helpers/replace';

interface IUserSkillProps {
  user_id: string;
  name: string;
  description?: string | null;
  proficiency: number;
  skill_icon_url?: string | null;
  created_at: Date;
  updated_at: Date;
}

export class UserSkill {
  private _id: string;
  private props: IUserSkillProps;

  constructor(
    props: Replace<
      IUserSkillProps,
      {
        proficiency: number;
        created_at?: Date;
        updated_at?: Date;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      description: props.description ?? null,
      proficiency: props.proficiency ?? 0,
      skill_icon_url: props.skill_icon_url ?? null,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set user_id(user_id: string) {
    this.props.user_id = user_id;
  }

  public get user_id(): string {
    return this.props.user_id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set description(description: string | null | undefined) {
    this.props.description = description;
  }

  public get description(): string | null | undefined {
    return this.props.description;
  }

  public set proficiency(proficiency: number) {
    this.props.proficiency = proficiency;
  }

  public get proficiency(): number {
    return this.props.proficiency;
  }

  public set skill_icon_url(skill_icon_url: string | null | undefined) {
    this.props.skill_icon_url = skill_icon_url;
  }

  public get skill_icon_url(): string | null | undefined {
    return this.props.skill_icon_url;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }
}
