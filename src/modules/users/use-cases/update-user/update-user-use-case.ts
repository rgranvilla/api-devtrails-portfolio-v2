import { IUpdateUserProps } from '@modules/users/dtos/update-user-dto';
import { User } from '@modules/users/entities/user';
import { ResourceNotFoundError } from '@modules/users/errors/resource-not-found-error';
import { UsersRepository } from '@modules/users/repositories/users-repository';

interface IUpdateUserUseCaseRequest {
  userId: string;
  data: Partial<IUpdateUserProps>;
}

interface IUpdateUsersUseCaseResponse {
  user: User;
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    data,
  }: IUpdateUserUseCaseRequest): Promise<IUpdateUsersUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const userToUpdate = new User(
      {
        name: data.name ?? user.name,
        email: user.email,
        password: user.password,
        phone_number: data.phone_number ?? user.phone_number,
        role: data.role ?? user.role,
        address: data.address ?? user.address,
        github_url: data.github_url ?? user.github_url,
        instagram_url: data.instagram_url ?? user.instagram_url,
        job_title: data.job_title ?? user.job_title,
        linkedin_url: data.linkedin_url ?? user.linkedin_url,
        profile_image_url: data.profile_image_url ?? user.profile_image_url,
        resume_cv_url: data.resume_cv_url ?? user.resume_cv_url,
        short_bio: data.short_bio ?? user.short_bio,
        twitter_url: data.twitter_url ?? user.twitter_url,
        whatsapp_number: data.whatsapp_number ?? user.whatsapp_number,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      userId,
    );

    const updatedUser = await this.usersRepository.save(userToUpdate);

    return {
      user: updatedUser,
    };
  }
}
