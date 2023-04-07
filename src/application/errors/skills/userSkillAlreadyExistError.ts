export class UserSkillAlreadyExistError extends Error {
  constructor() {
    super('This skill already exist, it cannot be duplicated.');
  }
}
