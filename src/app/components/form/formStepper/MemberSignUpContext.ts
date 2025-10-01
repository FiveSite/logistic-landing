import { createContext } from 'react';

export type MemberSignUpContextType = {
  nextStepHandler: (step: number) => void;
  activeStep: number;
};

export const MemberSignUpContext = createContext({} as MemberSignUpContextType);
