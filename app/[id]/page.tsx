"use client";

import { useParams } from "next/navigation";

export default function users() {
  const params = useParams();
  const userID = params.id;

  return (
    <>
      <h1>hello {userID}</h1>
    </>
  );
}
