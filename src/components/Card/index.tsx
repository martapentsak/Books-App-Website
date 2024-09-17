import { useAuthors } from "../../context/authors.tsx";

import CardElement from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";


type CardProps = {
  isAuthorCard: boolean;
  image: string;
  name: string;
  genre: string,
};

export const Card = ({ isAuthorCard, image, name,genre }: CardProps) => {
  const { handleNavigate } = useAuthors();

  return (
    <div className={isAuthorCard ? "author-card" : "book-card"}>
      <CardElement sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => handleNavigate(name)}>
          <div>
            <img
              src={image}
              alt={isAuthorCard ? "author image" : "book image"}
              className={isAuthorCard ? "author-image" : "book-image"}
            />
          </div>
          <CardContent>
            {!isAuthorCard && <span className="book-author"></span>}
            <h2 className="card-name">{name}</h2>
            <span className="book-category">{genre}</span>
          </CardContent>
        </CardActionArea>
      </CardElement>
    </div>
  );
};
