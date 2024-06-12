import { useGetIdentity, useLogout } from "@refinedev/core";
import React from "react";

export const Header = () => {
  const { mutate, isLoading } = useLogout();
  const { data: identity } = useGetIdentity<{ name: string }>();
  return (
    <>
      <h2>
        <span>Welcome, </span>
        <span>{identity?.name ?? ""}</span>
      </h2>
      <button type="button" disabled={isLoading} onClick={() => mutate()}>
        Logout
      </button>
    </>
  );
};
