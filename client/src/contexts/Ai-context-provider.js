import React, { createContext, useContext, useState } from 'react';

const PageStateContext = createContext();

export const PageStateProvider = ({ children }) => {
  // 存储各页面的状态
  const [pageStates, setPageStates] = useState({

    ai: null

  });

  // 更新特定页面的状态
  const updatePageState = (pageName, newState) => {
    setPageStates(prev => ({
      ...prev,
      [pageName]: newState
    }));
  };

  return (
    <PageStateContext.Provider value={{ pageStates, updatePageState }}>
      {children}
    </PageStateContext.Provider>
  );
};

export const usePageState = () => useContext(PageStateContext);