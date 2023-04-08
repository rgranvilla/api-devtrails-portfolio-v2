import { validateUserSkill } from 'src/application/validators/skills/validateUserSkill';
import { validateUserById } from 'src/application/validators/users/validateUserById';

import { IUserSkillsRepository } from '@repositories/skills/IUserSkillsRepository';
import { IUsersRepository } from '@repositories/users/IUsersRepository';

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
    await validateUserById(user_id, this.usersRepository);
    await validateUserSkill(skill_id, this.userSkillsRepository);

    await this.userSkillsRepository.deleteById(skill_id);
  }
}
