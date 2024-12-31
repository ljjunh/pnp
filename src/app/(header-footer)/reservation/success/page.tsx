'use client';

import { Suspense } from 'react';
import Success from './_components';

export default function SuccessPage() {
  return (
    <Suspense>
      <Success />
    </Suspense>
  );
}
