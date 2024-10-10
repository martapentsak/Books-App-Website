import { Card } from "../Card";

type DataProps = {
  id: string;
  image: string;
  title?: string;
  genres: string[];
  author: string;
};

type Props = {
  title: string;
  data: DataProps[];
  className: string;
  blockClassname: string;
  onClick: (id: string) => void;
};

export const ListSection = ({
  title,
  data,
  className,
  onClick,
  blockClassname,
}: Props) => {
  return (
    <div className="list-section">
      <h2 className="list-section-title ">{title}</h2>
      <div className={blockClassname}>
        {data.map((element, index) => (
          <Card
            key={index}
            elementInfo={element}
            className={className}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
};
