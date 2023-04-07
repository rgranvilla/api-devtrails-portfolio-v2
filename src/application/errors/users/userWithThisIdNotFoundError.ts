export class UserWithThisIdNotFoundError extends Error {
  constructor(skill_id: string) {
    super(`The user with id ${skill_id} not found.`);
  }
}
