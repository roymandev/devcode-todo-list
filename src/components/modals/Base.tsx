import ReactDOM from 'react-dom';

export interface BaseModalProps {
  children?: React.ReactNode;
  show: boolean;
  onClose: () => void;
}

const Base = ({ show, children, onClose }: BaseModalProps) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col items-center bg-black/30"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {children}
    </div>,
    document.getElementById('root') as HTMLElement,
  );
};

export default Base;
