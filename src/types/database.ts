export interface CustomerInfo {
  id: string;
  email: string;
  company_name: string | null;
  contact_number: string | null;
  address: string | null;
  user_id: string | null;
  customer_id: string;
  created_at: string;
}

export interface Project {
  id: string;
  customer_id: string | null;
  project_name: string | null;
  location: string | null;
  product_type: string | null;
  number_of_spaces: number | null;
  contact_person: string | null;
  contact_number: string | null;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  user_id: string | null;
  subject: string;
  description: string;
  images: string[] | null;
  status: string;
  created_at: string;
}

export interface RaulLiveFeed {
  id: string;
  project_id: string | null;
  customer_id: string | null;
  unit_name: string | null;
  status: string | null;
  space: number | null;
  code: string | null;
  health: string | null;
  uses_this_month: number;
  last_updated: string;
}
