import fs from 'node:fs/promises';
import path, { resolve } from 'node:path';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@app';

import { createAndAuthenticateUser } from '@core/utils/tests/createAndAuthenticateUser';

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

describe('Update User Avatar (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    const { id, token } = await createAndAuthenticateUser(app);
    userToken = token;
    userId = id;
  });

  afterAll(async () => {
    await app.close();

    removeImageTestFile(userId);
  });

  it('should be able to update avatar of an user', async () => {
    const imageFolder = __dirname;
    const imagePath = path.join(imageFolder, 'test.png');

    const response = await request(app.server)
      .patch(`/users/update-avatar`)
      .set('Authorization', `Bearer ${userToken}`)
      .attach('avatar', imagePath);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('profile_image_url');
  });
});
