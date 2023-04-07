export class UserSkillWithThisIdNotFoundError extends Error {
  constructor(skill_id: string) {
    super(`The user skill with id ${skill_id} not found.`);
  }
}
