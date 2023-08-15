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
  revenue: number;
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
