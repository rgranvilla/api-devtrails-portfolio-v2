export class CourseAlreadyExistsError extends Error {
  constructor() {
    super('The course name already exists.');
  }
}
