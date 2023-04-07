import { ResourceNotFoundError } from '@core/errors/resourceNotFoundError';

import { IUserSkillsRepository } from '@repositories/skills/IUserSkillsRepository';

import { UserSkill } from '@domain/skills/entities/userSkill';

interface IUpdateUserSkillUseCaseRequest {
  skill_id: string;
  user_id: string;
  name: string;
  description?: string;
  proficiency: number;
  skill_icon_url?: string;
}

interface IUpdateUserSkillUseCaseResponse {
  userSkill: UserSkill;
}

export class UpdateUserSkillUseCase {
  constructor(private userSkillsRepository: IUserSkillsRepository) {}

  async execute({
    skill_id,
    user_id,
    name,
    description,
    proficiency,
    skill_icon_url,
  }: IUpdateUserSkillUseCaseRequest): Promise<IUpdateUserSkillUseCaseResponse> {
    const existingUserSkill = await this.userSkillsRepository.findBySkillId(
      skill_id,
    );

    if (existingUserSkill === null) {
      throw new ResourceNotFoundError();
    }

    const userSkillToUpdate = new UserSkill(
      {
        user_id,
        name,
        description,
        proficiency,
        skill_icon_url,
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
