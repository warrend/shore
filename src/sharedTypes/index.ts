export type LessonData = {
  id?: number;
  isCompleted?: boolean;
  title?: string;
  path?: string;
  readTime?: string;
};

export type TrackData = {
  [key: string]: any;
  id?: number | string;
  title?: string;
  path?: string;
  lessons?: LessonData[];
};

export type Params = {
  slug?: string;
  lessonId?: string;
};

export type TLastLesson = {
  track?: string;
  lesson?: TLesson | string;
};

export type TLesson =
  | {
      lesson?: LessonData;
      markdown?: string;
      readTime?: string;
    }
  | null
  | undefined;
