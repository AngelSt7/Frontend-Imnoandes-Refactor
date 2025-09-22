'use client'
import GenericModal from '@/src/components/ui/generic/GenericModal';
import { useModalUtils } from '@/src/myLib/hooks/modal/useModalUtils/useModalUtils';

export default function PruebaButton() {
    const { closeModal } = useModalUtils();
    return (
        <GenericModal closeModal={closeModal}  />
    )
}
