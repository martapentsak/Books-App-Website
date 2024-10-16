import CardElement from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";

type Props = {
  className: string;
  image: string;
  title: string;
  items: string[];
  onClick: () => void;
  subtitle?: string;
};

export const Card = ({
  className,
  image,
  onClick,
  subtitle,
  title,
  items,
}: Props) => {
  return (
    <div className={className}>
      <CardElement onClick={onClick}>
        <CardActionArea>
          <CardContent>
            <div>
              <img src={image} alt={"card image"} className={"card-image"} />
              {subtitle && <span className="card-subtitle">{subtitle}</span>}
              <h2 className="card-name">{title}</h2>
              {items.map((g, index) => (
                <span className="card-list-item" key={index}>
                  {g}
                  {index < items.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </CardContent>
        </CardActionArea>
      </CardElement>
    </div>
  );
};
