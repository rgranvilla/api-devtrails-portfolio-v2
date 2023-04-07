import { randomUUID } from 'node:crypto';
import { beforeAll, describe, it } from 'vitest';

let userId: string;

describe('Create User', () => {
  beforeAll(() => {
    userId = randomUUID();
  });

  it('should be able to create an user', async () => {});

  it('should not be able to create a duplicated skill', async () => {});
});
