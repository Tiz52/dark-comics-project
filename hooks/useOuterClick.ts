import {useRef, useContext, useEffect, useCallback} from "react";
import {UiContext} from "../context/ui";

export const useOuterClick = () => {
  const ref = useRef<HTMLDivElement>(null);

  const {isMenuOpen, closeMenu} = useContext(UiContext);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeMenu();
      }
    },
    [closeMenu],
  );

  useEffect(() => {
    if (isMenuOpen) {
      setTimeout(() => {
        document.addEventListener("click", handleClick);
      }, 100);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick, isMenuOpen]);

  return ref;
};
