import {FC} from "react";
import {Header} from ".";

interface Props {
  children: React.ReactNode;
}

export const PageLayout: FC<Props> = ({children}) => {
  return (
    <>
      <Header />
      <main className="mx-auto pt-[56px] max-w-7xl">{children}</main>
    </>
  );
};
