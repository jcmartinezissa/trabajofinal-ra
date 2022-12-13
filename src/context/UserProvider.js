import { createContext, useState } from 'react';

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const data = { userData, setUserData };

  return (<userContext.Provider value={data}> {children} </userContext.Provider>);
};

export default userContext;
