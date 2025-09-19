'use client'

import { useAppStore } from "@/src/store/useAppStore";
import { Modal, ModalContent, ModalFooter, Button } from "@heroui/react";
import FormContact from "./FormContact";

export default function ModalContact({ phone, direction }: any) {
  const modalContact = useAppStore(state => state.modalContact)

  if(!modalContact) return null

  const changeStatusModal = useAppStore(state => state.changeStatusModal)
  return (
    <>
      <Modal isOpen={modalContact}  onOpenChange={() => changeStatusModal()}>
        <ModalContent>
          {(onClose) => (
            <>
              <FormContact direction={direction} phone={phone} />
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => changeStatusModal()}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
