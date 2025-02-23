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
import { Spinner } from "@heroui/spinner";
import { addToast } from "@heroui/toast";
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
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (result.ok) {
        addToast({
          title: "SUCCESS",
          description: "User added successfully",
          color: "success",
        });
      } else {
        throw new Error("Failed to add user");
      }
    } catch (error: any) {
      addToast({
        title: "ERROR",
        description: error.toString(),
        color: "danger",
      });
    } finally {
      setLoading(false);
      setData({
        name: "",
        email: "",
        password: "",
        division: "",
      });

      props.onClose();
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      backdrop="blur"
      isDismissable={false}
      hideCloseButton={true}
    >
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
                <Button
                  onPress={onClose}
                  color="danger"
                  variant="flat"
                  isDisabled={loading}
                >
                  Cancel
                </Button>
                <Button color="primary" type="submit" isDisabled={loading}>
                  {loading ? <Spinner color="default" size="sm" /> : "Add"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Form>
    </Modal>
  );
}
