import {createContext} from "react";

interface ContextProps {
  isMenuOpen: boolean;
  //methods
  closeMenu: () => void;
  openMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);
