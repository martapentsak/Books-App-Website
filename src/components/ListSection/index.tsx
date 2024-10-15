import { ReactNode } from "react";

type Props = {
  title: string;
  wrap?: boolean;
  children: ReactNode;
};

export const ListSection = ({ title, wrap, children }: Props) => {
  return (
    <div className="list-section">
      <h2 className="list-section-title ">{title}</h2>
      <div className={wrap ? "flex-wrap-list" : "flex-list"}>{children}</div>
    </div>
  );
};
