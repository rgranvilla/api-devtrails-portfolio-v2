import { User } from '../entities/user';

export interface IUserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'creator' | 'subscriber';
  phone_number?: string | null;
  address?: string | null;
  job_title?: string | null;
  short_bio?: string | null;
  profile_image_url?: string | null;
  resume_cv_url?: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  instagram_url?: string | null;
  twitter_url?: string | null;
  whatsapp_number?: string | null;
  created_at: Date;
  updated_at: Date;
}

export class UserMapper {
  static toDatabase(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
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

  static toHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
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

  static toDomain(raw: IUserProps) {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        role: raw.role,
        phone_number: raw.phone_number,
        address: raw.address,
        job_title: raw.job_title,
        short_bio: raw.short_bio,
        profile_image_url: raw.profile_image_url,
        resume_cv_url: raw.resume_cv_url,
        linkedin_url: raw.linkedin_url,
        github_url: raw.github_url,
        instagram_url: raw.instagram_url,
        twitter_url: raw.twitter_url,
        whatsapp_number: raw.whatsapp_number,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      },
      raw.id,
    );
  }
}
