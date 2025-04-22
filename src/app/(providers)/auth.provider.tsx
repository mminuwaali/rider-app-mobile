import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IAuthContext {
  user?: null | IUser;
  setUser: (user: IUser) => void;
}

const AuthContext = React.createContext<null | IAuthContext>(null);
export const useAuthContext = () => React.useContext(AuthContext)!;

export default function (properties: React.PropsWithChildren) {
  const [user, setUser] = React.useState<IUser>();

  React.useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) setUser(user ? JSON.parse(user) : null);
    })();
  }, []);


  React.useEffect(() => {
    if (user) AsyncStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return <AuthContext.Provider value={{ user, setUser }} {...properties} />;
}
