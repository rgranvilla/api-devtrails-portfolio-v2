export interface ICreateUserSkillDTO {
  user_id: string;
  name: string;
  description?: string;
  proficiency?: number;
  skill_icon_url?: string;
}
