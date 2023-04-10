import { validateUser } from 'src/application/validators/users/validateUser';

import { IUpdateUserDto } from '@dtos/users/IUpdateUserDto';

import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { User } from '@domain/users/entities/user';

interface IUpdateUserUseCaseRequest {
  user_id: string;
  data: Partial<IUpdateUserDto>;
}

interface IUpdateUsersUseCaseResponse {
  user: User;
}

export class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    user_id,
    data,
  }: IUpdateUserUseCaseRequest): Promise<IUpdateUsersUseCaseResponse> {
    const existingUser = await validateUser(user_id, this.usersRepository);

    const userToUpdate = new User(
      {
        name: data.name ?? existingUser.name,
        email: existingUser.email,
        password: existingUser.password,
        phone_number: data.phone_number ?? existingUser.phone_number,
        role: data.role ?? existingUser.role,
        address: data.address ?? existingUser.address,
        github_url: data.github_url ?? existingUser.github_url,
        instagram_url: data.instagram_url ?? existingUser.instagram_url,
        job_title: data.job_title ?? existingUser.job_title,
        linkedin_url: data.linkedin_url ?? existingUser.linkedin_url,
        profile_image_url:
          data.profile_image_url ?? existingUser.profile_image_url,
        resume_cv_url: data.resume_cv_url ?? existingUser.resume_cv_url,
        short_bio: data.short_bio ?? existingUser.short_bio,
        twitter_url: data.twitter_url ?? existingUser.twitter_url,
        whatsapp_number: data.whatsapp_number ?? existingUser.whatsapp_number,
        created_at: existingUser.created_at,
        updated_at: existingUser.updated_at,
      },
      user_id,
    );

    const updatedUser = await this.usersRepository.save(userToUpdate);

    return {
      user: updatedUser,
    };
  }
}
