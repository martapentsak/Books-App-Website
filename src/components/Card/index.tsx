import CardElement from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";

import { useNavigate } from "react-router-dom";

type CardProps = {
  id: string;
  isAuthorCard: boolean;
  image: string;
  title?: string;
  genres: string[];
  author: string;
};

export const Card = ({
  id,
  isAuthorCard,
  image,
  title,
  genres,
  author,
}: CardProps) => {
  const navigate = useNavigate();


  return (
    <div className={isAuthorCard ? "author-card" : "book-card"}>
      <CardElement>
        <CardActionArea onClick={() => navigate(`${isAuthorCard ? "authorId" : "bookId"}/${id}`)}>
          <div>
            <img
              src={image}
              alt={isAuthorCard ? "author image" : "book image"}
              className={isAuthorCard ? "author-image" : "book-image"}
            />
          </div>
          <CardContent>
            {!isAuthorCard && <span className="book-author">{author}</span>}
            <h2 className="card-name">{isAuthorCard ? author : title}</h2>
            {genres.map((g, index) => (
              <span className="book-category" key={index}>
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
