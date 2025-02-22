"use client";

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
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddNewUserModal(props: Props) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    division: "",
    status: false,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setData({
      name: "",
      email: "",
      password: "",
      division: "",
      status: false,
    });

    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} backdrop="blur">
      <Form validationBehavior="native" onSubmit={onSubmit}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add New User</ModalHeader>
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
                <Input
                  variant="faded"
                  label="Email"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  isRequired
                />
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
                  isRequired
                />
              </ModalBody>

              <ModalFooter>
                <Button onPress={onClose} color="danger" variant="flat">
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Form>
    </Modal>
  );
}
