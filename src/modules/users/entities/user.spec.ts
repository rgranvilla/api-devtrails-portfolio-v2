import { compare } from 'bcryptjs';
import { createHashPassword } from 'src/core/utils/create-hash-password';
import { describe, expect, it } from 'vitest';

import { User } from './user';

describe('User Entity', () => {
  it('should be able to create a new user', async () => {
    const {
      id,
      name,
      email,
      password,
      role,
      phone_number,
      address,
      job_title,
      short_bio,
      profile_image_url,
      resume_cv_url,
      linkedin_url,
      github_url,
      instagram_url,
      twitter_url,
      whatsapp_number,
      created_at,
      updated_at,
    } = new User({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'Aa123456',
    });

    expect(id).toBeTruthy();
    expect(name).toBe('John Doe');
    expect(email).toBe('johndoe@mail.com');
    expect(password).toBeTruthy();
    expect(role).toBe('subscriber');
    expect(phone_number).toBeNull();
    expect(address).toBeNull();
    expect(job_title).toBeNull();
    expect(short_bio).toBeNull();
    expect(profile_image_url).toBeNull();
    expect(resume_cv_url).toBeNull();
    expect(linkedin_url).toBeNull();
    expect(github_url).toBeNull();
    expect(instagram_url).toBeNull();
    expect(twitter_url).toBeNull();
    expect(whatsapp_number).toBeNull();
    expect(created_at).toBeTruthy();
    expect(updated_at).toBeTruthy();
  });

  it('should be able to set user values directly', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'Aa123456',
    });

    user.name = 'Mary';
    user.email = 'mary@mail.com';
    user.password = await createHashPassword('123456');
    user.role = 'creator';
    user.phone_number = '+5551999991111';
    user.address = 'rua A, 120, ...';
    user.job_title = 'Fullstack Developer';
    user.short_bio = 'This is a short bio...';
    user.profile_image_url = 'http://...';
    user.resume_cv_url = 'http://...';
    user.linkedin_url = 'http://...';
    user.github_url = 'http://...';
    user.instagram_url = 'http://...';
    user.twitter_url = 'http://...';
    user.whatsapp_number = 'http://...';

    const doesPasswordMatches = await compare('123456', user.password);

    expect(user.name).toBe('Mary');
    expect(user.email).toBe('mary@mail.com');
    expect(user.role).toBe('creator');
    expect(user.phone_number).toBe('+5551999991111');
    expect(user.address).toBe('rua A, 120, ...');
    expect(user.job_title).toBe('Fullstack Developer');
    expect(user.short_bio).toBe('This is a short bio...');
    expect(user.profile_image_url).toBe('http://...');
    expect(user.resume_cv_url).toBe('http://...');
    expect(user.linkedin_url).toBe('http://...');
    expect(user.github_url).toBe('http://...');
    expect(user.instagram_url).toBe('http://...');
    expect(user.twitter_url).toBe('http://...');
    expect(user.whatsapp_number).toBe('http://...');
    expect(user.created_at).toBeTruthy();
    expect(user.updated_at).toBeTruthy();

    expect(doesPasswordMatches).toBe(true);
  });
});
