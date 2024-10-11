import CardElement from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { ReactElement } from "react";

type Props = {
  className: string;
  onClick: () => void;
  children: ReactElement;
};

export const Card = ({ className, onClick, children }: Props) => {
  return (
    <div className={className}>
      <CardElement onClick={onClick}>
        <CardActionArea>
          <CardContent>{children}</CardContent>
        </CardActionArea>
      </CardElement>
    </div>
  );
};
