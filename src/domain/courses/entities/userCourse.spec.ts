import { describe, expect, it } from 'vitest';

import { UserCourse } from './userCourse';

describe('User Entity', () => {
  it('should be able to create a new course', async () => {
    const {
      id,
      user_id,
      name,
      description,
      course_url,
      date_start,
      date_end,
      duration,
      institution,
      institution_url,
      location,
      certificate,
      notes,
      cover_image,
      thumbnail,
      course_area,
      created_at,
      updated_at,
    } = new UserCourse({
      name: 'Javascript',
      date_start: new Date('June 1, 2022'),
      user_id: 'an user id',
    });

    expect(id).toBeTruthy();
    expect(user_id).toBeTruthy();
    expect(name).toBe('Javascript');
    expect(description).toBeNull();
    expect(course_url).toBeNull();
    expect(date_start).toEqual(expect.any(Date));
    expect(date_end).toBeNull();
    expect(duration).toBeNull();
    expect(institution).toBeNull();
    expect(institution_url).toBeNull();
    expect(location).toBeNull();
    expect(certificate).toBe(false);
    expect(notes).toBeNull();
    expect(cover_image).toBeNull();
    expect(thumbnail).toBeNull();
    expect(course_area).toBeNull();
    expect(created_at).toEqual(expect.any(Date));
    expect(updated_at).toEqual(expect.any(Date));
  });

  it('should be able to set course values directly', async () => {
    const course = new UserCourse({
      name: 'Javascript',
      description:
        '<h1 class="code-line" data-line-start=0 data-line-end=1 ><a id="Javascript_0"></a>Javascript</h1>\n      <p class="has-line-data" data-line-start="2" data-line-end="3">In this JavaScript course, I learned a wide range of fundamental and advanced concepts for programming in this language. Some of the key topics that I covered in the course include:</p>\n      <ul>\n      <li class="has-line-data" data-line-start="4" data-line-end="6">\n      <p class="has-line-data" data-line-start="4" data-line-end="5">Variables and Data Types: I learned how to declare and utilize variables in JavaScript, as well as understand the different data types used in the language, such as strings, numbers, and booleans.</p>',
      date_start: new Date('June 1, 2022'),
      user_id: 'an user id',
    });

    course.name = 'Typescript';
    course.description =
      '"<h1 class="code-line" data-line-start=0 data-line-end=1 ><a id="Javascript_0"></a>Javascript</h1>\n      <p class="has-line-data" data-line-start="2" data-line-end="3">In this JavaScript course, I learned a wide range of fundamental and advanced concepts for programming in this language. Some of the key topics that I covered in the course include:</p>\n      <ul>\n      <li class="has-line-data" data-line-start="4" data-line-end="6">\n      <p class="has-line-data" data-line-start="4" data-line-end="5">Variables and Data Types: I learned how to declare and utilize variables in JavaScript, as well as understand the different data types used in the language, such as strings, numbers, and booleans.</p>"';
    course.course_url = 'http://course-url...';
    course.date_start = new Date('January 1, 2023');
    course.date_end = new Date('February 15, 2023');
    course.duration = 30;
    course.institution = 'Typescript Org';
    course.institution_url = 'https://www.typescriptlang.org/';
    course.location = 'Remote';
    course.certificate = true;
    course.notes = 'notes...';
    course.cover_image = 'http://cover-image...';
    course.thumbnail = 'http://thumbnail...';
    course.course_area = 'advanced';

    expect(course.name).toBe('Typescript');
    expect(course.description).toEqual(expect.any(String));
    expect(course.date_start).toEqual(expect.any(Date));
    expect(course.date_end).toEqual(expect.any(Date));
    expect(course.duration).toBe(30);
    expect(course.institution).toBe('Typescript Org');
    expect(course.institution_url).toBe('https://www.typescriptlang.org/');
    expect(course.location).toBe('Remote');
    expect(course.certificate).toBeTruthy();
    expect(course.notes).toBe('notes...');
    expect(course.cover_image).toBe('http://cover-image...');
    expect(course.thumbnail).toBe('http://thumbnail...');
    expect(course.course_area).toBe('advanced');
    expect(course.created_at).toEqual(expect.any(Date));
    expect(course.updated_at).toEqual(expect.any(Date));
  });
});
