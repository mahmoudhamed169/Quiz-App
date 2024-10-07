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
  __v: number;}

