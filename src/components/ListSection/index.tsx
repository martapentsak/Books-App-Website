import { ReactNode } from "react";

type Props = {
  title: string;
  listWrap: boolean;
  children: ReactNode;
};

export const ListSection = ({ title, listWrap, children }: Props) => {
  return (
    <div className="list-section">
      <h2 className="list-section-title ">{title}</h2>
      <div className={listWrap ? "flex-wrap-list" : "flex-list"}>
        {children}
      </div>
    </div>
  );
};
