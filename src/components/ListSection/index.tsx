import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  wrap?: boolean;
};

export const ListSection = ({ title, wrap, children }: Props) => {
  return (
    <div className="list-section">
      <h2 className="list-section-title ">{title}</h2>
      <div className={wrap ? "flex-wrap-list" : "flex-list"}>{children}</div>
    </div>
  );
};
