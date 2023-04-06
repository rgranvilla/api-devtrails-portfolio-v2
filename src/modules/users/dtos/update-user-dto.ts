export interface IUpdateUserProps {
  name: string;
  phone_number: string;
  password: string;
  role: 'admin' | 'creator' | 'subscriber';
  address: string;
  job_title: string;
  short_bio: string;
  profile_image_url: string;
  resume_cv_url: string;
  linkedin_url: string;
  github_url: string;
  instagram_url: string;
  twitter_url: string;
  whatsapp_number: string;
}
