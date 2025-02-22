import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import Image from "next/image";

import BackgroundImage from "./image2.jpg";

import { fontBlackOpsOne, fontRoboto } from "@/config/fonts";

export default function Home() {
  return (
    <section className="flex flex-row min-h-screen">
      <div className="hidden lg:block flex-1 overflow-hidden relative">
        <Image
          src={BackgroundImage}
          alt="Hero"
          fill
          quality={50}
          className="brightness-[.25] absolute z-0 object-fill"
        />

        {/* Wrapper untuk teks agar full height & absolute */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-50">
          <div className="flex flex-col items-center justify-center text-center flex-1 pt-4">
            <h1
              className={`text-8xl font-semibold text-white ${fontBlackOpsOne.className}`}
            >
              ORHEMLOG
            </h1>
            <p className={`${fontRoboto.className} text-white text-lg w-96`}>
              ORHEMLOG helps you connect and monitoring users activities in
              workshop and warehouse.
            </p>
          </div>
          <p className="text-white pb-4">Copyright</p>
        </div>
      </div>
      <div className="w-full lg:w-4/12 flex flex-col justify-center items-center p-8 z-10 bg-white">
        <Card className="w-full p-4" shadow="md">
          <CardHeader className="flex justify-center">
            <h1 className="text-2xl font-semibold">Login</h1>
          </CardHeader>

          <CardBody>
            <Form className="flex flex-col gap-6" validationBehavior="native">
              <Input
                variant="faded"
                label="Email"
                type="email"
                name="email"
                isRequired
              />
              <Input
                variant="faded"
                label="Password"
                type="password"
                name="password"
                minLength={8}
                isRequired
              />
              <Button color="primary" type="submit">
                Login
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
