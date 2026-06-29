export type AITool =
  | "lesson-planner"
  | "activity-generator"
  | "parent-letter";

export type LessonPlanInput = {
  grade: string;
  subject: string;
  skill: string;
  duration: string;
  notes?: string;
};

export type ActivityInput = {
  grade: string;
  activityType: string;
  skill: string;
  duration: string;
  materials?: string;
};

export type ParentLetterInput = {
  grade: string;
  letterType: string;
  tone: string;
  message: string;
  details?: string;
};

export type LessonPlanOutput = {
  title: string;
  grade: string;
  subject: string;
  duration: string;
  objective: string;
  materials: string[];
  miniLesson: string;
  studentPractice: string;
  differentiation: string;
  teacherNotes: string;
};

export type ActivityOutput = {
  title: string;
  grade: string;
  activityType: string;
  duration: string;
  setup: string;
  materials: string[];
  teacherDirections: string;
  studentSteps: string;
  differentiation: string;
  quickCheck: string;
};

export type ParentLetterOutput = {
  title: string;
  grade: string;
  letterType: string;
  tone: string;
  greeting: string;
  body: string;
  importantDetails: string;
  closing: string;
};