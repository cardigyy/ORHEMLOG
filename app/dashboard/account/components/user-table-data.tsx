"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useDisclosure } from "@heroui/modal";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import DeleteUserModal from "./delete-user";
import EditUserModal from "./edit-user";
import UserTable from "./user-table";

import { SearchIcon } from "@/components/icons";
import { IUser } from "@/config/types";
import { useAuth } from "@/lib/auth-context";

const AddModal = dynamic(() => import("./add-new-user"), {
  loading: () => <p>Loading...</p>,
});

interface Props {
  users: IUser[];
}

export default function UserTableData({ users }: Props) {
  const { user } = useAuth();
  const { isOpen: deleteOpen, onOpenChange: deleteOpenChange } =
    useDisclosure();
  const { isOpen: addOpen, onOpenChange: addOpenChange } = useDisclosure();
  const { isOpen: editOpen, onOpenChange: editOpenChange } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 8;
  console.log(users);

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
        <div className="flex items-center justify-between">
          <Input
            placeholder="Search by name..."
            className="w-48 sm:w-96"
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
            openDeleteModal={(user) => {
              setSelectedUser(user);
              deleteOpenChange();
            }}
            onEdit={(user) => {
              setSelectedUser(user);
              editOpenChange();
            }}
            userUid={user ? user.uid : ""}
          />
        </div>
      </div>

      <AddModal isOpen={addOpen} onClose={addOpenChange} />

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          isOpen={editOpen}
          onClose={editOpenChange}
          authUid={user ? user.uid : ""}
        />
      )}
      {selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          isOpen={deleteOpen}
          onClose={deleteOpenChange}
        />
      )}
    </>
  );
}
