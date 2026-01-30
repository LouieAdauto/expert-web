export interface Profile {
  id: string;
  about: string;
  address: string;
  alias: string;
  backimage: string;
  birthdate: string;
  country_id: number;
  image: string;
  municipality: string;
  name: string;
  phone_number: string;
  position: string;
  postal_code: string;
  rating: number; 
  skill_id: number;
  state_name: string;
  price_rate: number;
  yoe: number;
  experience: Experience[];
  countries: Country;
}

export type Experience = {
  id: number;
  title: string;
  user_id: number;
  companyname: string;
  companyimage: string;
  start_date?: string;
  end_date?: string;
  position?: string;
};

export type Country = {
    id: number,
    iso: string,
    name: string
}

export type Skill = {
    id: number,
    name: string,
    description: string
}