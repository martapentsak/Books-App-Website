import { UnivarsalProp } from "../../types/UniversalProps";

type Props = {
  data: UnivarsalProp[];
  selectedPoetIndex: number;
  onClick: (index: number) => void;
};

export const PoetsList = ({ data, selectedPoetIndex, onClick }: Props) => {
  return (
    <div className="poets-list">
      {data.map(({ image, author }, index) => (
        <div
          key={index}
          onClick={() => onClick(index)}
          className={
            selectedPoetIndex === index ? "active-poet-section" : "poet-section"
          }
        >
          <img key={index} src={image} alt={author} className="poet-image" />
          {selectedPoetIndex === index && (
            <span className="poet-name">{author}</span>
          )}
        </div>
      ))}
    </div>
  );
};
