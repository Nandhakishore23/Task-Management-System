// // import { createContext, useContext, useState } from 'react';

// // const GroupContext = createContext();

// // export const GroupProvider = ({ children }) => {
// //   const [currentGroup, setCurrentGroup] = useState(null);

// //   return (
// //     <GroupContext.Provider value={{ currentGroup, setCurrentGroup }}>
// //       {children}
// //     </GroupContext.Provider>
// //   );
// // };

// // export const useGroup = () => useContext(GroupContext);


// import { createContext, useContext, useState } from "react";

// const GroupContext = createContext();

// export const GroupProvider = ({ children }) => {
//   const [currentGroup, setCurrentGroup] = useState(null);

//   return (
//     <GroupContext.Provider value={{ currentGroup, setCurrentGroup }}>
//       {children}
//     </GroupContext.Provider>
//   );
// };

// export const useGroup = () => useContext(GroupContext);


import { createContext, useContext, useEffect, useState } from 'react';

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [currentGroup, setCurrentGroup] = useState(() => {
    const saved = localStorage.getItem('currentGroup');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (currentGroup) {
      localStorage.setItem('currentGroup', JSON.stringify(currentGroup));
    } else {
      localStorage.removeItem('currentGroup');
    }
  }, [currentGroup]);

  return (
    <GroupContext.Provider value={{ currentGroup, setCurrentGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => useContext(GroupContext);
