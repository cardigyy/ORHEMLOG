export interface IUser {
  id: string;
  name: string;
  email: string;
  division: string;
  status: number;
  profile_picture: string;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface DetectionHistory {
  id: string;
  part_name: string;
  part_number: string;
  status: string;
  user_id: string;
  image: string;
  detection_time: number;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface IAddNewUser {
  name: string;
  division: string;
  email: string;
  password: string;
}
