import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IAuthContext {
  user?: null | IUser;
  setUser: (user?: null | IUser) => void;
}

const AuthContext = React.createContext<null | IAuthContext>(null);
export const useAuthContext = () => React.useContext(AuthContext)!;

export default function (properties: React.PropsWithChildren) {
  const [user, setUser] = React.useState<null | IUser>();

  React.useEffect(() => {
    AsyncStorage.getItem("user").then(value => {
      if (value === null) return setUser(null);
      else if (value) return setUser(JSON.parse(value));
    });
  }, []);


  React.useEffect(() => {
    if (user) AsyncStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return <AuthContext.Provider value={{ user, setUser }} {...properties} />;
}
