import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { useGenericModal } from "@/src/hooks/modal/useGenericModal";
import { User } from "@/src/types/userTypes/user";
import { useModalUtils } from "@/src/hooks/modal/useModalUtils";

type GenericModalProps = {
  user?: User;
  id?: string;
  defaultValues?: any;
};

export default function GenericModal({ user, id, defaultValues }: GenericModalProps) {
  const { closeModal } = useModalUtils();
  const {
    showModal,
    getTitle,
    isCustomImage,
    renderForm
  } = useGenericModal({ user, defaultValues, id, closeModal });

  if (!showModal) return null;

  const tittle = getTitle();

  return (
    <Modal
      placement="center"
      scrollBehavior="inside"
      className=""
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
