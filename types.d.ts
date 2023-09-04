type UserDetails = {
  userId: number;
  email: string;
  firstname: string;
  lastname: string;
  birthday: date;
  role:
    | 'buyer'
    | 'member'
    | 'club admin'
    | 'school admin'
    | 'super admin'
    | null;
};

type Organization = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type NewOrganization = {
  name: string;
  description: string;
};
