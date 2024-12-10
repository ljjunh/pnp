'use server';

import { signIn } from 'next-auth/react';

export async function authenticate(formData: FormData) {
  await signIn('credentials', {
    email: formData.get('email'),
    password: formData.get('password'),
    redirect: false,
  });
}
