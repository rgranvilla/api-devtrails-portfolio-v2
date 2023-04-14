import { Course } from '@domain/courses/entities/course';

export interface ICourseProps {
  id: string;
  user_id: string;
  name: string;
  description?: string | null;
  course_url?: string | null;
  date_start: Date;
  date_end?: Date | null;
  duration?: number | null;
  institution?: string | null;
  institution_url?: string | null;
  location?: string | null;
  certificate: boolean;
  notes?: string | null;
  cover_image?: string | null;
  thumbsnail?: string | null;
  course_area?: string | null;
  created_at: Date;
  updated_at: Date;
}

export class CourseMapper {
  static toDatabase(course: Course) {
    return {
      id: course.id,
      user_id: course.user_id,
      name: course.name,
      description: course.description,
      course_url: course.course_url,
      date_start: course.date_start,
      date_end: course.date_end,
      duration: course.duration,
      institution: course.institution,
      institution_url: course.institution_url,
      location: course.location,
      certificate: course.certificate,
      notes: course.notes,
      cover_image: course.cover_image,
      thumbsnail: course.thumbsnail,
      course_area: course.course_area,
      created_at: course.created_at,
      updated_at: course.updated_at,
    };
  }

  static toDomain(raw: ICourseProps) {
    return new Course(
      {
        user_id: raw.user_id,
        name: raw.name,
        description: raw.description,
        course_url: raw.course_url,
        date_start: raw.date_start,
        date_end: raw.date_end,
        duration: raw.duration,
        institution: raw.institution,
        institution_url: raw.institution_url,
        location: raw.location,
        certificate: raw.certificate,
        notes: raw.notes,
        cover_image: raw.cover_image,
        thumbsnail: raw.thumbsnail,
        course_area: raw.course_area,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      },
      raw.id,
    );
  }
}
