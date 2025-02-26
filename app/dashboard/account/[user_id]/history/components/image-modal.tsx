import { Image } from "@heroui/image";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
interface Props {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModel({ url, isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        <ModalHeader />
        <ModalBody className="flex items-center justify-center">
          <Image src={url} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
