import { useAuthors } from "../../context/authors.tsx";

import CardElement from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";

type CardProps = {
  isAuthorCard: boolean;
  image: string;
  name: string;
  genre: string[];
  author?: string;
};

export const Card = ({
  isAuthorCard,
  image,
  name,
  genre,
  author,
}: CardProps) => {
  const { handleNavigate } = useAuthors();

  const linkname = name.replace(/\s/g, "");
  return (
    <div className={isAuthorCard ? "author-card" : "book-card"}>
      <CardElement>
        <CardActionArea onClick={() => handleNavigate(linkname)}>
          <div>
            <img
              src={image}
              alt={isAuthorCard ? "author image" : "book image"}
              className={isAuthorCard ? "author-image" : "book-image"}
            />
          </div>
          <CardContent>
            {!isAuthorCard && <span className="book-author">{author}</span>}
            <h2 className="card-name">{name}</h2>
            {genre.map((g: string, index) => (
              <span className="book-category" key={index}>
                {g}
                {index < genre.length - 1 ? ", " : ""}
              </span>
            ))}
          </CardContent>
        </CardActionArea>
      </CardElement>
    </div>
  );
};
