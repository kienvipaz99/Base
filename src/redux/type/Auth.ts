export interface AuthState {
  auth: string;
}
export interface PayloadLogin {
  username: string;
  password: string;
}
export interface Payloadregiter {
  username: string;
  password: string;
  email: string;
  name: string;
  password_confirmation: string;
}
export interface ForgotPass {
  email: string;
}
export interface CoursesReviewsComment {
  rating: number | undefined;
  content: string | undefined;
}
