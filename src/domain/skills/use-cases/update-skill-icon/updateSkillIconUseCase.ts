import { validateUserSkillById } from 'src/application/validators/skills/validateUserSkillById';

import { IUserSkillsRepository } from '@repositories/skills/IUserSkillsRepository';

import { UserSkill } from '@domain/skills/entities/userSkill';

interface IRequest {
  skill_id: string;
  user_id: string;
  path: string;
}

interface IResponse {
  userSkill: UserSkill;
}

export class UpdateSkillIconUseCase {
  constructor(private userSkillsRepository: IUserSkillsRepository) {}

  async execute({ skill_id, user_id, path }: IRequest): Promise<IResponse> {
    const existingUserSkill = await validateUserSkillById(
      skill_id,
      this.userSkillsRepository,
    );

    const userSkillToUpdate = new UserSkill(
      {
        user_id,
        name: existingUserSkill.name,
        description: existingUserSkill.description,
        proficiency: existingUserSkill.proficiency,
        skill_icon_url: path,
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
