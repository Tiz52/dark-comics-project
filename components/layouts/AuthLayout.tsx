import {FC} from "react";
import {Meta} from ".";

interface Props {
  children: React.ReactNode;
  title: string;
  pageDescription: string;
}

export const AuthLayout: FC<Props> = ({children, title, pageDescription}) => {
  return (
    <div>
      <Meta title={title} pageDescription={pageDescription} />
      <main className="max-w-[1440px] mx-auto">{children}</main>
    </div>
  );
};
