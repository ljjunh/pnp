'use client';

import { useState } from 'react';
import DescriptionInput from './components/DescriptionInput';
import DescriptionTagSelect from './components/DescriptionTagSelect';

enum DESCRIPTION_STEP {
  'SELECT',
  'INPUT',
}

export default function Description() {
  const [step, setStep] = useState<DESCRIPTION_STEP>(DESCRIPTION_STEP.SELECT);

  return (
    <div className="flex h-full w-full flex-col items-start justify-center px-80">
      {step === DESCRIPTION_STEP.SELECT && <DescriptionTagSelect />}
      {step === DESCRIPTION_STEP.INPUT && <DescriptionInput />}
    </div>
  );
}
