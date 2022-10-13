import ReactDOM from 'react-dom';

export interface BaseModalProps {
  children?: React.ReactNode;
  show: boolean;
  onClose: () => void;
}

const Base = ({ show, children }: BaseModalProps) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex flex-col items-center bg-black/30">
      {children}
    </div>,
    document.getElementById('root') as HTMLElement,
  );
};

export default Base;
