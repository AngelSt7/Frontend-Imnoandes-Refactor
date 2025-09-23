import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { useGenericModal } from "./hooks";

type GenericModalProps<T> = {
  id?: string;
  user?:T;
  defaultValues?: any;
  closeModal?: () => void
};

export function GenericModal<T>({ user, id, defaultValues, closeModal }: GenericModalProps<T>) {
  const {
    showModal,
    getTitle,
    renderForm
  } = useGenericModal({ user, defaultValues, id });

  if (!showModal) return null;

  const tittle = getTitle();

  return (
    <Modal
      placement="center"
      scrollBehavior="inside"
      size={"4xl"}
      backdrop="opaque"
      isOpen={showModal}
      onClose={closeModal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-base sm:text-2xl text-center">
              {tittle.includes('_') ? tittle.replace('_', ' de ') : tittle}
            </ModalHeader>
            <ModalBody>
              {renderForm()}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
