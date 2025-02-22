import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import { SearchIcon } from "@/components/icons";
import { fontRoboto } from "@/config/fonts";

export default function Loading() {
  return (
    <div className={`pt-6 flex flex-col ${fontRoboto.className}`}>
      <p className="text-xl font-semibold">Account Management</p>

      <div className="flex justify-between items-center pt-2">
        <Input
          placeholder="Search by name..."
          className="w-full md:w-96"
          size="lg"
          variant="flat"
          color="default"
          startContent={<SearchIcon className="mr-1" />}
          readOnly
        />

        <Button
          color="primary"
          disabled
          className="disabled:cursor-not-allowed"
        >
          Add New User
        </Button>
      </div>
      {/* <div className="w-56 h-7 bg-gray-300 rounded-full" />

      <div className="flex flex-col pt-2">
        <div className="flex justify-between items-center">
          <div className="w-full h-10 bg-gray-300  rounded-full md:w-96" />

          <div className="w-40 h-10 bg-gray-300 rounded-full" />
        </div>
      </div> */}

      <div className="mt-4">
        <div className="w-full h-[600px] bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
}
