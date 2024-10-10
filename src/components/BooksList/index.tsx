import { Card } from "../Card";

type CardProps = {
  image: string;
  title?: string;
  genres: string[];
  author: string;
};

type Props = {
  title: string;
  data: CardProps[];
};

export const BooksList = ({ title, data }: Props) => {
  return (
    <div className="list-section">
      <h2 className="list-section-title ">{title}</h2>
      <div className="flex-wrap-list">
        {data.map((attributes, index) => (
          <Card key={index} {...attributes} className="book-card" />
        ))}
      </div>
    </div>
  );
};
