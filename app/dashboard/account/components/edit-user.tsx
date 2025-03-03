import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
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
import { useEffect, useState } from "react";

import { IUser } from "@/config/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
  authUid: string;
}

export default function EditUserModal(props: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    division: "",
    email: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/user/${props.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setTimeout(() => {
          addToast({
            title: "SUCCESS",
            description: "User updated successfully",
            color: "success",
          });
        }, 500);
        router.refresh();
      } else {
        const { data } = await response.json();
        throw new Error(data.message);
      }
    } catch (error: any) {
      addToast({
        title: "ERROR",
        description: error.toString(),
        color: "danger",
      });
    } finally {
      setLoading(false);
      props.onClose();
    }
  };

  useEffect(() => {
    setData({
      ...props.user,
    });
  }, [props.user]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} backdrop="blur">
      <Form validationBehavior="native" onSubmit={onSubmit}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit {props.user.name}</ModalHeader>
              <ModalBody>
                <Input
                  variant="faded"
                  label="Name"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  disabled={loading}
                  isRequired
                />
                <Input
                  variant={props.authUid === props.user.id ? "flat" : "faded"}
                  label="Division"
                  name="division"
                  value={data.division}
                  onChange={(e) =>
                    setData({ ...data, division: e.target.value })
                  }
                  isRequired
                  disabled={props.authUid === props.user.id || loading}
                />
                <Input label="Email" type="email" value={data.email} disabled />
                {/* <Select
                  variant={props.authUid === props.user.id ? "flat" : "faded"}
                  label="Status"
                  selectedKeys={[data.status.toString()]}
                  onChange={(e) =>
                    setData({ ...data, status: parseInt(e.target.value) })
                  }
                  isRequired
                  isDisabled={props.authUid === props.user.id || loading}
                >
                  <SelectItem key={"0"}>Inactive</SelectItem>
                  <SelectItem key={"1"}>Active</SelectItem>
                </Select> */}
                {/* <Input
                  variant="faded"
                  label="Password"
                  type="password"
                  name="password"
                  minLength={8}
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  disabled={loading}
                /> */}
              </ModalBody>

              <ModalFooter>
                <Button
                  onPress={onClose}
                  color="danger"
                  variant="flat"
                  isDisabled={loading}
                >
                  Cancel
                </Button>
                <Button color="primary" type="submit" isDisabled={loading}>
                  {loading ? <Spinner color="default" size="sm" /> : "Update"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Form>
    </Modal>
  );
}
