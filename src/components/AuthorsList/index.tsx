import { useLocation } from "react-router-dom";
import { Card } from "../Card";
import { menuElemenets } from "../../constants/textValues";

type CardProps = {
  id: string;
  image: string;
  title?: string;
  genres: string[];
  author: string;
};

type Props = {
  title: string;
  data: CardProps[];
};

export const AuthorsList = ({ title, data }: Props) => {
  const location = useLocation();
  const isHomePage = location.pathname === menuElemenets.links.home;
  return (
    <div className="list-section">
      <h2 className="list-section-title ">{title}</h2>
      <div className={isHomePage ? "flex-list" : "flex-wrap-list"}>
        {data.map((attributes, index) => (
          <Card key={index} {...attributes} className="author-card" />
        ))}
      </div>
    </div>
  );
};
