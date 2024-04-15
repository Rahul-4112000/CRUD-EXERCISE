interface Iuser {
  id: string;
  name: string;
  email: string;
  age: string;
  mobNum: string;
}

interface IinitialUser {
  users: Iuser[];
  selUser: Iuser;
  deleteUser: null | Iuser;
  selUserIndex: number;
  loading: boolean;
}

interface IuserErr {
  nameErr: string;
  emailErr: string;
  ageErr: string;
  mobNumErr: string;
}

export { Iuser, IinitialUser, IuserErr };
