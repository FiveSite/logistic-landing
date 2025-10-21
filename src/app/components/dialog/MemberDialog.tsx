'use client';
import Modal from '@mui/material/Modal';
import { useCallback, useMemo, useState } from 'react';
import { MemberSignUpContext, MemberSignUpContextType } from '../form/formStepper/MemberSignUpContext';
import { FormStepper } from '../form/formStepper/FormStepper';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  onChange: () => void;
  onSuccess: () => void;
}

const articles = ['Company details', 'Key contacts', 'Business profile', 'Scale & References'];

export const MemberDialog = ({ isOpen, handleClose, onChange, onSuccess }: ModalProps) => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStepHandler = useCallback((step: number) => {
    setActiveStep(step);
  }, []);

  const memberSignUpContextValue: MemberSignUpContextType = useMemo(() => {
    return {
      nextStepHandler,
      activeStep,
    };
  }, [nextStepHandler, activeStep]);

  return (
    <div>
      <Modal open={isOpen} onClose={handleClose} className='flex items-center justify-center'>
        <MemberSignUpContext.Provider value={memberSignUpContextValue}>
          <div className='bg-white rounded-lg flex max-w-[1044px] w-full overflow-hidden '>
            {/* sidebar */}
            <div className='bg-[#0F0F13] text-white p-10 w-[340px] max-lg:hidden'>
              <h2 className='text-xl font-semibold mb-8'>{`Step ${activeStep + 1}`}</h2>
              <div className='flex flex-col gap-6'>
                {articles.map((step, idx) => (
                  <div key={idx} className='flex items-center gap-3'>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        idx <= activeStep ? 'border-orange-500 bg-transparent' : 'border-gray-400'
                      }`}
                    >
                      {idx <= activeStep && <div className='w-2 h-2 bg-orange-600 rounded-full'></div>}
                    </div>
                    <span className={`text-sm ${idx <= activeStep ? 'text-white font-medium' : 'text-gray-300'}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* form */}
            <div className='flex-1 p-10 max-sm:p-4'>
              <h2 className='text-[30px] font-bold text-orange-600 mb-2'>{articles[activeStep]}</h2>
              <p className='text-[16px] mb-10 max-sm:mb-6'>Provide general details about your company</p>

              <FormStepper handleClose={handleClose} onChange={onChange} onSuccess={onSuccess} />
            </div>
          </div>
        </MemberSignUpContext.Provider>
      </Modal>
    </div>
  );
};
