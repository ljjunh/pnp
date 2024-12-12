import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import * as z from 'zod';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일은 필수입니다' })
    .max(255, { message: '이메일이 너무 깁니다' })
    .trim()
    .toLowerCase()
    .email({ message: '올바른 이메일 형식이 아닙니다' })
    .refine((email) => !email.includes('..'), {
      message: '올바르지 않은 이메일 형식입니다',
    }),
});

export const useEmailLogin = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      schema.parse({ email });
      setIsSubmitting(true);

      await signIn('resend', {
        email,
        callbackUrl: '/',
        redirect: false,
      });

      setSuccessMessage('이메일이 전송되었습니다');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        console.error('Login error:', error);
        if (error instanceof Error) {
          if (error.message.includes('rate-limit')) {
            setError('너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.');
          } else {
            setError('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
          }
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    error,
    successMessage,
    isSubmitting,
    handleEmailChange,
    handleSubmit,
  };
};
