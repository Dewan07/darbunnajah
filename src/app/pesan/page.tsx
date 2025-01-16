"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/users");
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();
        setUsers(data.users);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        console.error(err);
      }
    };

    getData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Pesan</h1>
        <Link href="/" className="flex items-center">
          <Image
            className="w-8 h-8 rounded"
            src="/assets/logo.png"
            alt="DARBUNNAJAH Logo"
            width={30}
            height={30}
            priority
          />
        </Link>
        <FontAwesomeIcon
          icon={faCirclePlus}
          className="text-blue-500"
          style={{ fontSize: "24px" }}
        />
      </div>
      <div>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <p className="text-red-500">Error: Unable to load data.</p>
        ) : (
          users.map((user) => (
            <Card key={user.id}>
              <CardContent>
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.firstName || "User Photo"}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                ) : (
                  <p>No photo available</p>
                )}
              </CardContent>
              <CardFooter>
                <p className="font-bold">{user.firstName} {user.lastName}</p>
                <p>{user.email}</p>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </>
  );
}