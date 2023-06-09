import { UserSkill } from '@domain/skills/entities/userSkill';

export interface IUserSkillProps {
  id: string;
  user_id: string;
  name: string;
  description?: string | null;
  proficiency: number;
  skill_icon_url?: string | null;
  created_at: Date;
  updated_at: Date;
}

export class UserSkillMapper {
  static toDatabase(userSkill: UserSkill) {
    return {
      id: userSkill.id,
      user_id: userSkill.user_id,
      name: userSkill.name,
      description: userSkill.description,
      proficiency: userSkill.proficiency,
      skill_icon_url: userSkill.skill_icon_url,
      created_at: userSkill.created_at,
      updated_at: userSkill.updated_at,
    };
  }

  static toHttp(userSkill: UserSkill) {
    return {
      id: userSkill.id,
      user_id: userSkill.user_id,
      name: userSkill.name,
      description: userSkill.description,
      proficiency: userSkill.proficiency,
      skill_icon_url: userSkill.skill_icon_url,
      created_at: userSkill.created_at,
      updated_at: userSkill.updated_at,
    };
  }

  static toDomain(raw: IUserSkillProps) {
    return new UserSkill(
      {
        user_id: raw.user_id,
        name: raw.name,
        description: raw.description,
        proficiency: raw.proficiency,
        skill_icon_url: raw.skill_icon_url,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      },
      raw.id,
    );
  }
}
