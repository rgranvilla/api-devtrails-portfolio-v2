import { User } from '../entities/user';

export class UserViewModel {
  static toHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      phone_number: user.phone_number,
      address: user.address,
      job_title: user.job_title,
      short_bio: user.short_bio,
      profile_image_url: user.profile_image_url,
      resume_cv_url: user.resume_cv_url,
      linkedin_url: user.linkedin_url,
      github_url: user.github_url,
      instagram_url: user.instagram_url,
      twitter_url: user.twitter_url,
      whatsapp_number: user.whatsapp_number,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
