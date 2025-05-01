import React from "react";
import { router } from "expo-router";
import { useSignout } from "@/hooks/api/auth.hook";
import { ConfirmLogout } from "./_modals/confirm-logout";
import { Text, Modal, TouchableOpacity } from "react-native";

export function Logout() {
  const signout = useSignout();
  const [open, setOpen] = React.useState(false);

  const handleCancel = () => setOpen(false);
  const handleAccept = async () => {
    await signout();

    handleCancel();
    router.replace("/welcome");
  };

  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="mb-25% rounded-full flex-row justify-center gap-4 bg-red-600 shadow"
      >
        <Text className="py-3 capitalize font-bold text-xl text-white text-center variant-small-caps">
          logout
        </Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={open}
        onRequestClose={() => setOpen(false)}
        children={
          <ConfirmLogout
            onAccept={handleAccept}
            onCancel={handleCancel}
          />
        }
      />
    </React.Fragment>
  );
}
