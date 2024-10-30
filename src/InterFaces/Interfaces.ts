import { RefObject } from "react";

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    profile: {
      _id: string;
      first_name: string;
      last_name: string;
      email: string;
      status: string;
      role: string;
    };
  };
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: "Instructor" | "Student";
}
export interface RegisterResponse {
  message: string;
}

export interface ChangePasswordReguest {
  password: string;
  password_new: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface Group {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  avg_score: number;
  group: Group;
}

export interface Question {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}

export interface Quiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  questions: Question[];
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export interface DeleteModalType {
  setOpenModal: (value: boolean) => void;
  openModal: boolean;
  loading: boolean;
  onConfirm: () => void;
  title: string;
  modalRef: RefObject<HTMLDivElement>;
}
export interface UpdateModalType {
  setOpenModal: (value: boolean) => void;
  openModal: boolean;
  loading: boolean;
  onConfirm: (value: string) => void;
  title: string;
  modalRef: RefObject<HTMLDivElement>;
}

interface Options {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}

export interface IQuestion {
  _id: string;
  title: string;
  description: string;
  options: Options;
  answer: string;
  status: "active" | "inactive";
  instructor: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  type: "BE" | "MCQ" | "ShortAnswer" | "FE";
}

export interface QuizRequest {
  title: string;
  description: string;
  group: string;
  questions_number: number;
  difficulty: string;
  type: string;
  schadule: string;
  duration: string;
  score_per_question: string;
}
 interface QuizResult {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: "open" | "closed"; // Enum for status
  instructor: string; // Instructor ID
  group: string; // Group ID
  questions_number: number;
  schadule: string; // Date in ISO format
  duration: number; // Duration in minutes
  score_per_question: number;
  type: string; // Example: "BE", "FE"
  difficulty: "easy" | "medium" | "hard"; // Enum for difficulty
  updatedAt: string; // Date in ISO format
  createdAt: string; // Date in ISO format
  closed_at?: string; // Optional field for closed quizzes
}

export interface Participant {
  _id: string;
  quiz: {
    _id: string;
    title: string;
  };
  participant: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  score: number;
  started_at: string;
  finished_at?: string; // Optional if quiz is ongoing
}

export interface ResultResponse {
  quiz: QuizResult;
  participants: Participant[];
}
