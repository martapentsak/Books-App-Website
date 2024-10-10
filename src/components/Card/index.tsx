import CardElement from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";

type CardProps = {
  id: string;
  title?: string;
  author: string;
  genres: string[];
  image: string;
};

type Props = {
  className: string;
  onClick: (id: string) => void;
  elementInfo: CardProps;
};

export const Card = ({ elementInfo, className, onClick }: Props) => {
  const { title, author, genres, image, id } = elementInfo;

  return (
    <div className={className}>
      <CardElement>
        <CardActionArea onClick={() => onClick(id)}>
          <div>
            <img src={image} alt={"card image"} className={"card-image"} />
          </div>
          <CardContent>
            {title && <span className="book-author">{author}</span>}
            <h2 className="card-name">{title ? title : author}</h2>
            {genres.map((g, index) => (
              <span className="category" key={index}>
                {g}
                {index < genres.length - 1 ? ", " : ""}
              </span>
            ))}
          </CardContent>
        </CardActionArea>
      </CardElement>
    </div>
  );
};
