export type LessonData = {
  id: number;
  isCompleted?: boolean;
  title: string;
  path: string;
};

export type TrackData = {
  [key: string]: any;
  id: number | string;
  title: string;
  path: string;
  lessons: LessonData[];
};

export type Params = {
  slug?: string;
  lessonId?: string;
};