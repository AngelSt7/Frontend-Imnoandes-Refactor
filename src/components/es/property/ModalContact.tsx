'use client'

import { useAppStore } from "@/src/store/useAppStore";
import { Modal, ModalContent, ModalFooter, Button } from "@heroui/react";
import FormContact from "./FormContact";

export default function ModalContact({ phone, address, ownerEmail }: any) {
  const modalContact = useAppStore(state => state.modalContact)
  const changeStatusModal = useAppStore(state => state.changeStatusModal)
  if(!modalContact) return null
  return (
    <>
      <Modal isOpen={modalContact}  onOpenChange={() => changeStatusModal()}>
        <ModalContent>
          {(onClose) => (
            <>
              <FormContact address={address} phone={phone} ownerEmail={ownerEmail} />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
