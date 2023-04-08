import { IUserSkillsRepository } from '@repositories/skills/IUserSkillsRepository';
import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { validateUserSkill } from '@domain/skills/validators/validateUserSkill';
import { validateUser } from '@domain/users/validators/validateUser';

interface IDeleteUserSkillUseCaseRequest {
  user_id: string;
  skill_id: string;
}

export class DeleteUserSkillUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private userSkillsRepository: IUserSkillsRepository,
  ) {}

  async execute({
    user_id,
    skill_id,
  }: IDeleteUserSkillUseCaseRequest): Promise<void> {
    await validateUser(user_id, this.usersRepository);
    await validateUserSkill(skill_id, this.userSkillsRepository);

    await this.userSkillsRepository.deleteById(skill_id);
  }
}
