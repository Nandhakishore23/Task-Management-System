import { createContext, useContext, useState } from 'react';

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [currentGroup, setCurrentGroup] = useState(null);

  return (
    <GroupContext.Provider value={{ currentGroup, setCurrentGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => useContext(GroupContext);
