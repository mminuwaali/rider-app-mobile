import { ScrollView } from "react-native";
import { Button } from "./_sections/button";
import { Logout } from "./_sections/logout";
import { Profile } from "./_sections/profile";

export default function () {
    return (
        <ScrollView className="flex-1" contentContainerClassName="flex-1 gap-10" showsVerticalScrollIndicator={false}>
            <Profile />
            <Button />
            <Logout />
        </ScrollView>
    );
}