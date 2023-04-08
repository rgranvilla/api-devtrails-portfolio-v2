import { UserSkill } from '@domain/skills/entities/userSkill';

type Override = Partial<UserSkill>;

interface IMakeNewUserSkillProps {
  id?: string;
  user_id: string;
  override?: Override;
}

export async function createNewUserSkillFactory({
  id,
  user_id,
  override,
}: IMakeNewUserSkillProps) {
  return new UserSkill(
    {
      user_id,
      name: 'skill_name',
      proficiency: 5,
      ...override,
    },
    id,
  );
}
