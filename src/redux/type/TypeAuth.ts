interface Login {
  email: string;
  password: string;
}
interface Token {
  apiToken: string;
}
interface ErrorCall {
  error: {data: {payload: {errors: string[]}}};
}
interface VeryToken {
  token: string;
}
interface VeryTokenData {
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
