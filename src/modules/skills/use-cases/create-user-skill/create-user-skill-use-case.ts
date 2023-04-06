import { UserSkill } from '@modules/skills/entities/user-skill';
import { UserSkillsRepository } from '@modules/skills/repositories/UserSkillsRepository';
import { ResourceNotFoundError } from '@modules/users/errors/resource-not-found-error';

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
  constructor(private userSkillsRepository: UserSkillsRepository) {}

  async execute({
    user_id,
    name,
    description,
    proficiency,
    skill_icon_url,
  }: ICreateUserSkillUseCaseRequest): Promise<ICreateUserSkillUseCaseResponse> {
    const userSkills = await this.userSkillsRepository.findByUserId(user_id);

    if (!userSkills) {
      throw new ResourceNotFoundError();
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
