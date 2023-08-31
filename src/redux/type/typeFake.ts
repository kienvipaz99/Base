interface KPIEMPloyee {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
  phone: string;
  point: string;
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
  team: Team;
}
interface itemHome {
  id: number;
  name: string;
  icon: string;
  navigation: string;
}
interface itemManage {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  branch_id: null;
  code: null;
  created_at: string;
  creator_id: number;
  phone: string;
  point: null;
  referral: null;
  status: boolean;
  team_id: null;
  updated_at: string;
  user_type: string;
}
interface itemManageEmployee {
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
  referral: string;
  code: string;
  created_at: string;
  updated_at: string;
  revenue: string;
  revenue_approve: string;
  revenue_last_month: number;
  roles: [
    {
      id: number;
      name: string;
      guard_name: string;
    },
  ];
  team: {
    id: number;
    name: string;
    slug: string;
    parent_id: number;
    branch_id: number;
    users_count: number;
  };
}
interface itemManageProduct {
  id: number;
  name: string;
  msp: string;
  mota: string;
  ngaytao: string;
  phienban: string;
  status: boolean;
}
interface itemManageService {
  id: number;
  name: string;
  gia: number;
  time: string;
  sanpham: string;
  status: boolean;
}
interface itemManageAgency {
  id: number;
  name: string;
  email: string;
  sdt: string;
  daily: string;
  status: boolean;
}
interface Rank {
  id: number;
  name: string;
  team: string;
  key: number;
  lastMonth: number;
  img: number;
}
