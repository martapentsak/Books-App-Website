import { useNavigate } from "react-router-dom";

import CardElement from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";

type CardProps = {
  id: string;
  className: "author-card" | "book-card";
  image: string;
  title?: string;
  genres: string[];
  author: string;
};

export const Card = ({
  id,
  image,
  title,
  genres,
  author,
  className
}: CardProps) => {
  const navigate = useNavigate();

  const isAuthorCard = className.includes("author")

  return (
    <div className={className}>
      <CardElement>
        <CardActionArea
          onClick={() => navigate(`${className.includes("author") ? "author" : "book"}/${id}`)}
        >
          <div>
            <img
              src={image}
              alt={"card image"}
              className={"card-image"}
            />
          </div>
          <CardContent>
            {!isAuthorCard && <span className="book-author">{author}</span>}
            <h2 className="card-name">{isAuthorCard ? author : title}</h2>
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
