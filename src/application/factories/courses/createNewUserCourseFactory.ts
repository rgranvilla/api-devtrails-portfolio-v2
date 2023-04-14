import { Course } from '@domain/courses/entities/course';

type Override = Partial<Course>;

interface IMakeNewUserCourseProps {
  course_id?: string;
  user_id: string;
  override?: Override;
}

export async function createNewUserCourseFactory({
  course_id,
  user_id,
  override,
}: IMakeNewUserCourseProps) {
  return new Course(
    {
      user_id,
      name: 'course_name',
      date_start: new Date(),
    },
    course_id,
  );
}
