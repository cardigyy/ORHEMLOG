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
import { useEffect, useState } from "react";

import { User } from "@/config/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export default function EditUserModal(props: Props) {
  const [data, setData] = useState({
    name: "",
    division: "",
    email: "",
    password: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setData({
      ...props.user,
      password: "",
    });

    props.onClose();
  };

  useEffect(() => {
    setData({
      ...props.user,
      password: "",
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
                  isRequired
                />
                <Input
                  variant="faded"
                  label="Division"
                  name="division"
                  value={data.division}
                  onChange={(e) =>
                    setData({ ...data, division: e.target.value })
                  }
                  isRequired
                />
                <Input label="Email" type="email" value={data.email} disabled />
                <Input
                  variant="faded"
                  label="Password"
                  type="password"
                  name="password"
                  minLength={8}
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </ModalBody>

              <ModalFooter>
                <Button onPress={onClose} color="danger" variant="flat">
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Form>
    </Modal>
  );
}
