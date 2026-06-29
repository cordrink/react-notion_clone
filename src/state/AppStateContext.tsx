import { createContext, useContext } from "react";
import type { Page } from "../utils/types";
import { usePageState } from "./useAppState";
import { withInitialState } from "./withInitialState";

type AppStateContextType = ReturnType<typeof usePageState>;

const AppstateContext = createContext<AppStateContextType>(
  {} as AppStateContextType,
);

type AppStateProviderProps = {
  children: React.ReactNode;
  initialState: Page;
};

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }: AppStateProviderProps) => {
    const pageStateHandlers = usePageState(initialState);

    return (
      <AppstateContext.Provider value={pageStateHandlers}>
        {children}
      </AppstateContext.Provider>
    );
  },
);

export const useAppState = () => useContext(AppstateContext);
