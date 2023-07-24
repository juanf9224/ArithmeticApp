
export interface IUser {
  id: number | undefined;
  username: string;
  status: string;
}

export interface IAuth {
  isAuthenticated: boolean;
}

export interface IUserState extends IUser {
  auth: IAuth;
}

export const initialUserState: IUserState = {
  id: undefined,
  username: '',
  status: '',
  auth: {
    isAuthenticated: false,
  },
};

