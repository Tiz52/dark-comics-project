import {FC} from "react";

interface Props {
  title: string | number;
  subTitle: string;
  icon: JSX.Element;
}

export const SummaryTile: FC<Props> = ({title, subTitle, icon}) => {
  return (
    <div className="flex px-6 py-4 uppercase border-2 h-36 border-quaternary">
      <div className="flex items-center">{icon}</div>
      <div className="flex flex-col justify-center flex-auto ml-4">
        <h1 className="text-2xl font-headline md:text-4xl">{title}</h1>
        <p className="text font-body">{subTitle}</p>
      </div>
    </div>
  );
};
