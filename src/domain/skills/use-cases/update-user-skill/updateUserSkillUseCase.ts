import { UserSkillWithThisIdNotFoundError } from '@errors/skills/userSkillWithThisIdNotFoundError';
import { UserWithThisIdNotFoundError } from '@errors/users/userWithThisIdNotFoundError';

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
    const existingUser = await this.usersRepository.findById(user_id);

    if (!existingUser) {
      throw new UserWithThisIdNotFoundError(user_id);
    }

    const existingUserSkill = await this.userSkillsRepository.findBySkillId(
      skill_id,
    );

    if (!existingUserSkill) {
      throw new UserSkillWithThisIdNotFoundError(skill_id);
    }

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
