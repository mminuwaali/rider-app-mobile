import React from "react";
import { Modal, Text, TouchableOpacity } from "react-native";
import { CreateAddressModal } from "./_modals/address";

export function CreateButton() {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <TouchableOpacity
                onPress={() => setOpen(true)}
                className="h-12 bg-blue-600 rounded-md items-center justify-center mb-4"
            >
                <Text className="text-white font-bold">Add New Address</Text>
            </TouchableOpacity>

            <Modal visible={open} onRequestClose={() => setOpen(false)}>
                <CreateAddressModal onClose={() => setOpen(false)} />
            </Modal>
        </>
    )
}