import { AuthorProp } from "../../types/AuthorBookType";

type Props = {
  poets: AuthorProp[];
  selectedPoetIndex: number;
  onClick: (index: number) => void;
};

export const PoetsList = ({ poets, selectedPoetIndex, onClick }: Props) => {
  return (
    <div className="poets-list">
      {poets.map(({ image, name }, index) => (
        <div
          key={index}
          onClick={() => onClick(index)}
          className={
            selectedPoetIndex === index ? "active-poet-section" : "poet-section"
          }
        >
          <img key={index} src={image} alt={name} className="poet-image" />
          {selectedPoetIndex === index && (
            <span className="poet-name">{name}</span>
          )}
        </div>
      ))}
    </div>
  );
};
