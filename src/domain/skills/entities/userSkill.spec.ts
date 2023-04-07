import { randomUUID } from 'node:crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { UserSkill } from './userSkill';

let userId: string;

describe('User Skill Entity', () => {
  beforeEach(() => {
    userId = randomUUID();
  });
  it('should be able to create a new user skill', async () => {
    const {
      id,
      user_id,
      name,
      description,
      proficiency,
      skill_icon_url,
      created_at,
      updated_at,
    } = new UserSkill({
      user_id: userId,
      name: 'HTML 5',
      proficiency: 5,
      description:
        'As habilidades em HTML5 incluem conhecimento básico de HTML, uso de tags semânticas, criação de formulários personalizados, incorporação de conteúdo multimídia e criação de páginas web responsivas.',
      skill_icon_url: 'http://localhost:3333/assets/icons/html5.svg',
    });

    expect(id).toBeTruthy();
    expect(user_id).toEqual(expect.any(String));
    expect(name).toBe('HTML 5');
    expect(description).toBe(
      'As habilidades em HTML5 incluem conhecimento básico de HTML, uso de tags semânticas, criação de formulários personalizados, incorporação de conteúdo multimídia e criação de páginas web responsivas.',
    );
    expect(proficiency).toBe(5);
    expect(skill_icon_url).toBe('http://localhost:3333/assets/icons/html5.svg');
    expect(created_at).toBeTruthy();
    expect(updated_at).toBeTruthy();
  });

  it('should be able to set user values directly', async () => {
    const userSkill = new UserSkill({
      user_id: userId,
      name: 'CSS 2',
      proficiency: 3,
      description:
        'O CSS2 é uma versão mais avançada do CSS, que oferece novos recursos para estilização e design de páginas web, incluindo seletores avançados, animações, transições, sombras, gradientes, fontes personalizadas e muito mais.',
      skill_icon_url: 'http://localhost:3333/assets/icons/css2.svg',
    });

    userSkill.name = 'CSS 3';
    userSkill.proficiency = 4;
    userSkill.description =
      'O CSS3 é uma versão mais avançada do CSS, que oferece novos recursos para estilização e design de páginas web, incluindo seletores avançados, animações, transições, sombras, gradientes, fontes personalizadas e muito mais.';
    userSkill.skill_icon_url = 'http://localhost:3333/assets/icons/css3.svg';

    expect(userSkill.name).toBe('CSS 3');
    expect(userSkill.proficiency).toBe(4);
    expect(userSkill.description).toBe(
      'O CSS3 é uma versão mais avançada do CSS, que oferece novos recursos para estilização e design de páginas web, incluindo seletores avançados, animações, transições, sombras, gradientes, fontes personalizadas e muito mais.',
    );
    expect(userSkill.skill_icon_url).toBe(
      'http://localhost:3333/assets/icons/css3.svg',
    );
    expect(userSkill.created_at).toBeTruthy();
    expect(userSkill.updated_at).toBeTruthy();
  });
});
