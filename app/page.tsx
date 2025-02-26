"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { FirebaseError } from "firebase/app";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import BackgroundImage from "./image2.jpg";

import { fontBlackOpsOne, fontRoboto } from "@/config/fonts";
import { useAuth } from "@/lib/auth-context";

export default function Page() {
  const router = useRouter();
  const { loading, user, signIn } = useAuth();
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      setSubmitLoading(true);
      router.push("/dashboard/account");
    }
  }, [user, loading]);

  const [data, setData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      await signIn(data.email, data.password);
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/invalid-credential"
      ) {
        alert("Invalid email or password");
      } else {
        alert((error as Error).message);
      }
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
        <Card className="w-full p-4" shadow="md">
          <CardHeader className="flex justify-center">
            <h1 className="text-2xl font-semibold">Login</h1>
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
                onChange={(e) => setData({ ...data, email: e.target.value })}
                isRequired
              />
              <Input
                variant="faded"
                label="Password"
                type="password"
                name="password"
                minLength={8}
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                isRequired
              />
              <Button
                color="primary"
                type="submit"
                isDisabled={submitLoading}
                isLoading={submitLoading}
              >
                Login
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
