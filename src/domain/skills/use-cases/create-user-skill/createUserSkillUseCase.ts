import { UserSkillAlreadyExistError } from '@errors/skills/userSkillAlreadyExistError';

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
    const userSkill = await this.userSkillsRepository.findByNameAndUserId(
      name,
      user_id,
    );

    if (userSkill !== null) {
      throw new UserSkillAlreadyExistError();
    }

    const createdUserSkill = new UserSkill({
      user_id,
      name,
      description,
      proficiency,
      skill_icon_url,
    });

    await this.userSkillsRepository.create({
      user_id,
      name,
      description,
      proficiency,
      skill_icon_url,
    });

    return {
      userSkill: createdUserSkill,
    };
  }
}
