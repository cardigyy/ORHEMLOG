import { fontRoboto } from "@/config/fonts";

export default function Loading() {
  return (
    <div className={`flex flex-col pt-6 ${fontRoboto.className} animate-pulse`}>
      <div className="h-8 w-20 rounded-xl bg-gray-300" />

      <div className="flex flex-col gap-2 pt-2">
        <div className="h-8 w-48 rounded-full bg-gray-300 md:w-48" />
        <div className="h-8 w-16 rounded-full bg-gray-300" />
      </div>

      <div className="mt-4 h-10 w-96 rounded-lg bg-gray-300" />

      <div className="mt-4">
        <div className="h-[600px] w-full rounded-3xl bg-gray-300" />
      </div>

      <footer className="mt-8 pb-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}
