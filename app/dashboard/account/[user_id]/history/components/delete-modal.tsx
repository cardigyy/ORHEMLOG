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

import { DetectionHistory } from "@/config/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  history: DetectionHistory;
}

export default function DeleteHistoryModal({
  isOpen,
  onClose,
  history,
}: Props) {
  const [loading, setDeleteLoading] = useState<boolean>(false);
  const router = useRouter();

  const onDelete = async () => {
    setDeleteLoading(true);
    try {
      const result = await fetch(`/api/history?id=${history.id}dadaw`, {
        method: "DELETE",
      });

      if (result.ok) {
        router.refresh();
        addToast({
          title: "SUCCESS",
          description: "History deleted successfully",
          color: "success",
        });
      } else {
        const { data } = await result.json();
        throw new Error(data.message);
      }
    } catch (err: any) {
      addToast({
        title: "ERROR",
        description: err.toString(),
        color: "danger",
      });
    } finally {
      setDeleteLoading(false);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Delete User Confirm</ModalHeader>
            <ModalBody>Are you sure you want to delete this data?</ModalBody>
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
