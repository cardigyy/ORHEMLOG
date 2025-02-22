import { Button } from "@heroui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <h1 className="text-4xl font-semibold text-[#403956]">
        404 - Page Not Found
      </h1>
      <Button color="primary">
        <Link href="/" className="text-white">
          Go Back
        </Link>
      </Button>
    </div>
  );
}
