import React from "react";
import { Slot } from "expo-router";
import ClientProvider from "./_layout/_context/client.context";

export default function () {
    return (
        <ClientProvider>
            <Slot initialRouteName="default/index" />
        </ClientProvider>
    );
}