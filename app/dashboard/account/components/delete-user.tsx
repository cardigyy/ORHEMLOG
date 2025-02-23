import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";

import { User } from "@/config/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export default function DeleteUserModal(props: Props) {
  const onDelete = () => {
    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Delete User Confirm</ModalHeader>
            <ModalBody>
              Are you sure you want to delete {props.user.name}?
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} variant="flat" color="default">
                Cancel
              </Button>
              <Button onPress={onDelete} color="danger">
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
