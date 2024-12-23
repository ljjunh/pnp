import { useFormState } from 'react-dom';
import { FormState } from '@/types/login';
import { handleEmailLogin } from '@/app/(header-footer)/signin/action';

const initialState: FormState = {
  success: false,
  errors: {
    email: [],
    server: [],
  },
  email: '',
};

export const useEmailLoginForm = () => {
  const [state, dispatch] = useFormState(handleEmailLogin, initialState);
  
  return {
    dispatch,
    email: state.email,
    success: state.success,
    errors: state.errors,
  };
};