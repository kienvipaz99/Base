interface KPIEMPloyee {
  id: number;
  name: string;
  team: string;
  kpi: number;
  doanhso: number;
  daduyet: number;
  thangtruoc: number;
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
  team: string;
  kpi: number;
  doanhso: number;
  daduyet: number;
  thangtruoc: number;
  email: string;
  sdt: string;
  chinhanh: string;
  vaitro: string;
  status: boolean;
  created_at: string;
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
