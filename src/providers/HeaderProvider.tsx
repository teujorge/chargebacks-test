import { createContext, useContext, useState } from "react";

const HeaderContext = createContext<{
  isSideNavCollapsed: boolean;
  toggleSideNavCollapsed: () => void;
}>({
  isSideNavCollapsed: false,
  toggleSideNavCollapsed: () => {},
});

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
}

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(false);

  return (
    <HeaderContext.Provider
      value={{
        isSideNavCollapsed,
        toggleSideNavCollapsed: () => setIsSideNavCollapsed((prev) => !prev),
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}
