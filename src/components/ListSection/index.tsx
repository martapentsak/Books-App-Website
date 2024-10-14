import { Card } from "../Card";

import { UnivarsalProp } from "../../types/UniversalProps";

type Props<T> = {
  title: string;
  data: T[];
  className: string;
  listCardClassname: string;
  onCardClick: (id: string) => void;
};

export const ListSection = <T extends UnivarsalProp>({
  title,
  data,
  className,
  onCardClick,
  listCardClassname,
}: Props<T>) => {
  return (
    <div className="list-section">
      <h2 className="list-section-title ">{title}</h2>
      <div className={listCardClassname}>
        {data.map(({ title, author, image, id, genres }, index) => (
          <Card
            key={index}
            name={title ? title : author}
            subtitle={title && author}
            image={image}
            cardList={genres}
            onClick={() => onCardClick(id)}
            className={className}
          />
        ))}
      </div>
    </div>
  );
};
