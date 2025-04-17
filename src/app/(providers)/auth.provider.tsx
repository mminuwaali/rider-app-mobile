import React from "react";

interface IAuthContext {
  user?: IUser;
}

const AuthContext = React.createContext<IAuthContext>({});
export const useAuthContext = () => React.useContext(AuthContext);

export default function (properties: React.PropsWithChildren) {
  const [user] = React.useState<IUser>();

  return <AuthContext.Provider value={{ user }} {...properties} />;
}
