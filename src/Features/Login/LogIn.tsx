import { useState } from 'react';
import FormField from '../../Shared/Utility/FormField';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import UserIcon from '../../Shared/Utility/UserIcon';
import { userAction } from '../Users/Store/user-slice';
import { errToaster } from '../../Shared/UI/Toaster';
import { setCredential } from './Store/credential-slice';
import { doLogin } from '../Users/Store/user-actions';
import Button from '../../Shared/Utility/Button';
import { useAppDispatch } from '../../Shared/Hooks/hooks';
import { Ierror, Ilogin, IregisteredUser } from './login_interface';

export const initialErr: Ierror = {
  nameErr: '',
  passwordErr: '',
};

const LogIn = () => {
  const [signInUser, setSignInUser] = useState<Ilogin>({
    fullName: '',
    password: '',
  });
  const [errors, setErrors] = useState<Ierror>(initialErr);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { fullName, password } = signInUser;

  const fillData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInUser((prevUserData) => {
      return {
        ...prevUserData,
        [event.target.id]: event.target.value,
      };
    });
  };

  const signInUserValidation = (): Ierror => {
    const passwordRegex = /(?=.*[A-Z])(?=.*[0-9]).{8,}/;
    const newErrors = { ...initialErr };

    // Validate name
    if (fullName.trim() === '') {
      newErrors.nameErr = 'Name is require';
    } else if (!isNaN(parseFloat(fullName.trim()))) {
      newErrors.nameErr = 'Name Should not be number';
    }

    //validate password
    let isPasswordValid = passwordRegex.test(password);
    if (password === '') {
      newErrors.passwordErr = 'Password is require';
    } else if (!isPasswordValid) {
      newErrors.passwordErr = 'Must contain 1 uppercase letter, 1 number, min. 8 characters.';
    }
    return newErrors;
  };

  const logInForm = async (event: any) => {
    event.preventDefault();
    const validationError = signInUserValidation();
    const isErrorPresent = Object.values(validationError).some((errValue) => errValue);
    if (isErrorPresent) {
      setErrors(validationError);
      return;
    }
    setErrors(validationError);
    dispatch(userAction.showLoading());
    try {
      let registeredUser: IregisteredUser = await doLogin(fullName, password);
      dispatch(userAction.closeLoading());
      if (registeredUser) {
        dispatch(setCredential(registeredUser));
        localStorage.setItem('userId', registeredUser.id);
        navigate('/home');
      } else {
        errToaster('Invalid name/password');
      }
    } catch {
      errToaster('Something went wrong');
      dispatch(userAction.closeLoading());
    }
  };
  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-sm w-full'>
        <UserIcon />
        <h2 className='text-2xl font-semibold text-center mb-4'>Login</h2>
        <ToastContainer />
        <form>
          <div className='mb-4'>
            <FormField
              fillData={fillData}
              idName='fullName'
              labelName='Full Name *'
              inputType='text'
              inputValue={fullName}
              errorName={errors.nameErr}
            />
          </div>
          <div className='mb-3'>
            <FormField
              fillData={fillData}
              idName='password'
              labelName='Password *'
              inputType='password'
              inputValue={password}
              errorName={errors.passwordErr}
            />
          </div>
          <Button btnName='Login' btnType='success' styles='w-full' onClick={logInForm} />
          <div className='flex justify-between items-center mt-3 text-sm font-semibold'>
            <p className=' '>
              Not a member?{' '}
              <Link to='/signup' className='text-blue-500 hover:text-blue-700'>
                Signup
              </Link>
            </p>
            <Link className='text-blue-500 hover:text-blue-700' to={''}>
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
