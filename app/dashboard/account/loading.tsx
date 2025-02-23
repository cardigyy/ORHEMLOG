import { fontRoboto } from "@/config/fonts";

export default function Loading() {
  return (
    <div className={`flex flex-col pt-6 ${fontRoboto.className} animate-pulse`}>
      {/* <p className="text-xl font-semibold">Account Management</p>

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
      </div> */}
      <div className="h-7 w-56 rounded-full bg-gray-300" />

      <div className="flex flex-col pt-2">
        <div className="flex items-center justify-between">
          <div className="h-10 w-48 rounded-full bg-gray-300 md:w-96" />

          <div className="h-10 w-32 rounded-full bg-gray-300" />
        </div>
      </div>

      <div className="mt-4">
        <div className="h-[600px] w-full rounded-lg bg-gray-300" />
      </div>
    </div>
  );
}
