import InformationIcon from '@/components/icons/InformationIcon';

export interface ModalInformationProps {
  text: string;
}

const ModalInformation = ({ text }: ModalInformationProps) => (
  <div
    data-cy="modal-information"
    className="mt-48 flex w-full max-w-lg items-center gap-3 rounded-xl bg-white px-7 py-4 text-sm shadow-md"
  >
    <InformationIcon data-cy="modal-information-icon" />
    <p data-cy="modal-information-title">{text}</p>
  </div>
);

export default ModalInformation;
