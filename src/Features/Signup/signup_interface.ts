import { Ierror } from '../Login/login_interface';

interface IsignupErr extends Ierror {
  emailErr: string;
}

export { IsignupErr };
