import CardElement from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";

type Props = {
  className: string;
  image: string;
  subtitle?: string;
  name: string;
  cardList: string[];
  onClick: () => void;
};

export const Card = ({
  className,
  image,
  onClick,
  subtitle,
  name,
  cardList,
}: Props) => {
  return (
    <div className={className}>
      <CardElement onClick={onClick}>
        <CardActionArea>
          <CardContent>
            <div>
              <img src={image} alt={"card image"} className={"card-image"} />

              {subtitle && <span className="card-subtitle">{subtitle}</span>}
              <h2 className="card-name">{name}</h2>
              {cardList.map((g, index) => (
                <span className="card-list-item" key={index}>
                  {g}
                  {index < cardList.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </CardContent>
        </CardActionArea>
      </CardElement>
    </div>
  );
};
