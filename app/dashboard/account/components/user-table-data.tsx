"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { useMemo, useState } from "react";

import AddNewUserModal from "./add-new-user";
import UserTable from "./user-table";

import { SearchIcon } from "@/components/icons";

interface Props {
  users: {
    key: string;
    name: string;
    division: string;
    status: boolean;
  }[];
}

export default function UserTableData({ users }: Props) {
  const { isOpen: deleteOpen, onOpenChange: deleteOpenChange } =
    useDisclosure();
  const { isOpen: addOpen, onOpenChange: addOpenChange } = useDisclosure();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 8;

  const filteredData = useMemo(() => {
    return users.filter((row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, users]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredData.slice(start, end);
  }, [page, filteredData]);

  return (
    <>
      <div className="flex flex-col pt-2">
        <div className="flex justify-between items-center">
          <Input
            placeholder="Search by name..."
            className="w-full md:w-96"
            size="lg"
            variant="flat"
            color="default"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            startContent={<SearchIcon className="mr-1" />}
          />

          <Button color="primary" onPress={addOpenChange}>
            Add New User
          </Button>
        </div>

        <div className="mt-4">
          <UserTable
            items={items}
            page={{
              current: page,
              total: pages,
            }}
            onPageChange={(page) => setPage(page)}
            openDeleteModal={deleteOpenChange}
          />
        </div>
      </div>

      <Modal isOpen={deleteOpen} onClose={deleteOpenChange}>
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader>
                  Are you sure you want to delete this user?
                </ModalHeader>
                <ModalBody>
                  <div className="flex justify-end gap-4">
                    <Button color="default" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="danger" onPress={onClose}>
                      Delete
                    </Button>
                  </div>
                </ModalBody>
              </>
            );
          }}
        </ModalContent>
      </Modal>

      <AddNewUserModal isOpen={addOpen} onClose={addOpenChange} />
    </>
  );
}
