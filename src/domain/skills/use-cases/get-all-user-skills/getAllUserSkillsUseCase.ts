import { validateUserById } from 'src/application/validators/users/validateUserById';

import { IUserSkillsRepository } from '@repositories/skills/IUserSkillsRepository';
import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { UserSkill } from '@domain/skills/entities/userSkill';

interface IRequest {
  user_id: string;
}

interface IResponse {
  userSkills: UserSkill[] | null;
}

export class GetAllUserSkillsUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private userSkillsRepository: IUserSkillsRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<IResponse> {
    await validateUserById(user_id, this.usersRepository);
    const userSkills = await this.userSkillsRepository.findByUserId(user_id);

    return {
      userSkills,
    };
  }
}
