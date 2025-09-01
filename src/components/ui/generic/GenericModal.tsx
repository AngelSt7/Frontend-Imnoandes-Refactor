import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { useGenericModal } from "@/src/hooks/modal/useGenericModal";
import { User } from "@/src/types/userTypes/user";

type GenericModalProps = {
  id?: string;
  user?: User;
  defaultValues?: any;
  closeModal?: () => void
};

export default function GenericModal({ user, id, defaultValues, closeModal }: GenericModalProps) {
  const {
    showModal,
    getTitle,
    isCustomImage,
    renderForm
  } = useGenericModal({ user, defaultValues, id });

  if (!showModal) return null;

  const tittle = getTitle();

  return (
    <Modal
      placement="center"
      scrollBehavior="inside"
      size={"4xl"}
      isDismissable={isCustomImage ? false : true}
      isKeyboardDismissDisabled={isCustomImage ? true : false}
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
