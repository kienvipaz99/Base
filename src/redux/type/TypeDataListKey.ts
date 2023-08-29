interface TypeDataListKey {
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
  license: string;
  his: string;
  online: boolean;
  updated_at: string;
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
    referral: null;
    code: null;
    created_at: string;
    updated_at: string;
  };
  plan: {
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
  };
  product: {
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
  };
  invoices: [
    {
      id: number;
      user: {
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
        referral: null;
        code: number;
        created_at: string;
        updated_at: string;
      };
      bank: {
        id: number;
        account_holder: string;
        account_number: string;
        name_bank: string;
        short_name: string;
        code: string;
        branch: string;
      };
      files: Images[];
      total: number;
      code: string;
      status: string;
      tax: string;
      bank_id: number;
      bank_memo: string;
      transaction: null;
      coupon: null;
      discount: number;
      his: string;
      reason: null;
      note: string;
      created_at: string;
      updated_at: string;
    },
  ];
}
interface Images {
  path: string;
  full_url: string;
}
