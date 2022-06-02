import {FC, useReducer} from "react";
import {UiContext, uiReducer} from "./";

export interface UiState {
  isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
};

interface Props {
  children: React.ReactNode;
}

export const UiProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const closeMenu = () => {
    dispatch({
      type: "[Ui] - Close Modal",
      payload: false,
    });
  };
  const openMenu = () => {
    dispatch({
      type: "[Ui] - Open Modal",
      payload: true,
    });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,

        //methods
        openMenu,
        closeMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
