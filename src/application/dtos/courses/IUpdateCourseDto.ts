export interface IUpdateCourseDTO {
  name?: string;
  description?: string | null;
  course_url?: string | null;
  date_start: Date;
  date_end?: Date | null;
  duration?: number | null;
  institution?: string | null;
  institution_url?: string | null;
  location?: string | null;
  certificate?: boolean;
  notes?: string | null;
  cover_image?: string | null;
  thumbnail?: string | null;
  course_area?: string | null;
}
