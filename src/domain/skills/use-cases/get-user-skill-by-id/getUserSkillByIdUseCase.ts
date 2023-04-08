import { validateUserSkillById } from 'src/application/validators/skills/validateUserSkillById';
import { validateUserById } from 'src/application/validators/users/validateUserById';

import { IUserSkillsRepository } from '@repositories/skills/IUserSkillsRepository';
import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { UserSkill } from '@domain/skills/entities/userSkill';

interface IRequest {
  user_id: string;
  skill_id: string;
}

interface IResponse {
  userSkill: UserSkill;
}

export class GetUserSkillByIdUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private userSkillsRepository: IUserSkillsRepository,
  ) {}

  async execute({ user_id, skill_id }: IRequest): Promise<IResponse> {
    await validateUserById(user_id, this.usersRepository);
    const userSkill = await validateUserSkillById(
      skill_id,
      this.userSkillsRepository,
    );

    return {
      userSkill,
    };
  }
}
