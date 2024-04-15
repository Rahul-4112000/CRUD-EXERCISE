import { Provider } from 'react-redux';
import store from './Store/store';
import LogIn from './Features/Login/LogIn';
import SignUp from './Features/Signup/SignUp';
import Home from './Features/Home/Home';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserList from './Features/Users/UserList';
import UserForm from './Features/Users/UserForm';
import RootLayout from './Features/Users/RootLayout';
import { checkLoggedInUser, checkLogoutUser } from './Features/Login/Token';
import Loader from './Shared/UI/Loader';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to='/login' /> },
  { path: '/login', element: <LogIn />, loader: checkLoggedInUser },
  { path: '/signup', element: <SignUp />, loader: checkLoggedInUser },
  {
    path: '/home',
    element: <RootLayout />,
    loader: checkLogoutUser,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: '/user',
    element: <RootLayout />,
    loader: checkLogoutUser,
    children: [
      { index: true, element: <UserList /> },
      { path: ':userId', element: <UserForm /> },
    ],
  },
  { path: '*', element: localStorage.getItem('userId') ? <Navigate to='/home' /> : <Navigate to='/login' /> },
]);

const App = () => {
  return (
    <Provider store={store}>
      <Loader />
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
