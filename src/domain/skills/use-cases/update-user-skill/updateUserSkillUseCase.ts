import { validateUserSkillById } from 'src/application/validators/skills/validateUserSkillById';
import { validateUserById } from 'src/application/validators/users/validateUserById';

import { IUpdateUserSkillDto } from '@dtos/skills/IUpdateUserSkillDto';

import { IUserSkillsRepository } from '@repositories/skills/IUserSkillsRepository';
import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { UserSkill } from '@domain/skills/entities/userSkill';

interface IUpdateUserSkillUseCaseRequest {
  skill_id: string;
  user_id: string;
  data: Partial<IUpdateUserSkillDto>;
}

interface IUpdateUserSkillUseCaseResponse {
  userSkill: UserSkill;
}

export class UpdateUserSkillUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private userSkillsRepository: IUserSkillsRepository,
  ) {}

  async execute({
    skill_id,
    user_id,
    data,
  }: IUpdateUserSkillUseCaseRequest): Promise<IUpdateUserSkillUseCaseResponse> {
    await validateUserById(user_id, this.usersRepository);
    const existingUserSkill = await validateUserSkillById(
      skill_id,
      this.userSkillsRepository,
    );

    const userSkillToUpdate = new UserSkill(
      {
        user_id,
        name: data.name ?? existingUserSkill.name,
        description: data.description ?? existingUserSkill.description,
        proficiency: data.proficiency ?? existingUserSkill.proficiency,
        skill_icon_url: data.skill_icon_url ?? existingUserSkill.skill_icon_url,
      },
      skill_id,
    );

    const userSkill = await this.userSkillsRepository.updateSkill(
      skill_id,
      userSkillToUpdate,
    );

    return {
      userSkill,
    };
  }
}
