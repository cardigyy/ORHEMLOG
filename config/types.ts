export interface IUser {
  id: string;
  name: string;
  email: string;
  division: string;
  status: number;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface PartDetection {
  part_name: string;
  part_number: string;
  status: string;
  user: string;
  results: string;
}

export interface IAddNewUser {
  name: string;
  division: string;
  email: string;
  password: string;
}
