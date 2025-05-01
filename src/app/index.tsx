import React from "react";
import { router } from "expo-router";
import { hideAsync } from "expo-splash-screen";
import { useAuthContext } from "@/components/providers/auth.provider";

export default function () {
  const { user } = useAuthContext();

  React.useEffect(() => {
    hideAsync();
  }, []);

  React.useEffect(() => {
    if (user === undefined) return;

    const id = setTimeout(() => {
      router.replace(user ? `/home/${user.role}/default` : "/welcome");
    }, 2000);

    return () => clearTimeout(id);
  }, [user]);

  return (
    <React.Fragment />
  );
}
