import { UserSkillAlreadyExistsError } from '@errors/skills/userSkillAlreadyExistsError';

import { IUserSkillsRepository } from '@repositories/skills/IUserSkillsRepository';

import { UserSkill } from '@domain/skills/entities/userSkill';

interface ICreateUserSkillUseCaseRequest {
  user_id: string;
  name: string;
  description?: string;
  proficiency: number;
  skill_icon_url?: string;
}

interface ICreateUserSkillUseCaseResponse {
  userSkill: UserSkill;
}

export class CreateUserSkillUseCase {
  constructor(private userSkillsRepository: IUserSkillsRepository) {}

  async execute({
    user_id,
    name,
    description,
    proficiency,
    skill_icon_url,
  }: ICreateUserSkillUseCaseRequest): Promise<ICreateUserSkillUseCaseResponse> {
    const existingUserSkill =
      await this.userSkillsRepository.findByNameAndUserId(name, user_id);

    if (existingUserSkill !== null) {
      throw new UserSkillAlreadyExistsError();
    }

    const userSkill = new UserSkill({
      user_id,
      name,
      description,
      proficiency,
      skill_icon_url,
    });

    await this.userSkillsRepository.create(userSkill);

    return {
      userSkill,
    };
  }
}
