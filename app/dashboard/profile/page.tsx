"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/toast";
import { useEffect, useState } from "react";

import { fontRoboto } from "@/config/fonts";
import { IUser } from "@/config/types";
import { useAuth } from "@/lib/auth-context";

export const dynamic = "force-dynamic";

export default function Page() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (uid: string) => {
      const response = await fetch(`/api/user/${uid}`);
      const data = await response.json();

      if (data) {
        setUserData(data.data);
      }
    };

    if (user) {
      fetchData(user.uid);
    }
  }, [user]);

  if (!userData) {
    return (
      <div className="flex flex-col pt-6">
        <p className="text-xl font-semibold md:text-2xl">Profile</p>
        <Card className="mt-3">
          <CardBody>
            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="h-14 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-14 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-14 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-14 animate-pulse rounded-lg bg-gray-200" />
            </div>
            <div className="mt-2 h-10 w-full animate-pulse rounded-xl bg-gray-200 sm:w-32" />
          </CardBody>
        </Card>
        <footer className="mt-8 pb-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </footer>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/user/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setTimeout(() => {
          addToast({
            title: "SUCCESS",
            description: "User updated successfully",
            color: "success",
          });
        }, 500);

        window.location.reload();
      } else {
        const { data } = await response.json();
        throw new Error(data.message);
      }
    } catch (error: any) {
      addToast({
        title: "ERROR",
        description: error.toString(),
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`flex flex-col pt-6 ${fontRoboto.className}`}>
        <p className="text-xl font-semibold md:text-2xl">Profile</p>

        <Card className="mt-3">
          <CardBody>
            <Form onSubmit={onSubmit} validationBehavior="native">
              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                <Input
                  variant="bordered"
                  label="Name"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  isDisabled={loading}
                />
                <Input
                  variant="bordered"
                  label="Email"
                  value={userData.email}
                  required
                  isDisabled
                />
                <Input
                  variant="bordered"
                  label="Division"
                  value={userData.division}
                  required
                  isDisabled
                />
                <Input
                  variant="bordered"
                  label="Last Online"
                  value={userData.lastSeen ?? "-"}
                  isDisabled
                />
              </div>
              <Button
                className="w-full sm:w-fit"
                color="primary"
                type="submit"
                isLoading={loading}
              >
                Update Profile
              </Button>
            </Form>
          </CardBody>
        </Card>

        <footer className="mt-8 pb-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </footer>
      </div>
    </>
  );
}
