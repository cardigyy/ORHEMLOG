"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import BackgroundImage from "../image2.jpg";

import { LeftArrowIcon } from "@/components/icons";
import { fontBlackOpsOne, fontRoboto } from "@/config/fonts";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const { loading, user } = useAuth();
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      setSubmitLoading(true);
      router.push("/dashboard/account");
    }
  }, [user, loading]);

  const [data, setData] = useState({ email: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      } else {
        addToast({
          title: "SUCCESS",
          description: "Reset password email has been sent",
          color: "success",
        });
        router.replace("/");
      }
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen flex-row">
      <div className="relative hidden flex-1 overflow-hidden lg:block">
        <Image
          src={BackgroundImage}
          alt="Hero"
          fill
          quality={50}
          className="absolute z-0 object-fill brightness-[.25]"
          priority
        />

        {/* Wrapper untuk teks agar full height & absolute */}
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center">
          <div className="flex flex-1 flex-col items-center justify-center pt-4 text-center">
            <h1
              className={`text-8xl font-semibold text-white ${fontBlackOpsOne.className}`}
            >
              ORHEMLOG
            </h1>
            <p className={`${fontRoboto.className} w-96 text-lg text-white`}>
              ORHEMLOG helps you connect and monitoring users activities in
              workshop and warehouse.
            </p>
          </div>
          <p className="pb-4 text-white">Copyright</p>
        </div>
      </div>
      <div className="z-10 flex w-full flex-col items-center justify-center bg-white p-8 lg:w-4/12">
        <div className="w-full items-start">
          <Button as={Link} href="/" variant="ghost" className="mb-4">
            <LeftArrowIcon className="size-5" />
            Back to Login
          </Button>
        </div>
        <Card className="w-full p-4" shadow="md">
          <CardHeader className="flex justify-center">
            <h1 className="text-2xl font-semibold">Reset Password</h1>
          </CardHeader>

          <CardBody>
            <Form
              className="flex flex-col gap-6"
              validationBehavior="native"
              onSubmit={handleSubmit}
            >
              <Input
                variant="faded"
                label="Email"
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData({ email: e.target.value })}
                isRequired
              />
              <Button
                color="primary"
                className="w-full"
                type="submit"
                isDisabled={submitLoading}
                isLoading={submitLoading}
              >
                Send Reset Password Email
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
