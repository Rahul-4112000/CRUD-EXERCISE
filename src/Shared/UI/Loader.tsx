import { RotateLoader } from 'react-spinners';
import { useAppSelector } from '../Hooks/hooks';

const Loader = () => {
  const loading = useAppSelector((state) => state.userData.loading);
  if (!loading) {
    return null;
  }
  return (
    <div className='flex justify-center pt-3 absolute top-[40%] left-[50%] z-20'>
      <RotateLoader color='#3ab49c' margin={24} size={15} />
    </div>
  );
};

export default Loader;
