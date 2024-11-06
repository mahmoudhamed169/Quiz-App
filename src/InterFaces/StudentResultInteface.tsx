export interface Quiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  schadule: string; // Date in ISO string format
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  updatedAt: string; // Date in ISO string format
  createdAt: string; // Date in ISO string format
  closed_at: string; // Date in ISO string format
}

export interface Participant {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface ResultStudentResponse {
  quiz: Quiz;
  result: {
    _id: string;
    quiz: {
      _id: string;
      title: string;
    };
    participant: Participant;
    score: number;
    started_at: string; // Date in ISO string format
    finished_at?: string; // Optional date in ISO string format
  };
}
