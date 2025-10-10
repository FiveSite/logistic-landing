import Modal from '@mui/material/Modal';

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  children?: React.ReactNode;
  handleClose?: () => void;
}
export const ModalComponent = ({ title, description, isOpen, children, handleClose }: ModalProps) => {
  // For demonstration, modal is always open. You can add a prop to control this.
  return (
    <div>
      <Modal open={isOpen} onClose={handleClose}>
        <div className='bg-white p-10 rounded-lg mx-auto mt-20 outline-none max-w-[570px] w-full'>
          <div>
            <h2 className='text-[30px] leading-[30px] font-bold mb-4 text-center text-orange-600'>{title}</h2>
            <p className='text-center text-[16px]'>{description}</p>
          </div>
          {children}
        </div>
      </Modal>
    </div>
  );
};
