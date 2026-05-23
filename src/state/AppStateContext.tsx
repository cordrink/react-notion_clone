import { createContext, useContext } from "react";
import type { Page } from "../utils/types";
import { usePageState } from "./useAppState";

type AppStateContextType = ReturnType<typeof usePageState>;

const AppstateContext = createContext<AppStateContextType>(
  {} as AppStateContextType,
);

type AppStateProviderProps = {
  children: React.ReactNode;
  initialState: Page;
};

export const AppStateProvider = ({
  children,
  initialState,
}: AppStateProviderProps) => {
  const pageStateHandlers = usePageState(initialState);

  return (
    <AppstateContext.Provider value={pageStateHandlers}>
      {children}
    </AppstateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppState = () => useContext(AppstateContext);
