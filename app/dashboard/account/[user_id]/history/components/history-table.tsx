"use client";

import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { useDisclosure } from "@heroui/modal";
import { Pagination } from "@heroui/pagination";
import { EyeIcon } from "@heroui/shared-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { useMemo, useState } from "react";
import Moment from "react-moment";

import ImageModal from "./image-modal";

import { DeleteIcon, SearchIcon } from "@/components/icons";
import { DetectionHistory } from "@/config/types";

interface Props {
  // user: IUser;
  histories: DetectionHistory[];
}

let index = 0;

export default function HistoryTable({ histories }: Props) {
  const { isOpen, onOpenChange } = useDisclosure();
  const [selectedRow, setSelectedRow] = useState<DetectionHistory | null>(null);

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 8;

  const filteredData = useMemo(() => {
    return histories.filter((row) =>
      row.part_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, histories]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredData.slice(start, end);
  }, [page, filteredData]);

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <Input
          placeholder="Search by part name..."
          className="w-full sm:w-96"
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
      </div>

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
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="no">No</TableColumn>
          <TableColumn key="datetime">Date and Time</TableColumn>
          <TableColumn key="part_name">Part Name</TableColumn>
          <TableColumn key="part_number">Part Number</TableColumn>
          <TableColumn key="status">Status</TableColumn>
          <TableColumn key="result">Result</TableColumn>
          <TableColumn key="action">Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No histories found."} items={items}>
          {(row) => (
            <TableRow key={row.id}>
              <TableCell>{index++}</TableCell>
              <TableCell>
                <Moment format="YYYY-MM-DD HH:mm:ss">{row.createdAt!}</Moment>
              </TableCell>
              <TableCell>{row.part_name}</TableCell>
              <TableCell>{row.part_number}</TableCell>
              <TableCell>
                <Chip color={row.status ? "success" : "danger"}>
                  {row.status ? "Detected" : "Unknown"}
                </Chip>
              </TableCell>
              <TableCell>
                {/* <Link href={row.image} target="_blank"> */}
                <Button
                  isIconOnly
                  color="primary"
                  title="History"
                  isDisabled={!row.status}
                  className="disabled:cursor-not-allowed"
                  onPress={() => {
                    onOpenChange();
                    setSelectedRow(row);
                  }}
                >
                  <EyeIcon className="size-5" />
                </Button>
                {/* </Link> */}
              </TableCell>
              <TableCell>
                <Button
                  isIconOnly
                  color="danger"
                  // onPress={() => openDeleteModal(row)}
                >
                  <DeleteIcon className="size-5" />
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isOpen && selectedRow && (
        <ImageModal
          isOpen={isOpen}
          onClose={() => {
            onOpenChange();
            setSelectedRow(null);
          }}
          url={selectedRow.image}
        />
      )}
    </div>
  );
}
