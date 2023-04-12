import fs from 'node:fs/promises';
import path, { resolve } from 'node:path';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';
import { createUserSkill } from '@core/utils/tests/createUserSkill';

async function removeImageTestFile(id: string) {
  const userFolder = resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    '..',
    'tmp',
    'uploads',
    `${userId}`,
  );

  try {
    const exists = await fs
      .access(userFolder)
      .then(() => true)
      .catch(() => false);

    if (exists) {
      await fs.rm(userFolder, { recursive: true });
    }
  } finally {
    console.info(
      `The image file test.png was successfuly removed from the uploads folder locate at "${userFolder}/".`,
    );
  }
}

let userToken: string;
let userId: string;
let skillId: string;

describe('Update Skill Icon (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    const { id, token } = await createAndAuthenticateUser(app);
    userToken = token;
    userId = id;
    const { userSkill } = await createUserSkill(app, userId, userToken);
    skillId = userSkill.id;
  });

  afterAll(async () => {
    await app.close();

    removeImageTestFile(userId);
  });

  it('should be able to update skill icon', async () => {
    const imageFolder = __dirname;
    const imagePath = path.join(imageFolder, 'test.png');

    const response = await request(app.server)
      .patch(`/${userId}/skills/${skillId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .attach('skill_icon', imagePath);

    expect(response.status).toBe(200);
    expect(response.body.skill).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        user_id: userId,
        name: 'skill_name',
        description: 'skill_description',
        proficiency: 5,
        skill_icon_url: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
