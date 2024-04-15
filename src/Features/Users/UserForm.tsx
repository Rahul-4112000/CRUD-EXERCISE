import { useState, useEffect } from 'react';
import Button from '../../Shared/Utility/Button';
import FormField from '../../Shared/Utility/FormField';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UpdateUserFromList, saveUser } from './Store/user-actions';
import { userAction } from './Store/user-slice';
import { ToastContainer, toast } from 'react-toastify';
import { errToaster } from '../../Shared/UI/Toaster';
import { useAppDispatch, useAppSelector } from '../../Shared/Hooks/hooks';
import { Iuser, IuserErr } from './user_interface';

const initialErr = {
  nameErr: '',
  emailErr: '',
  ageErr: '',
  mobNumErr: '',
};

const UserForm = () => {
  const { selUser, selUserIndex, users } = useAppSelector((state) => state.userData);

  const [userData, setUserData] = useState<Iuser>(selUser);
  const [errors, setErrors] = useState<IuserErr>(initialErr);
  const { name, email, age, mobNum, id } = userData;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    // selUser.id is used to prevent execution when entering directly to /new path after edit mode
    if (selUserIndex >= 0 && selUser.id) {
      setUserData(selUser);
      navigate('/user/' + selUser.id);
    }
  }, [selUserIndex]);

  useEffect(() => {
    // here id prevent initial execution
    if (userId && users.length && id === '') {
      let index = users.findIndex((user) => user.id === userId);
      let selUser = users[index];
      dispatch(userAction.setSelUser({ selUser, index }));
    }
  }, [users]);

  const fillData = (event: any) => {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        [event.target.id]: event.target.value,
      };
    });
  };

  const userDataValidation = (): IuserErr => {
    let regex = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const newErrors = { ...initialErr };

    // Validate name
    if (name.trim() === '') {
      newErrors.nameErr = 'Name is require';
    } else if (!isNaN(parseFloat(name.trim()))) {
      newErrors.nameErr = 'Name Should not be number';
    }
    // validate email
    let isEmailValid = regex.test(email);
    if (email.trim() === '') {
      newErrors.emailErr = 'Email is require';
    } else if (!isEmailValid) {
      newErrors.emailErr = 'Email is not valid';
    }
    // validate Age
    const ageInNumber = parseFloat(age);
    if (age === '' || isNaN(ageInNumber)) {
      newErrors.ageErr = 'Age is require';
    } else if (ageInNumber < 1 || ageInNumber > 150) {
      newErrors.ageErr = 'Age is not valid';
    }
    //validate mobile number
    const mobInNumber = parseFloat(mobNum);
    if (mobNum === '' || isNaN(mobInNumber)) {
      newErrors.mobNumErr = 'Mobile number is require';
    } else if (mobInNumber < 0) {
      newErrors.mobNumErr = "Mobile Number can't be negative";
    } else if (mobNum.length !== 10) {
      newErrors.mobNumErr = 'Mobile Number should have 10 digits';
    }

    return newErrors;
  };

  const submitUserData = (event: any) => {
    event.preventDefault();
    const validationError = userDataValidation();
    const isErrorPresent = Object.values(validationError).some((errValue) => errValue);
    if (isErrorPresent) {
      setErrors(validationError);
      return;
    }
    setErrors(validationError);

    const isUserExist = users.some((user) => {
      return (user.email === email || user.mobNum === mobNum) && !id;
    });
    if (isUserExist) {
      errToaster('User already exist');
      return;
    }
    onSaveUser(userData);
  };

  const saveNewUser = (aNewUser: Iuser) => {
    const user: any = { ...aNewUser };
    delete user.id;
    dispatch(saveUser(user));
  };

  const updateUser = (aUser: Iuser) => {
    dispatch(UpdateUserFromList(aUser));
  };

  const onSaveUser = (aUserData: Iuser) => {
    if (aUserData.id) {
      updateUser(aUserData);
    } else {
      saveNewUser(aUserData);
    }
    navigate('/user');
  };

  const closeForm = () => {
    dispatch(userAction.resetSelUser());
  };

  const setNextUser = () => {
    dispatch(userAction.setNextUser());
  };

  const setPrevUser = () => {
    dispatch(userAction.setPrevUser());
  };

  return (
    <div className='flex items-center max-w-[700px] m-auto rounded-xl'>
      <ToastContainer />
      {userId !== 'new' && (
        <Button
          btnName='PREVIOUS'
          btnType='dark'
          styles='disabled:opacity-25'
          disabled={!selUserIndex}
          onClick={setPrevUser}
        />
      )}
      <form className='w-[400px] bg-white mx-auto p-8 shadow-2xl mt-10'>
        <div className='mb-5'>
          <FormField
            fillData={fillData}
            idName='name'
            labelName='Name'
            inputType='text'
            inputValue={name}
            errorName={errors.nameErr}
          />
        </div>
        <div className='mb-5'>
          <FormField
            fillData={fillData}
            idName='email'
            labelName='Your email'
            inputType='text'
            inputValue={email}
            errorName={errors.emailErr}
          />
        </div>
        <div id='age-mob-container' className='flex gap-6 mb-5'>
          <div className='basis-4/12'>
            <FormField
              fillData={fillData}
              idName='age'
              labelName='Age'
              inputType='number'
              inputValue={age}
              errorName={errors.ageErr}
            />
          </div>
          <div className='basis-8/12'>
            <FormField
              fillData={fillData}
              idName='mobNum'
              labelName='Mobile Number'
              inputType='number'
              inputValue={mobNum}
              errorName={errors.mobNumErr}
            />
          </div>
        </div>
        <Link to='..'>
          <Button btnType='cancel' btnName='Cancel' type='button' onClick={closeForm}></Button>
        </Link>
        <Button btnType='success' btnName='Save' onClick={submitUserData}>
          Save
        </Button>
      </form>
      {userId !== 'new' && (
        <Button
          btnName='NEXT'
          btnType='dark'
          styles='disabled:opacity-25'
          disabled={selUserIndex === users.length - 1}
          onClick={setNextUser}
        />
      )}
    </div>
  );
};

export default UserForm;
