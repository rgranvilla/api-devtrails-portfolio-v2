import { FastifyRequest } from 'fastify';
import multer from 'fastify-multer';
import fs from 'node:fs/promises';
import path, { resolve } from 'node:path';

import { InvalidAvatarFileTypeError } from '@core/errors/invalidAvatarFileTypeError';

const _tmpFolder = resolve(__dirname, '..', '..', '..', 'tmp', 'uploads');

const storage = multer.diskStorage({
  destination: async (req: FastifyRequest, file, cb) => {
    const { sub: user_id } = req.user;
    const { skill_id } = req.params as { skill_id: string };

    const userFolder = path.join(_tmpFolder, user_id, 'skills', skill_id);

    try {
      const exists = await fs
        .access(userFolder)
        .then(() => true)
        .catch(() => false);

      if (exists) {
        await fs.rm(userFolder, { recursive: true });
      }

      await fs.mkdir(userFolder, { recursive: true });
    } catch (error) {
      console.error(`Erro ao criar a pasta ${userFolder}: ${error}`);
    }

    cb(null, userFolder);
  },
  filename: (req: FastifyRequest, file, cb) => {
    const { skill_id } = req.params as { skill_id: string };

    const fileName = `${skill_id}.${file.mimetype.split('/')[1]}`;

    cb(null, fileName);
  },
});

const fileFilter = (req: FastifyRequest, file: any, cb: any | Error) => {
  // Verifica se o tipo do arquivo é PNG ou JPEG
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/webp'
  ) {
    cb(null, true);
  } else {
    cb(new InvalidAvatarFileTypeError());
  }
};

const limits = {
  fileSize: 150 * 1024, // maximum file size (150 Kb)
};

export const uploadSkillIconConfig = multer({ storage, fileFilter, limits });
