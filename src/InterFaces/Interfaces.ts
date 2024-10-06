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
