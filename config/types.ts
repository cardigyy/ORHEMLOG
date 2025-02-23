export interface User {
  key: string;
  name: string;
  email: string;
  division: string;
  status: boolean;
}

export interface PartDetection {
  part_name: string;
  part_number: string;
  status: string;
  user: string;
  results: string;
}
