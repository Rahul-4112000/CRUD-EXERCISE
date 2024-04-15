import Button from '../../Shared/Utility/Button';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DeleteModal from './DeleteModal';
import { userAction } from './Store/user-slice';
import { useAppDispatch, useAppSelector } from '../../Shared/Hooks/hooks';
import { Iuser } from './user_interface';

const UserList = () => {
  const { users, deleteUser } = useAppSelector((state) => state.userData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showPrefilledForm = (aSelUser: Iuser, aIndex: number) => {
    dispatch(userAction.setSelUser({ selUser: aSelUser, index: aIndex }));
    navigate(aSelUser.id);
  };

  const onDeleteUser = (aUser: Iuser) => {
    dispatch(userAction.setDelUser(aUser));
  };

  const showForm = () => {
    dispatch(userAction.resetSelUser());
  };

  const renderUsers = () => {
    return users.map((user, serialNo) => {
      const { name, age, email, mobNum } = user;
      return (
        <tr key={serialNo} className='p-4 text-white odd:bg-gray-900  even:bg-gray-800 border-gray-700 text-center'>
          <td className='py-3'>{serialNo + 1}</td>
          <td className='py-3'>{name}</td>
          <td className='py-3'>{age}</td>
          <td className='py-3'>{email}</td>
          <td className='py-3'>+91 {mobNum}</td>
          <td className='flex gap-4 justify-center py-2 text-green-500'>
            <button className='cursor-pointer' onClick={() => showPrefilledForm(user, serialNo)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                />
              </svg>
            </button>
            <button className='cursor-pointer' onClick={() => onDeleteUser(user)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                />
              </svg>
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className='flex flex-col items-center m-auto pt-12 px-3 md:px-12 relative overflow-x-auto sm:rounded-lg'>
      {deleteUser && <DeleteModal />}
      <ToastContainer />
      <Link to='new'>
        <Button btnType='dark' btnName='Add User' onClick={showForm}></Button>
      </Link>
      <table className=' text-gray-500 min-w-[550px] md:w-[768px] lg:w-[1000px]'>
        <thead className='uppercase bg-gray-700 dark:text-gray-400'>
          <tr>
            <th className='py-4'>SR.</th>
            <th className='py-4'>NAME</th>
            <th className='py-4'>AGE</th>
            <th className='py-4'>EMAIL</th>
            <th className='py-4'>MOB.</th>
            <th className='py-4'>ACTION</th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </div>
  );
};

export default UserList;
