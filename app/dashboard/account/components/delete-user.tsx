import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { IUser } from "@/config/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
}

export default function DeleteUserModal(props: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user/${props.user.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      } else {
        router.refresh();
        addToast({
          title: "SUCCESS",
          description: "User deleted successfully",
          color: "success",
        });
      }
    } catch (_) {
      addToast({
        title: "ERROR",
        description: "Failed to delete user",
        color: "danger",
      });
    } finally {
      setLoading(false);
      props.onClose();
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      backdrop="blur"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Delete User Confirm</ModalHeader>
            <ModalBody>
              Are you sure you want to delete {props.user.name}?
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={onClose}
                variant="flat"
                color="default"
                isDisabled={loading}
              >
                Cancel
              </Button>
              <Button onPress={onDelete} color="danger" isDisabled={loading}>
                {loading ? <Spinner color="default" size="sm" /> : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
