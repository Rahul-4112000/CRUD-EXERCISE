import { toast } from 'react-toastify';

export const errToaster = (msg: string) => {
  toast.error(msg, {
    position: 'top-right',
    theme: 'dark',
  });
};

export const successToaster = (msg: string) => {
  toast.success(msg, {
    position: 'top-right',
    theme: 'dark',
  });
};
