import React, { ReactNode, createContext, useContext, useState } from "react";

const ViewTitleContext = createContext<
  { title: string; setTitle: (title: string) => void } | undefined
>(undefined);

export const ViewTitleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [title, setTitle] = useState("");

  return (
    <ViewTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </ViewTitleContext.Provider>
  );
};

export const useViewTitle = () => {
  const context = useContext(ViewTitleContext);
  if (context === undefined) {
    throw new Error("useViewTitle must be used within a ViewTitleProvider");
  }
  return context;
};
