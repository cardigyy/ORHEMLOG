import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Pagination } from "@heroui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import Link from "next/link";
import { useState } from "react";

import ImageModal from "../../../components/image-modal";

import { DeleteIcon, EditIcon, HistoryIcon } from "@/components/icons";
import { IUser } from "@/config/types";

interface Props {
  items: IUser[];
  onPageChange: (page: number) => void;
  page: {
    total: number;
    current: number;
  };
  openDeleteModal: (user: IUser) => void;
  onEdit: (user: IUser) => void;
  userUid: string;
}

export default function UserTable({
  items,
  onPageChange,
  page,
  openDeleteModal,
  onEdit,
  userUid,
}: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      {selectedImage && (
        <ImageModal
          url={selectedImage}
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      <Table
        isVirtualized
        aria-label="Example of virtualized table with a large dataset"
        maxTableHeight={600}
        rowHeight={60}
        bottomContent={
          <div className="absolute bottom-4 left-0 flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page.current}
              total={page.total}
              onChange={onPageChange}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="name" className="w-96">
            Name
          </TableColumn>
          <TableColumn key="email">Email</TableColumn>
          <TableColumn key="division">Division</TableColumn>
          <TableColumn key="status">Status</TableColumn>
          <TableColumn key="action" className="w-40" align="center">
            Action
          </TableColumn>
        </TableHeader>
        <TableBody items={items} emptyContent={"No data"}>
          {(row) => (
            <TableRow key={row.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar
                    src={row.profile_picture}
                    size="sm"
                    radius="sm"
                    className="cursor-pointer"
                    onClick={() => setSelectedImage(row.profile_picture)}
                  />
                  <span className="font-semibold">{row.name}</span>
                </div>
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.division}</TableCell>
              <TableCell>
                <Chip
                  color={row.status ? "success" : "danger"}
                  variant="dot"
                  className="w-chip"
                >
                  {row.status ? "Active" : "Inactive"}
                </Chip>
              </TableCell>
              <TableCell className="flex items-center justify-center gap-1">
                <Button
                  color="primary"
                  isIconOnly
                  as={Link}
                  href={`/dashboard/account/${row.id}/history`}
                >
                  <HistoryIcon className="size-5" />
                </Button>
                <Button
                  isIconOnly
                  color="warning"
                  title="Edit"
                  onPress={() => onEdit(row)}
                >
                  <EditIcon className="size-5" />
                </Button>
                <Button
                  isIconOnly
                  color="danger"
                  title={
                    row.id === userUid ? "You can't delete yourself" : "Delete"
                  }
                  onPress={() => openDeleteModal(row)}
                  isDisabled={row.id === userUid}
                >
                  <DeleteIcon className="size-5" />
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
