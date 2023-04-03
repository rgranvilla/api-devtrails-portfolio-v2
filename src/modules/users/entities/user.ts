import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';

interface IUserProps {
  name: string;
  email: string;
  password: string;
  phone_number?: string | null;
  address?: string | null;
  job_title?: string | null;
  short_bio?: string | null;
  profile_image_url?: string | null;
  resume_cv_url?: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  instagran_url?: string | null;
  twitter_url?: string | null;
  whatsapp_number?: string | null;
  created_at: Date;
  updated_at: Date;
}

export class User {
  private _id: string;
  private props: IUserProps;

  constructor(
    props: Replace<
      IUserProps,
      {
        created_at?: Date;
        updated_at?: Date;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      phone_number: props.phone_number ?? null,
      address: props.address ?? null,
      job_title: props.job_title ?? null,
      short_bio: props.short_bio ?? null,
      profile_image_url: props.profile_image_url ?? null,
      resume_cv_url: props.resume_cv_url ?? null,
      linkedin_url: props.linkedin_url ?? null,
      github_url: props.github_url ?? null,
      instagran_url: props.instagran_url ?? null,
      twitter_url: props.twitter_url ?? null,
      whatsapp_number: props.whatsapp_number ?? null,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }

  public set phone_number(phone_number: string | null | undefined) {
    this.props.phone_number = phone_number;
  }

  public get phone_number(): string | null | undefined {
    return this.props.phone_number;
  }

  public set address(address: string | null | undefined) {
    this.props.address = address;
  }

  public get address(): string | null | undefined {
    return this.props.address;
  }

  public set job_title(job_title: string | null | undefined) {
    this.props.job_title = job_title;
  }

  public get job_title(): string | null | undefined {
    return this.props.job_title;
  }

  public set short_bio(short_bio: string | null | undefined) {
    this.props.short_bio = short_bio;
  }

  public get short_bio(): string | null | undefined {
    return this.props.short_bio;
  }

  public set profile_image_url(profile_image_url: string | null | undefined) {
    this.props.profile_image_url = profile_image_url;
  }

  public get profile_image_url(): string | null | undefined {
    return this.props.profile_image_url;
  }

  public set resume_cv_url(resume_cv_url: string | null | undefined) {
    this.props.resume_cv_url = resume_cv_url;
  }

  public get resume_cv_url(): string | null | undefined {
    return this.props.resume_cv_url;
  }

  public set linkedin_url(linkedin_url: string | null | undefined) {
    this.props.linkedin_url = linkedin_url;
  }

  public get linkedin_url(): string | null | undefined {
    return this.props.linkedin_url;
  }

  public set github_url(github_url: string | null | undefined) {
    this.props.github_url = github_url;
  }

  public get github_url(): string | null | undefined {
    return this.props.github_url;
  }

  public set instagran_url(instagran_url: string | null | undefined) {
    this.props.instagran_url = instagran_url;
  }

  public get instagran_url(): string | null | undefined {
    return this.props.instagran_url;
  }

  public set twitter_url(twitter_url: string | null | undefined) {
    this.props.twitter_url = twitter_url;
  }

  public get twitter_url(): string | null | undefined {
    return this.props.twitter_url;
  }

  public set whatsapp_number(whatsapp_number: string | null | undefined) {
    this.props.whatsapp_number = whatsapp_number;
  }

  public get whatsapp_number(): string | null | undefined {
    return this.props.whatsapp_number;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }
}
