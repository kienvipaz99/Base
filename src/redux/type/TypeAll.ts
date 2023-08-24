interface Bank {
  id?: number;
  account_holder: string;
  account_number: string;
  name_bank: string;
  short_name: string;
  code: string;
  branch: string;
}
interface Banking {
  id: number;
  name: string;
  code: string;
  bin: string;
  shortName: string;
  logo: string;
  transferSupported: number;
  lookupSupported: number;
  short_name: string;
  support: number;
  isTransfer: number;
  swift_code: string;
}

interface Plans {
  id: number;
  tag: string;
  name: string;
  description: string;
  is_active: boolean;
  price: number;
  signup_fee: number;
  currency: string;
  trial_period: number;
  trial_interval: string;
  trial_mode: string;
  grace_period: number;
  grace_interval: string;
  invoice_period: number;
  invoice_interval: string;
  tier: number;
}
interface Logs {
  id: number;
  version: string;
  detail: string;
  updated_at: string;
}
interface RevenueTeam {
  id: number;
  name: string;
  slug: string;
  parent_id: number;
  branch_id: number;
  ranges: ['string', 'string'];
  revenue: number;
  revenue_approve: number;
}
interface DashboardRevenue {
  data: {
    yearTotalCountryRevenue: number;
    nowLastMonthTotalCountryRevenue: number;
    thisMonthTotalCountryRevenue: number;
    thisMonthTotalCountryRevenueApprove: number;
    totalKpiYear: number;
    totalKpiMonth: number;
    thisDayPreviousMonth: number;
    today: {
      todayTotalCountryRevenue: number;
      avgDayTotalKpiMonth: number;
    };
    yesterdayTotalCountryRevenue: number;
  };
}
interface Activities {
  id: number;
  event: string;
  created_at: string;
  subject_type: string;
  causer: string;
  changes: {
    attributes: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      email_verified_at: string;
      password: string;
      remember_token: null;
      deleted_at: null;
      created_at: string;
      updated_at: string;
      user_type: string;
      phone: string;
      point: number;
      status: boolean;
      code: number;
      referral: string;
      team_id: number;
      branch_id: number;
      creator_id: number;
    };
  };
  description: 'Thêm mới: Quản lý User - bởi Hệ thống. Giá trị mới: 1653, Hung, Trinh Quang, hungtqemail114@gmail.com, , $2y$10$kayMUrBdijpx5O2GBFNPjOwbxmfip4kr8.MM11LQ.kBGOPAne8LYW, , , 2023-08-10T08:30:01.000000Z, 2023-08-10T08:30:01.000000Z, GUEST, 01238404567, , , , , , , ';
  list_subject: {
    'App\\Models\\User': 'Quản lý User';
    'App\\Models\\Invoice': 'Hóa đơn';
    'App\\Models\\File': 'File';
    'App\\Models\\PlanSubscription': 'Key bản quyền';
  };
}
interface dasBoadChart {
  data: {
    labels: number[];
    current: number[];
    paided: number[];
  };
}
interface CreateUser {
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  user_type?: string;
  team_id?: number;
  phone?: string;
  branch_id?: number;
  roles?: string;
}
interface User {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
  phone: string;
  point: number;
  team_id: string;
  branch_id: string;
  creator_id: string;
  status: boolean;
  referral: string;
  code: string;
  created_at: string;
  updated_at: string;
  team: {
    id: number;
    name: string;
    slug: string;
    parent_id: number;
    branch_id: number;
    users_count: number;
  };
}
interface TypeUser {
  name: string;
  value: string;
}
interface GetUser {
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
  status: boolean;
  referral: string;
  code: string;
  created_at: string;
  updated_at: string;
  revenue: number;
  revenue_approve: number;
  revenue_last_month: number;
}
interface Invoices {
  id: number;
  tag: string;
  name: string;
  description: string;
  price: number;
  is_old: boolean;
  remaing_day: number;
  currency: string;
  subscriber_type: string;
  trial_period: number;
  trial_interval: string;
  grace_period: number;
  grace_interval: string;
  invoice_period: number;
  invoice_interval: string;
  tier: number;
  trial_ends_at: string;
  starts_at: string;
  ends_at: string;
  cancels_at: string;
  canceled_at: string;
  license: number;
  his: string;
  online: boolean;
  updated_at: number;
  subscriber: {
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
    status: boolean;
    referral: string;
    code: string;
    created_at: string;
    updated_at: number;
  };
}
interface CreateInvoices {
  user_id?: number;
  subscriber_id?: number;
  product_id?: number;
  plan_id?: number;
  total?: number;
  code?: string;
  status?: string;
  tax?: string;
  bank_id?: number;
  discount?: number;
  his?: string;
  note?: string;
  email?: string;
  bank_memo?: string;
}
interface ChangeInVoid {
  id: number | undefined;
  data:
    | {
        his?: string;
        _method: string;
        upload_invoice?: string;
        note?: string;
        status?: string;
      }
    | any;
}
interface ChangeUser {
  id?: number;
  data: {
    first_name?: string;
    status?: boolean;
    last_name?: string;
    email?: string;
    phone?: string;
    password?: string;
    password_confirmation?: string;
    _method?: string;
    team_id?: number;
    branch_id?: number;
    roles?: string;
    user_type: string;
  };
}
interface Status {
  id: number;
  status: boolean;
}
interface Team {
  id: number;
  name: string;
  slug: string;
  parent_id: number;
  branch_id: number;
  users_count: number;
}
interface Branches {
  id: number;
  name: string;
  slug: string;
  team: Team[];
  revenue: number;
  revenue_approve: number;
  revenue_today: number;
  ranges: [];
}
interface Roles {
  id: number;
  name: string;
  guard_name: string;
}
interface SelectCustom {
  id: number;
  name: string;
  teams: Team[];
}
interface CreatTeam {
  name: string;
  branch_id?: number;
  slug: string;
}
interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  prefix_key: string;
  status: number;
  version: string;
  url: string;
  created_at: string;
  ranges: [];
  revenue: number;
  revenue_approve: number;
}
