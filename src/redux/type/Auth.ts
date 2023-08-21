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
export interface Profile {
  data: {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    user_type: string;
    phone: string;
    point: number;
    team_id: number;
    branch_id: number;
    creator_id: number;
    status: true;
    referral: null;
    code: number;
    created_at: string;
    updated_at: string;
    team: string;

    roles: [
      {
        id: number;
        name: string;
        guard_name: string;
      },
    ];
  };
}
