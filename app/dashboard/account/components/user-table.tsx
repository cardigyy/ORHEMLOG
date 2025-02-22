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

import { DeleteIcon, EditIcon } from "@/components/icons";

interface Props {
  items: {
    key: string;
    name: string;
    division: string;
    status: boolean;
  }[];
  onPageChange: (page: number) => void;
  page: {
    total: number;
    current: number;
  };
  openDeleteModal: () => void;
}

export default function UserTable({
  items,
  onPageChange,
  page,
  openDeleteModal,
}: Props) {
  return (
    <Table
      isVirtualized
      aria-label="Example of virtualized table with a large dataset"
      maxTableHeight={600}
      rowHeight={60}
      bottomContent={
        <div className="flex w-full justify-center absolute bottom-4 left-0">
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
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="division">Division</TableColumn>
        <TableColumn key="status">Status</TableColumn>
        <TableColumn key="action" className="w-40" align="center">
          Action
        </TableColumn>
      </TableHeader>
      <TableBody items={items} emptyContent={"No data"}>
        {(row) => (
          <TableRow key={row.key}>
            <TableCell className="font-semibold">{row.name}</TableCell>
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
              <Button isIconOnly color="primary" title="Edit">
                <EditIcon className="size-5" />
              </Button>
              <Button
                isIconOnly
                color="danger"
                title="Delete"
                onPress={openDeleteModal}
              >
                <DeleteIcon className="size-5" />
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
