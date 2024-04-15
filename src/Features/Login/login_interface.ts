interface Ilogin {
  fullName: string;
  password: string;
}

interface Isignup extends Ilogin {
  email: string;
}

interface IregisteredUser extends Isignup {
  id: string;
}

interface IloggedinUser {
  loginUser: null | IregisteredUser;
}

interface Ierror {
  nameErr: string;
  passwordErr: string;
}

export { IregisteredUser, Isignup, Ilogin, IloggedinUser, Ierror };
