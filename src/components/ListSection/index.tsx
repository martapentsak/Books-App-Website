import { Card } from "../Card";

type DataProps = {
  id: string;
  image: string;
  title?: string;
  genres: string[];
  author: string;
};

type Props<T> = {
  title: string;
  data: T[];
  className: string;
  blockClassname: string;
  handleCardClick: (id: string) => void;
};

export const ListSection = <T extends DataProps>({
  title,
  data,
  className,
  handleCardClick,
  blockClassname,
}: Props<T>) => {
  return (
    <div className="list-section">
      <h2 className="list-section-title ">{title}</h2>
      <div className={blockClassname}>
        {data.map((item, index) => (
          <Card
            key={index}
            onClick={() => handleCardClick(item.id)}
            className={className}
          >
            <div>
              <img
                src={item.image}
                alt={"card image"}
                className={"card-image"}
              />

              {item.title && <span className="book-author">{item.author}</span>}
              <h2 className="card-name">
                {item.title ? item.title : item.author}
              </h2>
              {item.genres.map((g, index) => (
                <span className="category" key={index}>
                  {g}
                  {index < item.genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
