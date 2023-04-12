import { randomUUID } from 'node:crypto';

import { Replace } from '@core/helpers/replace';

interface ICourseProps {
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

export class Course {
  private _id: string;
  private props: ICourseProps;

  constructor(
    props: Replace<
      ICourseProps,
      {
        certificate?: boolean;
        created_at?: Date;
        updated_at?: Date;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      description: props.description ?? null,
      course_url: props.course_url ?? null,
      date_end: props.date_end ?? null,
      duration: props.duration ?? null,
      institution: props.institution ?? null,
      institution_url: props.institution_url ?? null,
      location: props.location ?? null,
      certificate: props.certificate ?? false,
      notes: props.notes ?? null,
      cover_image: props.cover_image ?? null,
      thumbsnail: props.thumbsnail ?? null,
      course_area: props.course_area ?? null,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set description(description: string | null | undefined) {
    this.props.description = description;
  }

  public get description(): string | null | undefined {
    return this.props.description;
  }

  public set course_url(course_url: string | null | undefined) {
    this.props.course_url = course_url;
  }

  public get course_url(): string | null | undefined {
    return this.props.course_url;
  }

  public set date_start(date_start: Date) {
    this.props.date_start = date_start;
  }

  public get date_start(): Date {
    return this.props.date_start;
  }

  public set date_end(date_end: Date | null | undefined) {
    this.props.date_end = date_end;
  }

  public get date_end(): Date | null | undefined {
    return this.props.date_end;
  }

  public set duration(duration: number | null | undefined) {
    this.props.duration = duration;
  }

  public get duration(): number | null | undefined {
    return this.props.duration;
  }

  public set institution(institution: string | null | undefined) {
    this.props.institution = institution;
  }

  public get institution(): string | null | undefined {
    return this.props.institution;
  }

  public set institution_url(institution_url: string | null | undefined) {
    this.props.institution_url = institution_url;
  }

  public get institution_url(): string | null | undefined {
    return this.props.institution_url;
  }

  public set location(location: string | null | undefined) {
    this.props.location = location;
  }

  public get location(): string | null | undefined {
    return this.props.location;
  }

  public set certificate(certificate: boolean) {
    this.props.certificate = certificate;
  }

  public get certificate(): boolean {
    return this.props.certificate;
  }

  public set notes(notes: string | null | undefined) {
    this.props.notes = notes;
  }

  public get notes(): string | null | undefined {
    return this.props.notes;
  }

  public set cover_image(cover_image: string | null | undefined) {
    this.props.cover_image = cover_image;
  }

  public get cover_image(): string | null | undefined {
    return this.props.cover_image;
  }

  public set thumbsnail(thumbsnail: string | null | undefined) {
    this.props.thumbsnail = thumbsnail;
  }

  public get thumbsnail(): string | null | undefined {
    return this.props.thumbsnail;
  }

  public set course_area(course_area: string | null | undefined) {
    this.props.course_area = course_area;
  }

  public get course_area(): string | null | undefined {
    return this.props.course_area;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }
}
