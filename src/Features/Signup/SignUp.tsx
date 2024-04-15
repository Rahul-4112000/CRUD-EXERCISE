import { useState } from 'react';
import FormField from '../../Shared/Utility/FormField';
import Button from '../../Shared/Utility/Button';
import { Link, useNavigate } from 'react-router-dom';
import UserIcon from '../../Shared/Utility/UserIcon';
import { ToastContainer } from 'react-toastify';
import { userAction } from '../Users/Store/user-slice';
import { errToaster } from '../../Shared/UI/Toaster';
import { doSignup } from '../Users/Store/user-actions';
import { setCredential } from '../Login/Store/credential-slice';
import { useAppDispatch } from '../../Shared/Hooks/hooks';
import { IsignupErr } from './signup_interface';
import { IregisteredUser, Isignup } from '../Login/login_interface';
import { Iuser } from '../Users/user_interface';

const initialErr = {
  nameErr: '',
  emailErr: '',
  passwordErr: '',
};

const SignUp = () => {
  const [signupUser, setSignupUser] = useState<Isignup>({
    fullName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<IsignupErr>(initialErr);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { fullName, email, password } = signupUser;

  const fillData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupUser((prevUserData) => {
      return {
        ...prevUserData,
        [event.target.id]: event.target.value,
      };
    });
  };

  const signupUserValidation = (): IsignupErr => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}$/;
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

    // validate email
    let isEmailValid = emailRegex.test(email);
    if (email.trim() === '') {
      newErrors.emailErr = 'Email is require';
    } else if (!isEmailValid) {
      newErrors.emailErr = 'Email is not valid';
    }

    return newErrors;
  };

  const checkSingupUser = async (): Promise<IregisteredUser> => {
    const response = await fetch(`http://localhost:3000/credentials?email=${email}`);
    if (!response.ok) {
      throw new Error();
    }
    const [registeredUser] = await response.json();
    return registeredUser;
  };

  const registerSignupCredential = async (event: any) => {
    event.preventDefault();
    const validationError = signupUserValidation();
    const isErrorPresent = Object.values(validationError).some((errValue) => errValue);
    if (isErrorPresent) {
      setErrors(validationError);
      return;
    }
    setErrors(validationError);
    dispatch(userAction.showLoading());
    try {
      const existingSignup: IregisteredUser = await checkSingupUser();
      if (existingSignup) {
        dispatch(userAction.closeLoading());
        errToaster('User already exist');
        return;
      }
      const signedUpUser: IregisteredUser = await doSignup(signupUser);
      dispatch(userAction.closeLoading());
      dispatch(setCredential(signedUpUser));
      localStorage.setItem('userId', signedUpUser.id);
      navigate('/home');
    } catch {
      dispatch(userAction.closeLoading());
      errToaster('Something went wrong');
    }
  };
  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-sm w-full'>
        <UserIcon />
        <ToastContainer />
        <h2 className='text-2xl font-semibold text-center mb-4'>Create a new account</h2>
        <p className='text-gray-600 text-center mb-6'>Enter your details to register.</p>
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
          <div className='mb-4'>
            <FormField
              fillData={fillData}
              idName='email'
              labelName='Email Address *'
              inputType='text'
              inputValue={email}
              errorName={errors.emailErr}
            />
          </div>
          <div className='mb-4'>
            <FormField
              fillData={fillData}
              idName='password'
              labelName='Password *'
              inputType='password'
              inputValue={password}
              errorName={errors.passwordErr}
            />
          </div>
          <Button btnName='Register' btnType='success' styles='w-full' onClick={registerSignupCredential} />
          <p className='mt-3 text-center'>
            Already have a account?{' '}
            <Link to='/login' className='text-md text-blue-700'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
