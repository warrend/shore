import React, { createContext, useState, useContext, useEffect } from 'react';
import localServices from '../../services/localServices';
import {
  FINISHED,
  TOKEN,
  // TOKEN_VALUE,
  TOKEN_INACTIVE,
  LAST_FINISHED,
  TOKEN_VALUE,
} from '../../constants';
import finishedData, { lastFinished } from '../../data';

type ContextProps = {
  children?: React.ReactNode;
};

type ServicesEntry = { [key: string]: any };
type SelectorEntry = { [key: string]: any };

type ContextValues = {
  services: ServicesEntry;
  selectors: SelectorEntry;
};

export const AppContext = createContext({} as ContextValues);

export function useApp() {
  return useContext(AppContext);
}

const AppContextProvider = ({ children }: ContextProps) => {
  const [sliderState, setSliderState] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [menuState, setMenuState] = useState<boolean>(false);

  const selectors = {
    sliderState,
    menuState,
    token,
    loading,
  };

  const services = {
    startApp: () => {
      if (localStorage.getItem(FINISHED)) {
        const appFinished = localServices.getData(FINISHED);
        const newFinished: any = {};

        // If a track is removed from the app, remove it from localStorage
        // and preserve users lesson data.
        if (
          Object.keys(appFinished).length > Object.keys(finishedData).length
        ) {
          const paredDownObj: any = {};
          // eslint-disable-next-line array-callback-return
          Object.keys(appFinished).map((key: string) => {
            if (finishedData[key]) {
              paredDownObj[key] = appFinished[key];
            }
          });

          return localServices.setData(FINISHED, paredDownObj);
        }

        // If new tracks have been added, add them to
        // localStorage while preserving users lesson data.

        // eslint-disable-next-line array-callback-return
        Object.keys(finishedData).map((key: string) => {
          if (!appFinished[key]) {
            newFinished[key] = [];
          }
        });

        if (Object.keys(newFinished).length) {
          localServices.setData(FINISHED, { ...appFinished, ...newFinished });
        }
      }
      if (token === null || token === TOKEN_INACTIVE) {
        localServices.setData(FINISHED, finishedData);
        localServices.setData(LAST_FINISHED, lastFinished);
      }

      return setToken(TOKEN_VALUE);
    },
    registerUser: () => {
      localServices.setData('token', 'app-token');
      setToken(TOKEN_VALUE);
    },
    updatePageScroll: (state: boolean) => {
      if (state) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'visible';
      }
    },
    changeSliderState: (state: boolean) => {
      setSliderState(state);
      services.updatePageScroll(state);
    },
    changeMenuState: (state: boolean) => {
      setMenuState(state);
      services.updatePageScroll(state);
    },
    resetData: async () => {
      localServices.setData(TOKEN, TOKEN_INACTIVE);
      localServices.setData(FINISHED, finishedData);
      setToken(TOKEN_INACTIVE);
    },
    changeLoadingState: (state: boolean) => setLoading(state),
  };

  useEffect(() => {
    const appToken = localStorage.getItem(TOKEN);
    return setToken(JSON.parse(appToken!));
  }, [services.startApp]);

  const context = {
    services,
    selectors,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
