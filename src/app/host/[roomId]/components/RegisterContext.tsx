'use client';

import { ReactNode, createContext, useState } from 'react';

export interface RegisterContextType {
  isInnerStep: boolean;
  setIsInnerStep: (isInnerStep: boolean) => void;
  currentStep?: number;
  setCurrentStep: (currentStep: number | undefined) => void;
}

export const RegisterContext = createContext<RegisterContextType>({
  isInnerStep: false,
  currentStep: undefined,
  setIsInnerStep: () => {},
  setCurrentStep: () => {},
});

export default function RegisterContextProvider({ children }: { children: ReactNode }) {
  const [isInnerStep, setIsInnerStep] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>();

  return (
    <RegisterContext.Provider value={{ isInnerStep, setIsInnerStep, currentStep, setCurrentStep }}>
      {children}
    </RegisterContext.Provider>
  );
}
