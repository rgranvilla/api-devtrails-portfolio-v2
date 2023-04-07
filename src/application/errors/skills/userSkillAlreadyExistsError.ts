export class UserSkillAlreadyExistsError extends Error {
  constructor() {
    super('This skill already exist, it cannot be duplicated.');
  }
}
